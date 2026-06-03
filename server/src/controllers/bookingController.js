import db from "../db/db.js";
import { getIo } from "../socket.js";

export const createBooking = async (req, res) => {
  try {
    const { event_id, quantity } = req.body;
    const user_id = req.user.userId;

    if (!event_id || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid event_id and quantity are required",
      });
    }

    const [events] = await db.query("SELECT * FROM events WHERE id = ?", [
      event_id,
    ]);

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const event = events[0];

    if (event.available_tickets < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough tickets available",
      });
    }

    const total_amount = Number(event.price) * Number(quantity);

    const [bookingResult] = await db.query(
      `INSERT INTO bookings
      (user_id, event_id, quantity, total_amount, status)
      VALUES (?, ?, ?, ?, ?)`,
      [user_id, event_id, quantity, total_amount, "CONFIRMED"],
    );

    await db.query(
      `UPDATE events
       SET available_tickets = available_tickets - ?
       WHERE id = ?`,
      [quantity, event_id],
    );
    const updatedAvailableTickets =
      event.available_tickets - quantity;

    // console.log("Reached emit code");
    getIo().emit("ticketsUpdated", {
      eventId: event_id,
      availableTickets: updatedAvailableTickets,
    });

    for (let i = 1; i <= quantity; i++) {
      const ticketCode = `AURA-${bookingResult.insertId}-${Date.now()}-${i}`;

      await db.query(
        `INSERT INTO tickets
        (booking_id, ticket_code, is_used)
        VALUES (?, ?, ?)`,
        [bookingResult.insertId, ticketCode, false],
      );
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      bookingId: bookingResult.insertId,
      total_amount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const user_id = req.user.userId;

    const [bookings] = await db.query(
      `SELECT
          b.id,
          b.quantity,
          b.total_amount,
          b.status,
          b.booking_date,
          e.title AS event_title,
          e.event_date,
          e.venue
       FROM bookings b
       JOIN events e ON b.event_id = e.id
       WHERE b.user_id = ?
       ORDER BY b.booking_date DESC`,
      [user_id],
    );

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const user_id = req.user.userId;

    const [bookings] = await db.query(
      `SELECT * FROM bookings WHERE id = ? AND user_id = ?`,
      [bookingId, user_id],
    );

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    const booking = bookings[0];

    if (booking.status === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        message: 'Booking already cancelled',
      });
    }

    await db.query(
      `UPDATE bookings
       SET status = 'CANCELLED'
       WHERE id = ?`,
      [bookingId],
    );

    await db.query(
      `UPDATE events
       SET available_tickets = available_tickets + ?
       WHERE id = ?`,
      [booking.quantity, booking.event_id],
    );

    const [events] = await db.query(
      `SELECT available_tickets FROM events WHERE id = ?`,
      [booking.event_id],
    );

    getIo().emit('ticketsUpdated', {
      eventId: booking.event_id,
      availableTickets: events[0].available_tickets,
    });

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getTicketsByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const user_id = req.user.userId;

    const [bookings] = await db.query(
      `SELECT * FROM bookings
       WHERE id = ? AND user_id = ?`,
      [bookingId, user_id],
    );

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    const [tickets] = await db.query(
      `SELECT id, ticket_code, is_used
       FROM tickets
       WHERE booking_id = ?`,
      [bookingId],
    );

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
