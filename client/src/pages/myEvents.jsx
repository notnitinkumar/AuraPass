import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import '../styles/myEvents.css';
import AnimatedPage from '../components/animatedPage';

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/events/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this event?'
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');

      await api.delete(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err) {
      alert('Failed to delete event');
    }
  };

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
    return (
      <AnimatedPage>
        <h2 className='loading-events'>Loading events...</h2>
      </AnimatedPage>
    );
  }

  if (error) {
    return (
      <AnimatedPage>
        <h2 className='error-events'>{error}</h2>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
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
                <div className='event-actions'>
                  <button
                    className='edit-event-btn'
                    onClick={() => handleEdit(event.id)}
                  >
                    Edit
                  </button>

                  <button
                    className='delete-event-btn'
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}

export default MyEvents;
