import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthState {
  isAuthenticated: boolean;
  user: User;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

const initUser: User = {
  username: "",
  email: "",
  avatar: "",
};

export const useLogin = create<AuthState>()((set) => ({
  isAuthenticated: false,
  user: initUser,
  setUser: (data) => set(() => ({ user: data, isAuthenticated: true })),
  clearIsAuthenticated: () =>
    set(() => ({ user: initUser, isAuthenticated: false })),
}));