import { NextResponse } from "next/server";
import { createUser } from "@/app/services/auth.service";
import { validateRegisterInput } from "@/app/lib/validators/auth";
// import { isEmailVerified } from "@/app/services/otp.service";
import { User } from "@/app/models/User.model";
import { MEMBERSHIP_STATUS } from "@/app/lib/constants/auth";
import { ROLES } from "@/app/lib/constants/auth";

/**
 * Register a new user
 * @param req - The request object
 * @returns the response object
 * @throws {Error} if the data is invalid, throws an error if the user already exists, throws an error if the password is less than 8 characters, throws an error if the email is not a valid email, throws an error if the matric number is not a valid matric number, throws an error if the full name is not a valid full name, throws an error if the role is not a valid role, throws an error if the membership status is not a valid membership status, throws an error if the email is not verified
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    validateRegisterInput(body);

    // TODO: Uncomment email verification on production i.e when I get a domain name
    // Check if email has been verified
    // const emailVerified = await isEmailVerified(body.email);
    // if (!emailVerified) {
    //   return NextResponse.json(
    //     { error: "Email address must be verified before registration. Please verify your email first." },
    //     { status: 400 }
    //   );
    // }

    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Check if matric number already exists
    const existingMatricNumber = await User.findOne({ matricNumber: body.matricNumber });
    if (existingMatricNumber) {
      return NextResponse.json(
        { error: "User with this matric number already exists" },
        { status: 400 }
      );
    }

    // Check if membership status is valid
    if (body.membershipStatus !== MEMBERSHIP_STATUS.MEMBER && body.membershipStatus !== MEMBERSHIP_STATUS.NON_MEMBER) {
      return NextResponse.json(
        { error: "Invalid membership status. Please select a valid membership status" },
        { status: 400 }
      );
    }

    // Check if role is valid
    if (body.role !== ROLES.STUDENT && body.role !== ROLES.ADMIN) {
      return NextResponse.json(
        { error: "Invalid role. Please select a valid role. Valid roles are student and admin" },
        { status: 400 }
      );
    }

    await createUser({
      fullName: body.fullName,
      email: body.email,
      matricNumber: body.matricNumber,
      password: body.password,
      membershipStatus: body.membershipStatus,
      role: body.role.toString(),
    });

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
