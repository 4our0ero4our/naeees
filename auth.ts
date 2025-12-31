//  The BRAIN: Configuration & Logic
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'; // Optional: Use zod for validation if you have it

// This defines how authentication works
export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/login', // Redirect here if a user isn't logged in
        signOut: '/login', // Redirect here if a user is logged in
        newUser: '/register', // Redirect here if a user is not registered
    },
    providers: [
        // Option 1: Credentials (Email/Password)
        Credentials({
            async authorize(credentials) {
                // 1. Validate inputs
                const parsedCredentials = z
                    .object({
                        email: z.email(),
                        password: z.string().min(8)
                    }).safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // 2. LOGIC: Check database for user here
                    // const user = await getUserFromDb(email);
                    // if (!user) return null;

                    // 3. LOGIC: Compare passwords
                    // const passwordsMatch = await bcrypt.compare(password, user.password);
                    // if (passwordsMatch) return user;

                    // MOCK FOR NOW (Delete this when you connect your DB):
                    if (email === 'student@school.edu' && password === '123456') {
                        return { id: '1', name: 'John Doe', email: email };
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});