import type { User, UserReg } from "@/types/user";
import { nextServer } from "./api";

export async function register(data: UserReg): Promise<User> {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: UserReg): Promise<User> {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export async function logout() {
  const res = await nextServer.post("/auth/logout");
  return res.data;
}

export async function checkSession(): Promise<{ success: boolean }> {
  const res = await nextServer.get<{ success: boolean }>("/auth/session");
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
}

export async function updateMe(data: { email: string; username: string }): Promise<User> {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
}