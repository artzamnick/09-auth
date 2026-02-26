import axios from "axios";
import { cookies } from "next/headers";

import type { Note, FetchTagNote } from "@/types/note";
import type { User } from "@/types/user";

type SuccessResponse = { success: boolean };

const serverApi = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

function cookieHeader(): string {
  const cookieStore = cookies();
  return cookieStore.toString();
}

export async function checkSession(): Promise<SuccessResponse> {
  const res = await serverApi.get<SuccessResponse>("/auth/session", {
    headers: { Cookie: cookieHeader() },
  });
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await serverApi.get<User>("/users/me", {
    headers: { Cookie: cookieHeader() },
  });
  return res.data;
}

export type NotesResponse = { notes: Note[]; totalPages: number };

export async function fetchNotesServer(params: {
  page: number;
  perPage: number;
  search?: string;
  tag?: FetchTagNote;
}): Promise<NotesResponse> {
  const res = await serverApi.get<NotesResponse>("/notes", {
    params,
    headers: { Cookie: cookieHeader() },
  });
  return res.data;
}

export async function getNoteById(id: string): Promise<Note> {
  const res = await serverApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader() },
  });
  return res.data;
}