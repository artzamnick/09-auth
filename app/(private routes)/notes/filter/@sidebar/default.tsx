"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect } from "react";
import { useLogin } from "@/lib/store/authStore";
import { useNavTheme } from "@/lib/store/navThemeStore";

import css from "./default.module.css";

type MenuItem = {
  label: string;
  href: string;
};

const MENU: MenuItem[] = [
  { label: "All notes", href: "/notes/filter/all" },
  { label: "Todo", href: "/notes/filter/Todo" },
  { label: "Work", href: "/notes/filter/Work" },
  { label: "Personal", href: "/notes/filter/Personal" },
  { label: "Meeting", href: "/notes/filter/Meeting" },
  { label: "Shopping", href: "/notes/filter/Shopping" },
];

function normalizePath(path: string) {
  const decoded = decodeURIComponent(path);
  return decoded.length > 1 ? decoded.replace(/\/+$/, "") : decoded;
}

export default function SidebarDefault() {
  const pathname = usePathname();
  const current = normalizePath(pathname);

  const isAuthenticated = useLogin((s) => s.isAuthenticated);
  const userEmail = useLogin((s) => s.user?.email);

  const theme = useNavTheme((s) => s.theme);
  const initForUser = useNavTheme((s) => s.initForUser);
  const toggle = useNavTheme((s) => s.toggle);

  useEffect(() => {
    if (isAuthenticated && userEmail) {
      initForUser(userEmail);
    }
  }, [isAuthenticated, userEmail, initForUser]);

  return (
    <div className={css.sidebarInner}>
      <nav aria-label="Notes filters">
        <ul className={css.menuList}>
          {MENU.map((item) => {
            const href = normalizePath(item.href);
            const isActive = current === href;

            return (
              <li key={item.href} className={css.menuItem}>
                <Link
                  href={item.href}
                  className={`${css.menuLink} ${isActive ? css.active : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {isAuthenticated ? (
        <div className={css.bottomBlock}>
          <button
            type="button"
            className={css.themeToggle}
            onClick={toggle}
            aria-pressed={theme === "light"}
          >
            <span className={css.themeLabel}>Theme</span>
            <span className={css.themeValue}>
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}