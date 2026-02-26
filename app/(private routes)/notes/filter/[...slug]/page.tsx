import type { Metadata } from "next";
import { cookies } from "next/headers";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

import type { FetchTagNote, NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

import css from "./page.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{ slug?: string[] }>;
};

const PER_PAGE = 12;

const ALLOWED = new Set<NoteTag>([
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
]);

type NotesAnswer = {
  notes: unknown[];
  totalPages: number;
};

function resolveTag(raw?: string): FetchTagNote {
  if (!raw || raw === "all") return "all";
  return ALLOWED.has(raw as NoteTag) ? (raw as NoteTag) : "all";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const raw = slug?.[0];
  const tag = resolveTag(raw);

  const filterLabel = tag === "all" ? "All notes" : tag;
  const title = `${filterLabel} | NoteHub`;
  const description = `Notes list filtered by: ${filterLabel}.`;
  const url = `/notes/filter/${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw && raw.trim().length > 0) return raw.replace(/\/$/, "");
  return "http://localhost:3000";
}

async function fetchNotesServer(
  tag: FetchTagNote,
  page: number,
  search: string
): Promise<NotesAnswer> {
  const cookieStore = await cookies();

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("perPage", String(PER_PAGE));
  if (tag !== "all") params.set("tag", tag);
  if (search) params.set("search", search);

  const res = await fetch(`${getSiteUrl()}/api/notes?${params.toString()}`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`SSR notes failed: ${res.status} ${text}`);
  }

  return (await res.json()) as NotesAnswer;
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  const raw = slug?.[0];
  const tag = resolveTag(raw);

  const page = 1;
  const search = "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, page, search],
    queryFn: () => fetchNotesServer(tag, page, search),
  });

  return (
    <div className={css.container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
}