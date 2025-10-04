"use client";

import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  window.location.href = "/login";
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("user");
  return stored ? (JSON.parse(stored) as User) : null;
}

export function getJwt(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("jwt");
}

// Hook to use in client components/layouts
export function useAuth(redirectToLogin = true) {
  const [user, setUser] = useState<User | null>(null);
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

  return { user, loading, setUser, setLoading };
}
