/**
 * Handler for the authentication routes
 * This file exports the NextAuth handlers for the API routes
 * The actual configuration is in auth.ts
 */
import { handlers } from '@/auth';

export const { GET, POST } = handlers;

// Email verification 
// membership status verification should be done immmediately while registering a new user