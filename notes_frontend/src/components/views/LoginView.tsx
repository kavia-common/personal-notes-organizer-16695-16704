"use client";
import React, { useState } from "react";
import { login, register } from "@/lib/auth";

export function LoginView() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "login") await login(email, password);
      else await register(email, password);
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Authentication failed";
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md border border-[var(--color-border)] rounded-[var(--radius-md)] p-6 bg-white shadow-sm">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Personal Notes Organizer</h1>
          <p className="text-sm text-[var(--color-secondary)]">
            {mode === "login" ? "Sign in to continue" : "Create your account"}
          </p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input
              className="input w-full"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Password</label>
            <input
              className="input w-full"
              type="password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
            />
          </div>
          {error && (
            <div className="text-sm text-red-600" role="alert">
              {error}
            </div>
          )}
          <button className={`btn primary w-full ${busy ? "opacity-80" : ""}`} disabled={busy}>
            {busy ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
        <hr className="sep" />
        <div className="text-sm text-center">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button className="text-[var(--color-secondary-brand)]" onClick={() => setMode("register")}>
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="text-[var(--color-secondary-brand)]" onClick={() => setMode("login")}>
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
