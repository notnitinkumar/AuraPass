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
