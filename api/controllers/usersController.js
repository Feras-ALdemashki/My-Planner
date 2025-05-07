import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_TOKEN;
export const getUser = (req, res) => {};
export const updateUser = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized");

  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json("First name, last name, email, and password are required.");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    const hashedPassword = bcrypt.hashSync(password, 10);
    await db.query(
      `UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?`,
      [firstName, lastName, email, hashedPassword, userId]
    );

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while updating user" });
  }
};
