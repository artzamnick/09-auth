"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";

import { register } from "@/lib/api/clientApi";
import { useLogin } from "@/lib/store/authStore";

import css from "./page.module.css";

export default function SignUpPage() {
  const id = useId();
  const router = useRouter();

  const setUser = useLogin((s) => s.setUser);

  const [error, setError] = useState<string>("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (pending) return;

    setError("");
    setPending(true);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("Please fill in all fields.");
      setPending(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setPending(false);
      return;
    }

    try {
      const user = await register({ email, password });
      setUser(user);

      router.replace("/profile");
      router.refresh();
    } catch {
      setError("Registration failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign Up</h1>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-email`}>Email</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-password`}>Password</label>
          <input
            id={`${id}-password`}
            name="password"
            type="password"
            className={css.input}
            required
            minLength={6}
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={pending}>
            {pending ? "Registering..." : "Register"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}