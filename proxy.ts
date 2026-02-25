import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/notes", "/profile"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublic = publicRoutes.some((r) => path.startsWith(r));
  const isPrivate = privateRoutes.some((r) => path.startsWith(r));

  if (accessToken) {
    if (isPublic) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    return NextResponse.next();
  }

  if (refreshToken) {
    const data = await checkSession();
    const setCookie = data.headers?.["set-cookie"];

    if (setCookie) {
      const cookieArr = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArr) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
        };

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
      }

      if (isPublic) {
        return NextResponse.redirect(new URL("/profile", req.url), {
          headers: { Cookie: cookieStore.toString() },
        });
      }

      if (isPrivate) {
        return NextResponse.next({
          headers: { Cookie: cookieStore.toString() },
        });
      }

      return NextResponse.next();
    }

    if (isPrivate) return NextResponse.redirect(new URL("/sign-in", req.url));
    return NextResponse.next();
  }

  if (isPrivate) return NextResponse.redirect(new URL("/sign-in", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-up", "/sign-in"],
};