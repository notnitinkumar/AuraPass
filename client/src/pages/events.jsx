import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

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
      <section className='hero-section'>
        <h1 className='hero-title'>
          Discover Amazing Events
        </h1>

        <p className='hero-subtitle'>
          Find festivals, workshops, hackathons, conferences and more.
        </p>
      </section>

      <h1 className='events-title'>Upcoming Events</h1>

      {events.length === 0 ? (
        <p className='no-events'>No events available.</p>
      ) : (
        <div className='events-grid'>
          {events.map((event) => (
            <div key={event.id} className='event-card'>
              <img
                src={`https://picsum.photos/seed/${event.id}/600/400`}
                alt={event.title}
                className='event-image'
              />
              <h2>{event.title}</h2>

              <p>{event.description}</p>

              <p>📍 {event.venue}</p>
              <p>📅 {formatDate(event.event_date)}</p>
              <p>🎟 ₹{event.price}</p>
              <p>{event.available_tickets} tickets available</p>

              <Link
                to={`/events/${event.id}`}
                className='event-link'
              >
                View Event →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;