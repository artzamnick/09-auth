import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://notehub-api.goit.study";

function forwardSetCookie(from: Response, to: NextResponse) {
  const setCookie = from.headers.get("set-cookie");
  if (setCookie) to.headers.set("set-cookie", setCookie);
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();

  const url = new URL(req.url);
  const qs = url.searchParams.toString();
  const target = `${API_BASE}/notes${qs ? `?${qs}` : ""}`;

  const res = await fetch(target, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  const nextRes = NextResponse.json(data, { status: res.status });
  forwardSetCookie(res, nextRes);
  return nextRes;
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const body = await req.json().catch(() => null);

  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  const nextRes = NextResponse.json(data, { status: res.status });
  forwardSetCookie(res, nextRes);
  return nextRes;
}