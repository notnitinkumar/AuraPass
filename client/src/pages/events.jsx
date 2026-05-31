import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/events.css';

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
    <div className='events-container'>
      <h1 className='events-title'>Upcoming Events</h1>

      {events.length === 0 ? (
        <p className='no-events'>No events available.</p>
      ) : (
        <div className='events-grid'>
          {events.map((event) => (
            <div key={event.id} className='event-card'>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Date:</strong> {event.event_date}</p>
              <p><strong>Price:</strong> ₹{event.price}</p>
              <p><strong>Available:</strong> {event.available_tickets}</p>

              <Link
                to={`/events/${event.id}`}
                className='event-link'
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;