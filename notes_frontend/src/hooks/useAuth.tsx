"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState } from "@/lib/types";
import { getCurrentAuth, onAuthStateChanged } from "@/lib/auth";

type Ctx = {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
};

const AuthContext = createContext<Ctx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>({ user: null, token: null });

  useEffect(() => {
    setAuthState(getCurrentAuth());
    const unsub = onAuthStateChanged((s) => setAuthState(s));
    return () => unsub();
  }, []);

  const setAuth = (a: AuthState) => setAuthState(a);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access current authentication state and setter. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
