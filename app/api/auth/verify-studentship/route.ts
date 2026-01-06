import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/db/connect";
import { verifyStudentship } from "@/app/services/auth.service";
import { Student } from "@/app/models/Student.model";

/**
 * Verify studentship status
 * @param req - The request object
 * @returns the response object with studentship verification status
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, matricNumber } = body;

    if (!email || !matricNumber) {
      return NextResponse.json(
        { error: "Email and matric number are required to verify studentship" },
        { status: 400 }
      );
    }

    const result = await verifyStudentship(email, matricNumber);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}