import nodemailer from 'nodemailer';
import config from '../config';

// Create a test account or replace with real credentials.
export const mail_sender = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV == 'production',
    auth: {
      user: 'sheikhchamon9@gmail.com',
      pass: 'lejx ysso qjhs tzjy',
    },
  });

  await transporter.sendMail({
    from: 'sheikhchamon9@gmail.com',
    to,
    subject: 'Reset Password within 10 minutes',
    text: 'this link will be valid for 10 minutes', // plain‑text body
    html, // HTML body
  });
};
