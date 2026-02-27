"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout as apiLogout } from "@/lib/api/clientApi";
import { useLogin } from "@/lib/store/authStore";

import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();

  const isAuthenticated = useLogin((s) => s.isAuthenticated);
  const user = useLogin((s) => s.user);
  const clearAuth = useLogin((s) => s.clearIsAuthenticated);

  async function handleLogout() {
    try {
      await apiLogout();
    } finally {
      clearAuth();
      router.push("/sign-in");
      router.refresh();
    }
  }

  return (
    <li className={css.navigationItem}>
      {isAuthenticated ? (
        <div className={css.authRow}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </Link>

          <p className={css.userEmail}>{user?.email ?? ""}</p>

          <button
            type="button"
            onClick={handleLogout}
            className={css.logoutButton}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className={css.guestRow}>
          <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
            Login
          </Link>

          <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
            Sign up
          </Link>
        </div>
      )}
    </li>
  );
}