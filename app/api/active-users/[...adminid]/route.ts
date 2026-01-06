import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db/connect";
import { User } from "@/app/models/User.model";
import { auth } from "@/auth";

/**
 * Get all active users
 * @param req - The request object
 * @returns the active users
 * @throws {Error} if the active users are not found
 */
export async function GET(req: Request) {
  const session = await auth();
  // Check if the user is authenticated and has the required role
  if (!session || ((session?.user as any)?.role !== "super_admin") || ((session?.user as any)?.role !== "admin")) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  // Connect to the database
  await connectDB();

  // Get all users
  const users = await User.find();

  // Return the users
  return NextResponse.json({ success: true, data: users }, { status: 200 });
}