import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db/connect";
import { User } from "@/app/models/User.model";

/**
 * Update user role
 * @param req - The request object
 * @returns the response object
 * @throws {Error} if the role is not updated
 */
export async function PATCH(req: Request) {
  const { email, role } = await req.json();

  await connectDB();

  await User.findOneAndUpdate(
    { email },
    { role }
  );

  return NextResponse.json({ success: true, message: "Role updated" }, { status: 200 });
}
