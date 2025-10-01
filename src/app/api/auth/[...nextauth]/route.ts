import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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
          // authorization failed
          return null;
        }

        return {
          id: data.user?.id,
          email: data.user?.email,
          name: data.user?.username || data.user?.email,
          jwt: data.jwt,
          role: data.user?.role?.name,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = (user as any).jwt;
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).user = {
        id: token.id,
        email: token.email,
        role: token.role,
        jwt: token.jwt,
        name: session.user?.name,
      };
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
