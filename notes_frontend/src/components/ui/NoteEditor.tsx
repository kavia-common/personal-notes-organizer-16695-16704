"use client";
import React, { useEffect, useState } from "react";
import { Note, Tag } from "@/lib/types";
import { createTag, listTags, updateNote } from "@/lib/notes";

type Props = {
  note: Note | null;
  onNoNote: () => void;
};

export function NoteEditor({ note, onNoNote }: Props) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [tagIds, setTagIds] = useState<string[]>(note?.tagIds ?? []);
  const [newTag, setNewTag] = useState("");

  const tags: Tag[] = listTags();

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    setTagIds(note?.tagIds ?? []);
  }, [note?.id, note?.title, note?.content, note?.tagIds]);

  if (!note) {
    return (
      <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-6 text-[var(--color-secondary)]">
        Select or create a note to start editing.
      </div>
    );
  }

  function savePartial(p: Partial<Note>) {
    updateNote(note.id, p);
  }

  return (
    <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 bg-white h-full flex flex-col">
      <input
        className="input text-lg font-medium mb-3"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          savePartial({ title: e.target.value });
        }}
        placeholder="Note title"
      />
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {tags.map((t) => {
          const active = tagIds.includes(t.id);
          return (
            <button
              key={t.id}
              className="tag"
              style={{
                background: active ? (t.color ?? "var(--color-secondary-brand)") : "#fff",
                color: active ? "#fff" : "var(--color-secondary)",
                borderColor: active ? (t.color ?? "var(--color-secondary-brand)") : "var(--color-border)",
              }}
              onClick={() => {
                const next = active ? tagIds.filter((x) => x !== t.id) : [...tagIds, t.id];
                setTagIds(next);
                savePartial({ tagIds: next });
              }}
            >
              {t.name}
            </button>
          );
        })}
        <div className="flex items-center gap-2">
          <input
            className="input"
            placeholder="Add tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => {
              const name = newTag.trim();
              if (!name) return;
              const tag = createTag(name);
              const next = [...tagIds, tag.id];
              setTagIds(next);
              savePartial({ tagIds: next });
              setNewTag("");
            }}
          >
            Add
          </button>
        </div>
      </div>

      <textarea
        className="input min-h-[300px] flex-1 resize-none"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          savePartial({ content: e.target.value });
        }}
        placeholder="Write your note..."
      />
      <div className="text-xs text-[var(--color-secondary)] pt-2">
        Updated {new Date(note.updatedAt).toLocaleString()}
      </div>
      <div className="mt-2">
        <button
          className="btn"
          onClick={() => {
            onNoNote();
          }}
          title="Close editor"
        >
          Close
        </button>
      </div>
    </div>
  );
}
