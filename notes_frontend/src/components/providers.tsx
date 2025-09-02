"use client";
import React, { useEffect } from "react";
import { ensureSeedData } from "@/lib/storage";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Seed initial demo content for first load
    try {
      ensureSeedData();
    } catch {
      // ignore
    }
  }, []);
  return <>{children}</>;
}
