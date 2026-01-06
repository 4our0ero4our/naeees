import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Get the session of the user
 * @param req - The request object
 * @returns the session of the user
 * @throws {Error} if the session is not found
 */
export async function getRoleFromSession(): Promise<string | null> {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return (session?.user as any)?.role as string;
}