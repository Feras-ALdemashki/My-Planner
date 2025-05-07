import { db } from "../db.js";

import { v4 as uuidv4 } from "uuid";

export const contact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json(
        "Missing required fields. Please ensure all event details (name, email and message) are provided."
      );
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json("Please enter a valid email address");
  try {
    const id = uuidv4();

    await db.query(
      `INSERT INTO contacts (id, name, email, message) VALUES (?, ?, ?, ?)`,
      [id, name, email, message]
    );

    res.status(201).json({ message: "Contact message received successfully." });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Server error while saving contact." });
  }
};
