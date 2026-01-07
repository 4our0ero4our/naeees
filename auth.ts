//  The BRAIN: Configuration & Logic
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verifyCredentials } from '@/app/services/auth.service';

class SuspendedError extends CredentialsSignin {
    code = "account_suspended"
}

// This defines how authentication works
export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/login', // Redirect here if a user isn't logged in
        signOut: '/login', // Redirect here if a user is logged in
        newUser: '/register', // Redirect here if a user is not registered
    },
    providers: [
        // Credentials provider for email and password
        Credentials({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) return null;

                // Verify the credentials using the database
                const user = await verifyCredentials(
                    credentials.email as string,
                    credentials.password as string
                );

                // If the user is not found, return null
                if (!user) return null;

                // Check for suspension
                if (user.isActive === false) {
                    throw new SuspendedError();
                }

                // If the user is found, return the user
                return {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role,
                    membershipStatus: user.membershipStatus,
                    fullName: user.fullName,
                    matricNumber: user.matricNumber,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 60 * 1000, // 30 minutes
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.membershipStatus = (user as any).membershipStatus;
                token.fullName = (user as any).fullName;
                token.matricNumber = (user as any).matricNumber;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).role = token.role;
                (session.user as any).membershipStatus = token.membershipStatus;
                (session.user as any).fullName = token.fullName as string;
                (session.user as any).matricNumber = token.matricNumber as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // If redirecting after sign in, go to dashboard
            if (url === baseUrl || url === `${baseUrl}/login`) {
                return `${baseUrl}/dashbaord`;
            }
            // Allow relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Allow callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
});