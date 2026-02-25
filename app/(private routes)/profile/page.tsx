"use client";

import Link from "next/link";
import Image from "next/image";
import { useLogin } from "@/lib/store/authStore";

import css from "./page.module.css";

export default function ProfilePage() {
  const user = useLogin((s) => s.user);

  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={128}
            height={128}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
          </div>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}