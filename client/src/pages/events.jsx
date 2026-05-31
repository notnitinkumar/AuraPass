import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data.events);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <h2>Loading events...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Events</h1>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Venue: {event.venue}</p>
            <p>Date: {event.event_date}</p>
            <p>Price: ₹{event.price}</p>
            <p>Available Tickets: {event.available_tickets}</p>
            <Link to={`/events/${event.id}`}>
              View Details
            </Link>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Events;