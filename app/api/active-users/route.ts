import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db/connect";
import { User } from "@/app/models/User.model";
import { getRoleFromSession } from "@/app/services/session.service";
import { ROLES } from "@/app/lib/constants/auth";

/**
 * Get all active users
 * @param req - The request object
 * @returns the active users
 * @throws {Error} if the active users are not found
 */
export async function GET(req: Request) {
  try {
    const role = await getRoleFromSession();
    if (!role) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    // Check if the user is a super admin or an admin
    if (role !== ROLES.SUPER_ADMIN && role !== ROLES.ADMIN) {
      return NextResponse.json({ success: false, message: "You are not authorized to access this resource" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  // Connect to the database
  await connectDB();
  // Get all users
  const users = await User.find();
  // Get all active users
  // const activeUsers = users.filter((user: any) => user.isActive);

  return NextResponse.json({ success: true, data: users}, { status: 200 });
//   return NextResponse.json({ success: true, data: users.filter((user: any) => user.isActive) }, { status: 200 });
}