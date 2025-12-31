import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyCredentials } from "@/app/services/auth.service";

/**
 * Handler for the authentication routes
 * @returns the handler for the authentication routes
 * @throws {Error} if the credentials are invalid
 * @throws {Error} if the user is not found
 * @throws {Error} if the password is not a valid password, throws an error if the email is not a valid email, throws an error if the password is not a valid password
 */
const handler = NextAuth({
  providers: [
    // Credentials provider for email and password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials || !credentials.email || !credentials.password) return null;

        // Verify the credentials
        const user = await verifyCredentials(
          credentials.email,
          credentials.password
        );

        // If the user is not found, return null
        if (!user) return null;

        // If the user is found, return the user
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          membershipStatus: user.membershipStatus,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.membershipStatus = (user as any).membershipStatus;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).membershipStatus = token.membershipStatus;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    newUser: "/register",
  },
});

export { handler as GET, handler as POST };

// Email verification 
// membership status verification should be done immmediately while registering a new user