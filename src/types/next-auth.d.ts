import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      role?: string | null;
      jwt?: string;
    } & DefaultSession["user"];
  }

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
