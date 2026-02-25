import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://notehub-api.goit.study";

function forwardSetCookie(from: Response, to: NextResponse) {
  const setCookie = from.headers.get("set-cookie");
  if (setCookie) to.headers.set("set-cookie", setCookie);
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: Props) {
  const cookieStore = await cookies();
  const { id } = await params;

  const res = await fetch(`${API_BASE}/notes/${id}`, {
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

export async function DELETE(req: NextRequest, { params }: Props) {
  const cookieStore = await cookies();
  const { id } = await params;

  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const text = await res.text().catch(() => "");

  const nextRes = new NextResponse(text || null, { status: res.status });
  forwardSetCookie(res, nextRes);
  return nextRes;
}