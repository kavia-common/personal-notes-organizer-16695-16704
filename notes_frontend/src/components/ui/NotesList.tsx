"use client";
import React from "react";
import { Note } from "@/lib/types";
import { archiveNote, deleteNote, togglePin } from "@/lib/notes";

type Props = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (n: Note) => void;
};

export function NotesList({ notes, selectedId, onSelect }: Props) {
  if (notes.length === 0) {
    return (
      <div className="text-sm text-[var(--color-secondary)]">
        No notes found. Create or adjust filters.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notes.map((n) => {
        const isActive = selectedId === n.id;
        return (
          <article
            key={n.id}
            className="note-item p-3 cursor-pointer"
            style={{
              borderColor: isActive ? "var(--color-secondary-brand)" : "var(--color-border)",
              boxShadow: isActive ? "0 0 0 3px rgba(37,99,235,0.10)" : "none",
            }}
            onClick={() => onSelect(n)}
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-medium truncate">{n.title || "Untitled"}</h4>
              <div className="flex items-center gap-1">
                <button
                  className="btn"
                  title={n.pinned ? "Unpin" : "Pin"}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(n.id);
                  }}
                >
                  {n.pinned ? "Unpin" : "Pin"}
                </button>
                <button
                  className="btn"
                  title={n.archived ? "Unarchive" : "Archive"}
                  onClick={(e) => {
                    e.stopPropagation();
                    archiveNote(n.id, !n.archived);
                  }}
                >
                  {n.archived ? "Unarchive" : "Archive"}
                </button>
                <button
                  className="btn"
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete this note?")) deleteNote(n.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-[var(--color-secondary)] line-clamp-2 mt-1">
              {n.content || "No content"}
            </p>
            <div className="text-xs text-[var(--color-secondary)] mt-1">
              {new Date(n.updatedAt).toLocaleString()}
            </div>
          </article>
        );
      })}
    </div>
  );
}
