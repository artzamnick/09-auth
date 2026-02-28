"use client";

import { useEffect, useState } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useLogin } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  const setUser = useLogin((s) => s.setUser);
  const logout = useLogin((s) => s.clearIsAuthenticated);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const session = await checkSession();
        if (!alive) return;

        if (!session.data.success) {
          logout();
          return;
        }

        const user = await getMe();
        if (!alive) return;

        if (user) setUser(user);
        else logout();
      } catch {
        logout();
      } finally {
        if (alive) setReady(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, [setUser, logout]);

  if (!ready) return null;
  return <>{children}</>;
}