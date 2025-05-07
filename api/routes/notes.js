import express from "express";
import {
  createNote,
  deleteNote,
  editNote,
  getNotes,
} from "../controllers/notesController.js";
const router = express.Router();

router.get("/event/:eventId", getNotes);
router.post("/event/:eventId", createNote);
router.put("/:id", editNote);
router.delete("/:id", deleteNote);
export default router;
