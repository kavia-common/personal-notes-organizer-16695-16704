import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Personal Notes Organizer",
  description:
    "Create, edit, search, and organize notes with tags. Minimal, fast, and offline-friendly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
