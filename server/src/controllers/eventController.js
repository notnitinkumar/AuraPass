import db from "../db/db.js";

export const getAllEvents = async (req, res) => {
  try {
    const [events] = await db.query(
      "SELECT * FROM events ORDER BY event_date ASC",
    );

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const [events] = await db.query("SELECT * FROM events WHERE id = ?", [id]);

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event: events[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, event_date, venue, price, total_tickets } =
      req.body;

    const organizer_id = req.user.userId;

    const [result] = await db.query(
      `INSERT INTO events
      (title, description, event_date, venue, price, total_tickets, available_tickets, organizer_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        event_date,
        venue,
        price,
        total_tickets,
        total_tickets,
        organizer_id,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      eventId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date, venue, price, total_tickets } = req.body;

    const [events] = await db.query(
      'SELECT * FROM events WHERE id = ?',
      [id]
    );

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const event = events[0];

    if (
      req.user.role !== 'ADMIN' &&
      event.organizer_id !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to update this event'
      });
    }

    const availableTickets =
      event.available_tickets + (total_tickets - event.total_tickets);

    await db.query(
      `UPDATE events
       SET title = ?,
           description = ?,
           event_date = ?,
           venue = ?,
           price = ?,
           total_tickets = ?,
           available_tickets = ?
       WHERE id = ?`,
      [
        title,
        description,
        event_date,
        venue,
        price,
        total_tickets,
        availableTickets,
        id
      ]
    );

    res.status(200).json({
      success: true,
      message: 'Event updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const [events] = await db.query(
      'SELECT * FROM events WHERE id = ?',
      [id]
    );

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const event = events[0];

    if (
      req.user.role !== 'ADMIN' &&
      event.organizer_id !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to delete this event'
      });
    }

    await db.query(
      'DELETE FROM events WHERE id = ?',
      [id]
    );

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const organizer_id = req.user.userId;

    const [events] = await db.query(
      `SELECT *
       FROM events
       WHERE organizer_id = ?
       ORDER BY event_date ASC`,
      [organizer_id]
    );

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
