"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

interface AuthUser {
  id: string;
  email?: string | null;
  name?: string;
  role?: string | null;
  jwt?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return { user };
}
