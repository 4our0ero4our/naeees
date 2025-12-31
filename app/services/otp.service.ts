import { OTP } from "@/app/models/OTP.model";
import { connectDB } from "@/app/lib/db/connect";
import { sendOTPEmail } from "./email.service";
import { isValidFutminnaEmail } from "@/app/lib/validators/auth";

/**
 * Generate a random 6-digit OTP code
 */
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP to user's email
 * @param email - The email address to send OTP to
 * @returns The OTP code (would be removed in production sha 🌚)
 */
export async function sendOTP(email: string): Promise<{ success: boolean; message: string }> {
  await connectDB();

  if (!email || !isValidFutminnaEmail(email)) {
    throw new Error("Valid FUTMinna email is required");
  }

  // Check if there's an unverified OTP that hasn't expired
  const existingOTP = await OTP.findOne({
    email,
    verified: false,
    expiresAt: { $gt: new Date() },
  });

  // If there's an active OTP, don't send another one immediately (rate limiting)
  if (existingOTP) {
    const timeSinceCreated = Date.now() - existingOTP.createdAt.getTime();
    const cooldownPeriod = 60000; // 1 minute cooldown

    if (timeSinceCreated < cooldownPeriod) {
      throw new Error(
        `Please wait ${Math.ceil((cooldownPeriod - timeSinceCreated) / 1000)} seconds before requesting a new code`
      );
    }

    // Mark old OTP as expired by deleting it
    await OTP.deleteOne({ _id: existingOTP._id });
  }

  const otpCode = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Save OTP to database
  await OTP.create({
    email,
    code: otpCode,
    expiresAt,
    verified: false,
    attempts: 0,
  });

  // Send email
  await sendOTPEmail(email, otpCode);

  return {
    success: true,
    message: "Verification code sent to your email",
  };
}

/**
 * Verify OTP code
 * @param email - The email address
 * @param code - The OTP code to verify
 * @returns true if verified, throws error otherwise
 */
export async function verifyOTP(email: string, code: string): Promise<boolean> {
  await connectDB();

  if (!email || !code) {
    throw new Error("Email and code are required");
  }

  const otp = await OTP.findOne({
    email,
    code,
    verified: false,
    expiresAt: { $gt: new Date() },
  });

  if (!otp) {
    // Increment attempts for this email (for rate limiting)
    await OTP.updateMany(
      { email, verified: false },
      { $inc: { attempts: 1 } }
    );

    throw new Error("Invalid or expired verification code");
  }

  // Check if too many attempts
  if (otp.attempts >= 5) {
    throw new Error("Too many failed attempts. Please request a new code");
  }

  // Mark OTP as verified
  otp.verified = true;
  await otp.save();

  // Delete all other unverified OTPs for this email
  await OTP.deleteMany({ email, verified: false });

  return true;
}

/**
 * Check if email is verified (has a verified OTP)
 * @param email - The email address to check
 * @returns true if email has been verified
 */
export async function isEmailVerified(email: string): Promise<boolean> {
  await connectDB();

  const verifiedOTP = await OTP.findOne({
    email,
    verified: true,
  });

  return !!verifiedOTP;
}

/**
 * Clean up expired OTPs (optional, MongoDB TTL should handle this, but useful for manual cleanup)
 */
// export async function cleanupExpiredOTPs(): Promise<void> {
//   await connectDB();
//   await OTP.deleteMany({ expiresAt: { $lt: new Date() } });
// }

