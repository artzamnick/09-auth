import type { User, UserReg } from "@/types/user";
import type { CreateNotePayload, FetchTagNote, Note } from "@/types/note";
import { api } from "@/lib/api/api";

type SuccessResponse = { success: boolean };

export type UpdateMePayload = {
  username: string;
};

export type FetchNotesParams = {
  page: number;
  perPage: number;
  search?: string;
  tag?: FetchTagNote;
};

export type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

export async function register(data: UserReg): Promise<User> {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: UserReg): Promise<User> {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<SuccessResponse> {
  const res = await api.get<SuccessResponse>("/auth/session");
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await api.get<User>("/users/me");
  return res.data;
}

export async function updateMe(data: UpdateMePayload): Promise<User> {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
}

export async function fetchNotes(params: FetchNotesParams): Promise<NotesResponse> {
  const res = await api.get<NotesResponse>("/notes", { params });
  return res.data;
}

export async function createNote(data: CreateNotePayload): Promise<Note> {
  const res = await api.post<Note>("/notes", data);
  return res.data;
}

export async function getNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function deleteNoteById(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}