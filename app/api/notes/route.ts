import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "../api";
import { logErrorResponse } from "../_utils/utils";

const PER_PAGE = 12;

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const url = new URL(req.url);

    const search = url.searchParams.get("search") ?? "";
    const pageParam = url.searchParams.get("page");
    const tagParam = url.searchParams.get("tag") ?? "";

    const page = Number(pageParam ?? "1");
    const normalizedPage = Number.isFinite(page) && page > 0 ? page : 1;

    const tag = tagParam === "All" ? "" : tagParam;

    const apiRes = await api.get("/notes", {
      params: {
        search,
        page: normalizedPage,
        perPage: PER_PAGE,
        tag,
      },
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

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();

    const apiRes = await api.post("/notes", body, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
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