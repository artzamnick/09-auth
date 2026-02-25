import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";

import type { Note } from "@/types/note";
import { api } from "@/lib/api/api";

type SuccessResponse = { success: boolean };

export async function checkSession(): Promise<AxiosResponse<SuccessResponse>> {
  const cookieStore = await cookies();

  return api.get<SuccessResponse>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
}

export async function getNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}