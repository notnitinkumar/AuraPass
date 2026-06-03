import express from "express";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getTicketsByBooking,
} from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/my-bookings', verifyToken, getMyBookings);

router.post("/", verifyToken, createBooking);

router.put('/:id/cancel', verifyToken, cancelBooking);

router.get('/tickets/booking/:bookingId', verifyToken, getTicketsByBooking);

export default router;
