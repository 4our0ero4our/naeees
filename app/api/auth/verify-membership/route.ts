import { NextResponse } from "next/server";
import { verifyMembership } from "@/app/services/auth.service";

/**
 * Verify membership status
 * @param req - The request object
 * @returns the response object with membership verification status
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, matricNumber } = body;

    if (!email || !matricNumber) {
      return NextResponse.json(
        { error: "Email and matric number are required" },
        { status: 400 }
      );
    }

    const result = await verifyMembership(email, matricNumber);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

