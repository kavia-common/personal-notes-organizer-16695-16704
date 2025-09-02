"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { LoginView } from "@/components/views/LoginView";
import { Sidebar } from "@/components/ui/Sidebar";
import { Topbar } from "@/components/ui/Topbar";
import { NotesList } from "@/components/ui/NotesList";
import { NoteEditor } from "@/components/ui/NoteEditor";
import { Note, Tag } from "@/lib/types";
import { createNote, listNotes, listTags } from "@/lib/notes";

function AppShell() {
  const { auth } = useAuth();
  const [query, setQuery] = useState("");
  const [activeTagIds, setActiveTagIds] = useState<string[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const tags = useMemo<Tag[]>(() => listTags(), []);
  const notes = useMemo<Note[]>(
    () => listNotes({ query, tagIds: activeTagIds }),
    // We trigger refresh manually when actions occur
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, activeTagIds, selectedNote]
  );

  useEffect(() => {
    if (!selectedNote && notes.length > 0) {
      setSelectedNote(notes[0]);
    } else if (selectedNote) {
      // if selected note got filtered out, deselect
      const stillExists = notes.find((n) => n.id === selectedNote.id);
      if (!stillExists) setSelectedNote(notes[0] ?? null);
    }
  }, [notes, selectedNote]);

  if (!auth.user) return <LoginView />;

  return (
    <div className="app-shell">
      <aside className="sidebar p-4">
        <Sidebar
          tags={tags}
          activeTagIds={activeTagIds}
          onToggleTag={(id) =>
            setActiveTagIds((prev) =>
              prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            )
          }
          onClearTags={() => setActiveTagIds([])}
          onNewNote={() => {
            const n = createNote();
            setSelectedNote(n);
          }}
        />
      </aside>

      <header className="topbar flex items-center gap-3 px-4">
        <Topbar value={query} onChange={setQuery} />
      </header>

      <main className="main grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4 p-4">
        <section className="space-y-3">
          <NotesList
            notes={notes}
            selectedId={selectedNote?.id || null}
            onSelect={(n) => setSelectedNote(n)}
          />
        </section>
        <section className="min-h-[60vh]">
          <NoteEditor note={selectedNote} onNoNote={() => setSelectedNote(null)} />
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
