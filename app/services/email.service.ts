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
      from: process.env.RESEND_FROM_EMAIL || "NAEEES <onboarding@resend.dev>",
      to: [email],
      subject: "Action Required: Verify Your Student Email",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
          </head>
          <body style="background-color: #F8F9FA; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px 0; margin: 0;">
            
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; background-color: #ffffff; border: 4px solid #000000;">
                    
                    <tr>
                      <td style="background-color: #000000; padding: 25px; text-align: center; border-bottom: 4px solid #000000;">
                         <span style="color: #ffffff; font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; font-family: Arial, sans-serif;">
                           NAEEES <span style="color: #22C55E;">Digital</span>
                         </span>
                      </td>
                    </tr>
  
                    <tr>
                      <td style="padding: 40px 30px;">
                        
                        <h1 style="color: #000000; margin: 0 0 20px 0; font-size: 28px; font-weight: 900; line-height: 1.1; font-family: Arial, sans-serif;">
                          Verify Your<br/>Student Identity
                        </h1>
                        
                        <p style="color: #444444; font-size: 16px; line-height: 1.6; margin-bottom: 30px; font-weight: 500;">
                          You are attempting to register for the NAEEES Digital Portal. To secure your account, please enter the code below.
                        </p>
  
                        <div style="background-color: #EAB308; border: 3px solid #000000; padding: 20px; text-align: center; margin-bottom: 30px; box-shadow: 6px 6px 0px 0px #000000;">
                          <span style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: 900; letter-spacing: 6px; color: #000000; display: block;">
                            ${otpCode}
                          </span>
                        </div>
  
                        <p style="color: #666666; font-size: 13px; margin-bottom: 0; line-height: 1.5;">
                          <strong>Note:</strong> This code expires in 10 minutes. If you did not initiate this request, please ignore this email.
                        </p>
  
                      </td>
                    </tr>
  
                    <tr>
                      <td style="background-color: #F8F9FA; padding: 20px; text-align: center; border-top: 4px solid #000000;">
                        <p style="font-size: 12px; color: #888888; margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                          © NAEEES Digital Portal
                        </p>
                      </td>
                    </tr>
  
                  </table>
  
                </td>
              </tr>
            </table>
  
          </body>
        </html>
      `,
      text: `
  NAEEES Digital Portal
  VERIFY YOUR STUDENT IDENTITY
  
  Your verification code is: ${otpCode}
  
  This code expires in 10 minutes.
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

