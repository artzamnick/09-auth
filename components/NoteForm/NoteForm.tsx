"use client";

import css from "./NoteForm.module.css";

import { useId } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "@/lib/api/clientApi";
import type { CreateNotePayload, NoteTag } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const id = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);
  const clearDraft = useNoteStore((s) => s.clearDraft);

  const createMutation = useMutation({
    mutationFn: async (data: CreateNotePayload) => {
      return createNote(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  function change(
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = ev.target;

    if (name === "tag") {
      setDraft({ tag: value as NoteTag });
      return;
    }

    if (name === "title") setDraft({ title: value });
    if (name === "content") setDraft({ content: value });
  }

  function cancelForm() {
    router.back();
  }

  function handleSubmit(formData: FormData) {
    const newNote: CreateNotePayload = {
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      tag: String(formData.get("tag") ?? "Todo") as NoteTag,
    };

    createMutation.mutate(newNote);
  }

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          onChange={change}
          type="text"
          id={`${id}-title`}
          name="title"
          className={css.input}
          required
          defaultValue={draft.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          onChange={change}
          id={`${id}-content`}
          name="content"
          className={css.textarea}
          rows={8}
          defaultValue={draft.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        <select
          onChange={change}
          id={`${id}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button onClick={cancelForm} type="button" className={css.cancelButton}>
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          {createMutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>

      {createMutation.isError && (
        <p className={css.error}>
          {(createMutation.error as Error).message}
        </p>
      )}
    </form>
  );
}