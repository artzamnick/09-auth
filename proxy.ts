import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";

const BACKEND = "https://notehub-api.goit.study";

const privateRoutes = ["/notes", "/profile"];
const publicRoutes = ["/sign-in", "/sign-up"];

function startsWithAny(path: string, prefixes: string[]) {
  return prefixes.some((p) => path.startsWith(p));
}

type CookieStore = Awaited<ReturnType<typeof cookies>>;

function applySetCookieToStore(setCookie: string | string[], cookieStore: CookieStore) {
  const cookieArr = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const cookieStr of cookieArr) {
    const parsed = parse(cookieStr);

    const options = {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      path: parsed.Path,
      maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
    };

    if (parsed.accessToken) cookieStore.set("accessToken", parsed.accessToken, options);
    if (parsed.refreshToken) cookieStore.set("refreshToken", parsed.refreshToken, options);
  }
}

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublic = startsWithAny(path, publicRoutes);
  const isPrivate = startsWithAny(path, privateRoutes);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken) {
    if (isPublic) return NextResponse.redirect(new URL("/profile", req.url));
    return NextResponse.next();
  }

  if (refreshToken) {
    try {
      const backendRes = await fetch(`${BACKEND}/auth/session`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const setCookie = backendRes.headers.get("set-cookie");

      if (setCookie) {
        applySetCookieToStore(setCookie, cookieStore);

        if (isPublic) return NextResponse.redirect(new URL("/profile", req.url));
        return NextResponse.next();
      }

      if (isPrivate) return NextResponse.redirect(new URL("/sign-in", req.url));
      return NextResponse.next();
    } catch {
      if (isPrivate) return NextResponse.redirect(new URL("/sign-in", req.url));
      return NextResponse.next();
    }
  }

  if (isPrivate) return NextResponse.redirect(new URL("/sign-in", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-up", "/sign-in"],
};