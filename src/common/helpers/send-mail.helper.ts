import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export interface SendMailParams {
  to: string | string[];
  subject: string;
  html: string;
  tags?: string[];
  from?: string;
}

export async function sendMailHelper(params: SendMailParams) {
  let transporter: Transporter | undefined;
  let testAccount: nodemailer.TestAccount | undefined;

  try {
    const { to, subject, html, tags, from } = params;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // STARTTLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Fallback to Ethereal test account for development when credentials are missing
      testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.warn(
        'EMAIL_USER/EMAIL_PASS not set — using Ethereal test account for outgoing mail (development only)',
      );
    }

    if (!transporter) throw new Error('No mail transporter available');

    const mailOptions: nodemailer.SendMailOptions = {
      from: from || `socialApp <${process.env.EMAIL_USER || testAccount?.user}>`,
      to,
      subject,
      html,
    };

    if (tags && tags.length) {
      mailOptions.headers = {
        ...(mailOptions.headers || {}),
        'X-Tags': tags.join(','),
      };
    }

    const info = await transporter.sendMail(mailOptions);

    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) {
      console.log('Preview email URL:', preview);
    }

    return { info, preview };
  } catch (err) {
    console.error('sendMail error:', err);
    throw err;
  }
}