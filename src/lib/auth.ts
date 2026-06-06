import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [],

  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after login
      return "/admin/";
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};
