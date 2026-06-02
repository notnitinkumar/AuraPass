import express from "express";
import {
  getAllEvents,
  getEventById,
  getMyEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isOrganizerOrAdmin } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/my-events", verifyToken, isOrganizerOrAdmin, getMyEvents);
router.get("/:id", getEventById);
router.post(
  "/",
  verifyToken,
  isOrganizerOrAdmin,
  upload.single("image"),
  createEvent
);
router.put(
  "/:id",
  verifyToken,
  isOrganizerOrAdmin,
  upload.single("image"),
  updateEvent
);
router.delete("/:id", verifyToken, isOrganizerOrAdmin, deleteEvent);

export default router;
