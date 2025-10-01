// src/types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extend DefaultSession to include jwt and role and id as string
   */
  interface Session {
    user: {
      id: string;
      email?: string | null;
      role?: string | null;
      jwt?: string;
    } & DefaultSession["user"];
  }

  /**
   * The `User` type returned from `authorize()` — keep fields optional/consistent.
   */
  interface User {
    id?: string;
    name?: string;
    email?: string;
    jwt?: string;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    jwt?: string;
    role?: string;
  }
}
