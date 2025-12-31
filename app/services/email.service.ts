import { Resend } from "resend";
import { isValidFutminnaEmail } from "@/app/lib/validators/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Email functionality will not work.");
}

/**
 * Send OTP email to user
 * @param email - The email address to send to
 * @param otpCode - The OTP code to send
 * @returns Promise that resolves when email is sent
 */
export async function sendOTPEmail(email: string, otpCode: string) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Email service is not configured. Please set RESEND_API_KEY.");
  }

  if (!isValidFutminnaEmail(email)) {
    throw new Error("Invalid email address");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "NAEEES Digital Portal <naeeesdigitalportal@resend.dev>",
      to: [email],
      subject: "Verify Your Email - NAEEES Digital Portal",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #22C55E; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #000; margin: 0; font-size: 24px;">NAEEES Digital Portal</h1>
            </div>
            <div style="background-color: #f9f9f9; padding: 30px; border: 3px solid #000; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #000; margin-top: 0;">Verify Your Email Address</h2>
              <p style="font-size: 16px;">Thank you for registering with NAEEES Digital Portal. Please use the following code to verify your email address:</p>
              
              <div style="background-color: #000; color: #EAB308; padding: 20px; text-align: center; border-radius: 8px; margin: 30px 0;">
                <h1 style="font-size: 32px; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">${otpCode}</h1>
              </div>
              
              <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes. If you didn't request this code, please ignore this email.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd;">
                <p style="font-size: 12px; color: #999; margin: 0;">NAEEES Digital Portal | Nigerian Association of Electrical and Electronics Engineering Students</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
NAEEES Digital Portal - Email Verification

Verify Your Email Address

Thank you for registering with NAEEES Digital Portal. Please use the following code to verify your email address:

${otpCode}

This code will expire in 10 minutes. If you didn't request this code, please ignore this email.

NAEEES Digital Portal | Nigerian Association of Electrical and Electronics Engineering Students
      `,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
  } catch (error: any) {
    console.error("Error sending OTP email:", error);
    throw new Error(error.message || "Failed to send verification email");
  }
}

