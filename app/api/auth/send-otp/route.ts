import { NextResponse } from "next/server";
import { sendOTP } from "@/app/services/otp.service";

/**
 * Send OTP to user's email
 * POST /api/auth/send-otp
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const result = await sendOTP(email);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

