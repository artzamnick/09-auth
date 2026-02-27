"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "@/lib/api/clientApi";

import css from "./page.module.css";

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
  });

  if (isLoading) return <p className={css.state}>Loading…</p>;

  if (isError) {
    return (
      <div className={css.state}>
        <h2>Could not load the note.</h2>
        <p style={{ opacity: 0.8 }}>{(error as Error).message}</p>

        <Link href="/notes/filter/all" className={css.backLink}>
          ← Back to notes
        </Link>
      </div>
    );
  }

  if (!data) return null;

  return (
    <main className={css.card}>
      <div className={css.header}>
        <h1 className={css.title}>{data.title}</h1>
        <span className={css.tag}>{data.tag}</span>
      </div>

      {data.content ? <p className={css.content}>{data.content}</p> : null}

      <Link href="/notes/filter/all" className={css.backLink}>
        ← Back to notes
      </Link>
    </main>
  );
}