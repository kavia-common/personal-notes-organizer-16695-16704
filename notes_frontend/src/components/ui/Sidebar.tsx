"use client";
import React, { useState } from "react";
import { Tag } from "@/lib/types";
import { createTag, deleteTag, updateTag } from "@/lib/notes";
import { logout } from "@/lib/auth";

type Props = {
  tags: Tag[];
  activeTagIds: string[];
  onToggleTag: (id: string) => void;
  onClearTags: () => void;
  onNewNote: () => void;
};

export function Sidebar({ tags, activeTagIds, onToggleTag, onClearTags, onNewNote }: Props) {
  const [newTag, setNewTag] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <button className="btn accent w-full" onClick={onNewNote}>+ New Note</button>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          <button className="tag" onClick={onClearTags}>All</button>
          {tags.map((t) => {
            const active = activeTagIds.includes(t.id);
            return (
              <button
                key={t.id}
                className="tag"
                style={{
                  background: active ? (t.color ?? "var(--color-secondary-brand)") : "#fff",
                  color: active ? "#fff" : "var(--color-secondary)",
                  borderColor: active ? (t.color ?? "var(--color-secondary-brand)") : "var(--color-border)",
                }}
                onClick={() => onToggleTag(t.id)}
                title="Toggle filter"
              >
                {t.name}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <input
            className="input w-full"
            placeholder="New tag name"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => {
              if (!newTag.trim()) return;
              createTag(newTag.trim());
              setNewTag("");
              // Note: app list re-renders via page state changes on interactions.
            }}
          >
            Add
          </button>
        </div>

        <div className="mt-3 space-y-1">
          {tags.map((t) => (
            <div key={t.id} className="flex items-center justify-between">
              {editingId === t.id ? (
                <>
                  <input
                    className="input flex-1 mr-2"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button
                    className="btn"
                    onClick={() => {
                      if (editName.trim()) updateTag(t.id, { name: editName.trim() });
                      setEditingId(null);
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="text-sm text-[var(--color-secondary)]">{t.name}</span>
                  <div className="flex gap-1">
                    <button
                      className="btn"
                      onClick={() => {
                        setEditingId(t.id);
                        setEditName(t.name);
                      }}
                    >
                      Rename
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        if (confirm("Delete this tag?")) deleteTag(t.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <button className="btn w-full" onClick={() => logout()}>Sign out</button>
        <p className="text-xs text-[var(--color-secondary)] mt-2">
          v1 • Minimal light theme
        </p>
      </div>
    </div>
  );
}
