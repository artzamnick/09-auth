"use client";

import { useLogin } from "@/lib/store/authStore";
import { redirect } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useLogin((s) => s.isAuthenticated);

  if (isAuthenticated) {
    redirect("/profile");
  }

  return <>{children}</>;
}