import express from "express";
import { getUser, updateUser } from "../controllers/usersController.js";
const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
export default router;
