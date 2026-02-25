import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://notehub-api.goit.study";

export async function GET() {
  const cookieStore = await cookies();

  const res = await fetch(`${API_BASE}/users/me`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const setCookie = res.headers.get("set-cookie");

  const contentType = res.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  const nextRes = contentType.includes("application/json")
    ? NextResponse.json(body, { status: res.status })
    : new NextResponse(body, { status: res.status });

  if (setCookie) nextRes.headers.set("set-cookie", setCookie);

  return nextRes;
}