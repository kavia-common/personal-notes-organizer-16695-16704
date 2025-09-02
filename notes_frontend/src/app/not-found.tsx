import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-6">
      <section
        className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-8 bg-white text-center"
        role="alert"
        aria-live="assertive"
      >
        <h1 className="text-2xl font-semibold mb-2">404 – Page Not Found</h1>
        <p className="text-[var(--color-secondary)]">The page you’re looking for doesn’t exist.</p>
      </section>
    </main>
  );
}
