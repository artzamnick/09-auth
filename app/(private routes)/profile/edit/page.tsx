"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useLogin } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";

import css from "./page.module.css";

export default function EditProfilePage() {
  const router = useRouter();

  const user = useLogin((s) => s.user);
  const setUser = useLogin((s) => s.setUser);

  const [username, setUsername] = useState(user.username);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setUsername(user.username);
  }, [user.username]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updated = await updateMe({ email: user.email, username });
      setUser(updated);
      router.push("/profile");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || "/default-avatar.png"}
          alt="User Avatar"
          width={128}
          height={128}
          className={css.avatar}
        />

        <form onSubmit={onSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isSaving}
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => router.push("/profile")}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}