import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "YOR LOGIN OTP",
    html: `
      <h2>Your OTP Code</h2>
      <p>Your OTP is <b>${otp}</b></p>
      <p>This OTP will expire in 5 minutes.</p>
    `,
  });
};
