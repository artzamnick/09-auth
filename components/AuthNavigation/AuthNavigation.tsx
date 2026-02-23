"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

export default function AuthNavigation() {
  const router = useRouter();
  const isLogin = useLogin((s) => s.isAuthenticated);
  const clearUser = useLogin((s) => s.clearIsAuthenticated);
  const user = useLogin((s) => s.user);

  async function out() {
    const res = await logout();
    if (res) {
      clearUser();
      router.push("/sign-in");
    }
  }

  return (
    <>
      {isLogin ? (
        <>
          <li>
            <Link href="/profile" prefetch={false}>
              Profile
            </Link>
          </li>
          <li>
            <span>{user.email || "User email"}</span>{" "}
            <button type="button" onClick={out}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/sign-in" prefetch={false}>
              Login
            </Link>
          </li>
          <li>
            <Link href="/sign-up" prefetch={false}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}