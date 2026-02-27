import axios from "axios";
import { cookies } from "next/headers";

import type { Note, FetchTagNote } from "@/types/note";
import type { User } from "@/types/user";

export type SuccessResponse = { success: boolean };
export type NotesResponse = { notes: Note[]; totalPages: number };

const serverApi = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

async function cookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export async function checkSession(): Promise<SuccessResponse> {
  const res = await serverApi.get<SuccessResponse>("/auth/session", {
    headers: { Cookie: await cookieHeader() },
  });
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await serverApi.get<User>("/users/me", {
    headers: { Cookie: await cookieHeader() },
  });
  return res.data;
}

export async function fetchNotesServer(params: {
  page: number;
  perPage: number;
  search?: string;
  tag?: FetchTagNote;
}): Promise<NotesResponse> {
  const res = await serverApi.get<NotesResponse>("/notes", {
    params,
    headers: { Cookie: await cookieHeader() },
  });
  return res.data;
}

export async function getNoteById(id: string): Promise<Note> {
  const res = await serverApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: await cookieHeader() },
  });
  return res.data;
}

export const fetchNoteByIdServer = getNoteById;