"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import type { FetchTagNote, Note } from "@/types/note";
import { fetchNotes } from "@/lib/api/clientApi";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import css from "./page.module.css";

type NotesAnswer = {
  notes: Note[];
  totalPages: number;
};

const PER_PAGE = 12;
const SEARCH_DEBOUNCE_MS = 500;

function pickPositiveInt(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

export default function NotesClient({ tag }: { tag: FetchTagNote }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = pickPositiveInt(searchParams.get("page"), 1);
  const search = (searchParams.get("search") ?? "").trim();

  const [inputValue, setInputValue] = useState<string>(search);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const pushParams = useCallback(
    (next: { page?: number; search?: string }) => {
      const sp = new URLSearchParams(searchParams.toString());

      const nextSearch = (next.search ?? search).trim();
      if (nextSearch) sp.set("search", nextSearch);
      else sp.delete("search");

      if (next.search !== undefined) {
        sp.delete("page");
      } else {
        const nextPage = next.page ?? page;
        if (nextPage <= 1) sp.delete("page");
        else sp.set("page", String(nextPage));
      }

      const qs = sp.toString();
      router.push(qs ? `?${qs}` : "?");
    },
    [page, router, search, searchParams]
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      const normalized = inputValue.trim();
      if (normalized !== search) {
        pushParams({ search: normalized });
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(id);
  }, [inputValue, search, pushParams]);

  const queryKey = useMemo(() => ["notes", tag, page, search] as const, [
    tag,
    page,
    search,
  ]);

  const { data, isLoading, isError, error, isFetching } = useQuery<NotesAnswer>({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
        tag: tag === "all" ? undefined : tag,
      }),
    placeholderData: (prev) => prev,
  });

  const totalPages = data?.totalPages ?? 1;
  const hasNotes = (data?.notes?.length ?? 0) > 0;

  return (
    <main className={css.container}>
      <div className={css.toolbar}>
        <SearchBox value={inputValue} onChange={setInputValue} />

        {hasNotes ? (
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={(nextPage: number) => pushParams({ page: nextPage })}
          />
        ) : null}

        <Link className={css.createLink} href="/notes/action/create">
          Create note +
        </Link>
      </div>

      {isLoading ? <p>Loading, please wait...</p> : null}

      {isError ? (
        <p>
          Could not fetch notes.{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      ) : null}

      {!isLoading && !isError && data ? (
        <>
          {isFetching ? <p>Updating…</p> : null}
          <NoteList notes={data.notes} />
        </>
      ) : null}
    </main>
  );
}