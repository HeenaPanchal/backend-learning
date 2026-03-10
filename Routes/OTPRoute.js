import { Router } from "express";
import { pool } from "../index.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Utils/SendEmail.js";
export const otpRoute = Router();

otpRoute.post("/generate-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Please enter email." });
  }
  const OTP = Math.floor(100000 + Math.random() * 1000000);
  try {
    const { rowCount } = await pool.query(
      `SELECT email from users WHERE email=$1`,
      [email],
    );
    if (rowCount === 0) {
      throw new Error("Email does not exist");
    }

    await pool.query(
      `INSERT INTO otp (
            email,
            otp,
            expiry_date
            ) VALUES ($1,$2,NOW() + INTERVAL '5 minutes') `,
      [email, OTP],
    );
    res.status(200).json({ message: `OTP sent on email : ${email}` });
    await sendEmail(email, OTP);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

otpRoute.post("/login", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const { rowCount: count, rows: userRows } = await pool.query(
      `SELECT uuid , email FROM users WHERE email=$1`,
      [email],
    );
    if (count === 0) {
      throw new Error("Email is not registered");
    }
    const { rowCount, rows } = await pool.query(
      `SELECT email , otp FROM otp WHERE email=$1`,
      [email],
    );
    if (rowCount === 0) {
      throw new Error("OTP not generated on this email");
    }

    await pool.query(`DELETE FROM otp WHERE email=$1 AND otp=$2`, [email, otp]);

    const token = jwt.sign({ id: userRows[0].uuid }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    throw error;
  }
});
