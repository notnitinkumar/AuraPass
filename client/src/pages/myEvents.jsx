import { useEffect, useState } from "react";
import api from "../services/api";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/events/my-events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(response.data.events);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) {
    return <h2>Loading events...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>My Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Venue: {event.venue}</p>
            <p>Date: {event.event_date}</p>
            <p>Price: ₹{event.price}</p>
            <p>Total Tickets: {event.total_tickets}</p>
            <p>Available Tickets: {event.available_tickets}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MyEvents;
