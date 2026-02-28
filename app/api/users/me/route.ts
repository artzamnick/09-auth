import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();

  try {
    const res = await api.get("/users/me", {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.status }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const cookieStore = await cookies();

  try {
    const body = await req.json();

    const res = await api.patch("/users/me", body, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.status }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}