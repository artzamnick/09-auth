"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const isLogin = useLogin((s) => s.isAuthenticated);
  const clearUser = useLogin((s) => s.clearIsAuthenticated);
  const user = useLogin((s) => s.user);

  async function out() {
    await logout();
    clearUser();
    router.push("/sign-in");
  }

  return (
    <>
      {isLogin ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user.email}</p>
            <button
              type="button"
              onClick={out}
              className={css.logoutButton}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}