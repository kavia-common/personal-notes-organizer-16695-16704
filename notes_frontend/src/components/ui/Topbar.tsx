"use client";
import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function Topbar({ value, onChange }: Props) {
  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex-1">
        <input
          className="input w-full"
          placeholder="Search notes..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      <div className="hidden md:flex items-center gap-2">
        <span className="text-sm text-[var(--color-secondary)]">Tip: Use tags to filter</span>
      </div>
    </div>
  );
}
