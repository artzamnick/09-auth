"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useLogin } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useLogin((s) => s.setUser);
  const logout = useLogin((s) => s.clearIsAuthenticated);

  useEffect(() => {
    async function init() {
      const res = await checkSession();
      if (res?.success) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        logout();
      }
    }
    init();
  }, [setUser, logout]);

  return <>{children}</>;
}