"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type Role =
  | "normal_user"
  | "student"
  | "developer"
  | "social_media_manager";

export interface AuthUser {
  id: number | string;
  email?: string | null;
  username?: string;
  name?: string;
  role?: Role | null;
  jwt?: string;
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  // use location rather than router to ensure full nav away from protected pages
  window.location.href = "/login";
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("user");
  return stored ? (JSON.parse(stored) as AuthUser) : null;
}

export function getJwt(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("jwt");
}

// Hook to use in client components/layouts
export function useAuth(redirectToLogin = true) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const u = getUser();
    setUser(u);
    setLoading(false);

    if (!u && redirectToLogin) {
      router.replace("/");
    }
  }, [redirectToLogin, router]);

  return { user, loading, setUser };
}
