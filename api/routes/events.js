import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  getEventsByDate,
  getEventsByName,
  updateEvent,
} from "../controllers/eventsController.js";
const router = express.Router();

router.get("/", getEvents);
router.get("/name/:name", getEventsByName);
router.get("/order/:order", getEventsByDate);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
