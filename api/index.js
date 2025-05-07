import express from "express";
import cors from "cors";
import eventsRoutes from "./routes/events.js";
import userRoutes from "./routes/users.js";
import notesRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
const PORT = process.env.PORT || 8000;

const app = express();
app.use(
  cors({
    origin: process.env.CORS_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/events", eventsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/contact", contactRoutes);
app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
