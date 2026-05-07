// lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // ← true для 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const verificationUrl = `${baseUrl}/api/auth/verify?token=${token}`;

  const info = await transporter.sendMail({
    from: `"SHOP.CO" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #000; font-size: 24px; margin: 0;">SHOP.CO</h1>
        </div>
        <h2 style="color: #000;">Welcome!</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
          Thanks for creating an account. Please verify your email address by clicking the button below:
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 14px 32px; background: #000; color: #fff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600;">
            Verify Email
          </a>
        </div>
        <p style="color: #888; font-size: 14px;">
          If you didn't create an account, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
        <p style="color: #aaa; font-size: 12px;">
          This link expires in 24 hours.
        </p>
      </div>
    `,
  });

  console.log('Verification email sent:', info.messageId);
}