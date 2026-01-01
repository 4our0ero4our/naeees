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
  const users = await User.find();
//   const activeUsers = users.filter((user: any) => user.isActive);

  if (!users) {
    return NextResponse.json({ success: false, message: "Users not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: users}, { status: 200 });
//   return NextResponse.json({ success: true, data: users.filter((user: any) => user.isActive) }, { status: 200 });
}