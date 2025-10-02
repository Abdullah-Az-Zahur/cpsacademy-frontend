"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return { user };
}
