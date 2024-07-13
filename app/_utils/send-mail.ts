import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_ID,
    pass: process.env.SMTP_PW,
  },
});

export const getMailContent = ({ subject, html, to }: MailContent) => {
  return {
    from: process.env.SMTP_ID,
    to,
    subject,
    html,
  };
};

export type MailContent = {
  to: string;
  subject: string;
  html: string;
};