"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  // прибираємо trailing slash і декодуємо на всяк випадок
  const decoded = decodeURIComponent(path);
  return decoded.length > 1 ? decoded.replace(/\/+$/, "") : decoded;
}

export default function SidebarDefault() {
  const pathname = usePathname();
  const current = normalizePath(pathname);

  return (
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
  );
}