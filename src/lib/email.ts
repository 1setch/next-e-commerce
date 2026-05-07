// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/api/auth/verify?token=${token}`;

    const { data, error } = await resend.emails.send({
      from: "SHOP.CO <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email address",
      html: `
      <div style="font-family: Arial; max-width: 480px; margin: 0 auto; padding: 20px;">
        <h2>Welcome to SHOP.CO!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 8px; margin: 16px 0;">
          Verify Email
        </a>
        <p style="color: #888; font-size: 14px;">This link expires in 24 hours.</p>
      </div>
    `,
    });
    if (error) {
      console.error("Resend error:", error);
      return;
    }

    console.log("Email sent:", data?.id);
  } catch (err) {
    console.error("Send email failed:", err);
  }
}
