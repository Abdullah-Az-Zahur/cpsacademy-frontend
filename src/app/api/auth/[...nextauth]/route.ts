import NextAuth, { type DefaultSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string | null;
      jwt?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role?: string | null;
    jwt?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string | null;
    jwt?: string;
    email?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Strapi",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          return null;
        }

        const user = {
          id: data.user?.id ? String(data.user.id) : "",
          email: data.user?.email ?? null,
          name: data.user?.username || data.user?.email,
          jwt: data.jwt,
          role: data.user?.role?.name ?? null,
        } as const;

        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name,
          jwt: user.jwt,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (typeof user.id !== "undefined") token.id = String(user.id);
        if (typeof user.jwt !== "undefined") token.jwt = user.jwt;
        if (typeof user.role !== "undefined") token.role = user.role ?? null;
        if (typeof user.email !== "undefined") token.email = user.email ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id ?? session.user?.id ?? "",
        role: token.role ?? session.user?.role ?? null,
        jwt: token.jwt ?? session.user?.jwt,
        email: token.email ?? session.user?.email ?? null,
      };

      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
