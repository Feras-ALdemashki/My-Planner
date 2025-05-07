import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
const secretKey = process.env.SECRET_TOKEN;

export const getEvents = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized");

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    const [rows] = await db.query(
      `
      SELECT 
        e.id AS event_id,
        e.name AS event_name,
        e.description AS event_description,
        e.location AS event_location,
        e.date AS event_date,
        e.time AS event_time,
        e.created_at AS event_created_at,
        JSON_ARRAYAGG(
          JSON_OBJECT('note_id', n.id, 'content', n.content)
        ) AS notes
      FROM events e
      LEFT JOIN notes n ON e.id = n.event_id
      WHERE e.user_id = ?
      GROUP BY e.id
      ORDER BY e.date ASC, e.time ASC;
      `,
      [userId]
    );

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error in getUserEventsWithNotes:", err);
    res.status(500).json("Server error");
  }
};
export const createEvent = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Unauthorized");

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    const { name, description, location, date, time, notes } = req.body;
    if (!name || !description || !location || !date || !time) {
      return res
        .status(400)
        .json(
          "Missing required fields. Please ensure all event details (name, description, location, date, and time) are provided."
        );
    }

    const eventId = uuidv4();

    // Insert event
    await db.query(
      `INSERT INTO events (id, user_id, name, description, location, date, time)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [eventId, userId, name, description, location, date, time]
    );

    // Insert notes if provided
    if (Array.isArray(notes) && notes.length > 0) {
      const noteInserts = notes.map((note) => [uuidv4(), eventId, note.trim()]);
      await db.query(`INSERT INTO notes (id, event_id, content) VALUES ?`, [
        noteInserts,
      ]);
    }

    res.status(201).json("Event and notes created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};
export const getEventsByName = (req, res) => {};
export const getEventsByDate = (req, res) => {};

export const updateEvent = async (req, res) => {};
export const deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const [result] = await db.query("DELETE FROM events WHERE id = ?", [
      eventId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json({ message: "Event deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
