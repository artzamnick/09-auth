"use client";

import type { FetchTagNote } from "@/types/note";

export default function NotesClient({ tag }: { tag: FetchTagNote }) {
  return (
    <main>
      <h1>Notes</h1>
      <p>Current tag: {tag}</p>
    </main>
  );
}