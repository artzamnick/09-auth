import { create } from "zustand";

export type NavTheme = "dark" | "light";

type State = {
  theme: NavTheme;
  userKey: string | null;
  initForUser: (email: string) => void;
  toggle: () => void;
  setTheme: (theme: NavTheme) => void;
};

function applyTheme(theme: NavTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-nav-theme", theme);
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
  }
}

export const useNavTheme = create<State>()((set, get) => ({
  theme: "dark",
  userKey: null,

  initForUser: (email: string) => {
    const key = `notehub:nav-theme:${email.toLowerCase()}`;
    const saved = safeGet(key);
    const nextTheme: NavTheme = saved === "light" ? "light" : "dark";

    set({ theme: nextTheme, userKey: key });
    applyTheme(nextTheme);
  },

  setTheme: (theme) => {
    set({ theme });
    applyTheme(theme);

    const key = get().userKey;
    if (key) safeSet(key, theme);
  },

  toggle: () => {
    const current = get().theme;
    const next: NavTheme = current === "dark" ? "light" : "dark";
    get().setTheme(next);
  },
}));