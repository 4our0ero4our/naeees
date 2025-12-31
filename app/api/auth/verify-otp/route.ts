import { NextResponse } from "next/server";
import { verifyOTP } from "@/app/services/otp.service";

/**
 * Verify OTP code
 * POST /api/auth/verify-otp
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 }
      );
    }

    await verifyOTP(email, code);

    return NextResponse.json(
      { success: true, message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

