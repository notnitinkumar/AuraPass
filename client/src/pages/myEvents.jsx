import { useEffect, useState } from "react";
import api from "../services/api";
import '../styles/myEvents.css';

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
    return <h2 className='loading-events'>Loading events...</h2>;
  }

  if (error) {
    return <h2 className='error-events'>{error}</h2>;
  }

  return (
    <div className='my-events-container'>
      <h1 className='my-events-title'>My Events</h1>

      {events.length === 0 ? (
        <p className='no-events-message'>No events found.</p>
      ) : (
        <div className='events-grid'>
          {events.map((event) => (
            <div key={event.id} className='my-event-card'>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Date:</strong> {event.event_date}</p>
              <p><strong>Price:</strong> ₹{event.price}</p>
              <p><strong>Total Tickets:</strong> {event.total_tickets}</p>
              <p><strong>Available Tickets:</strong> {event.available_tickets}</p>

              <span className='event-stat'>
                {event.available_tickets} Tickets Available
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEvents;
