import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "../../api";
import { logErrorResponse } from "../../_utils/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    const apiRes = await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
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

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const body = await req.json();

    const apiRes = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
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

export async function DELETE(_: NextRequest, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    const apiRes = await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
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