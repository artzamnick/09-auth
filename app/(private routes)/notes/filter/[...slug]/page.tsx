import type { Metadata } from "next";
import { cookies } from "next/headers";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

import type { FetchTagNote, NoteTag } from "@/types/note";
import { api } from "@/lib/api/api";
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

async function fetchNotesServer(tag: FetchTagNote, page: number, search: string) {
  const cookieStore = await cookies();

  const params: Record<string, string | number> = {
    page,
    perPage: PER_PAGE,
  };

  if (tag !== "all") params.tag = tag;
  if (search) params.search = search;

  const res = await api.get<NotesAnswer>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
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