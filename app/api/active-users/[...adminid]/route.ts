import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db/connect";
import { User } from "@/app/models/User.model";

/**
 * Get all active users
 * @param req - The request object
 * @returns the active users
 * @throws {Error} if the active users are not found
 */
export async function GET(req: Request) {
  await connectDB();
  const { adminid } = await req.json();
  const users = await User.find({ _id: adminid });
  return NextResponse.json({ success: true, data: users }, { status: 200 });
}