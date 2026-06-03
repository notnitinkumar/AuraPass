import { useEffect, useState } from 'react';
import api from '../services/api';
import socket from '../socket';
import { Link } from 'react-router-dom';
import '../styles/events.css';
import AnimatedPage from '../components/animatedPage';
import { motion } from 'framer-motion';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    socket.on('ticketsUpdated', (data) => {
      console.log('Received socket update:', data);

      setEvents((prev) =>
        prev.map((event) =>
          Number(event.id) === Number(data.eventId)
            ? {
                ...event,
                available_tickets: data.availableTickets,
              }
            : event
        )
      );
    });

    return () => {
      socket.off('ticketsUpdated');
    };
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === 'ALL' ||
      event.category.toUpperCase() === selectedCategory;

    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <AnimatedPage>
        <h2>Loading events...</h2>
      </AnimatedPage>
    );
  }

  if (error) {
    return (
      <AnimatedPage>
        <h2>{error}</h2>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className='events-container'>
        <motion.section
          className='hero-section'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className='hero-title'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover Amazing Events
          </motion.h1>

          <motion.p
            className='hero-subtitle'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Find festivals, workshops, hackathons, conferences and more.
          </motion.p>
        </motion.section>

        <h1 className='events-title'>Upcoming Events</h1>
        <motion.input
          type='text'
          className='event-search'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          placeholder='Search events by title...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className='category-filters'>
          {[
            'ALL',
            'TECH',
            'WORKSHOP',
            'CULTURAL',
            'SPORTS',
            'MUSIC',
            'SEMINAR',
            'OTHER',
          ].map((category) => (
            <button
              key={category}
              type='button'
              className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <p className='no-events'>No matching events found.</p>
        ) : (
          <div className='events-grid'>
            {filteredEvents.map((event) => (
              <div key={event.id} className='event-card'>
                <img
                  src={
                    event.image_url
                      ? `${import.meta.env.VITE_API_URL}${event.image_url}`
                      : `https://picsum.photos/seed/${event.id}/600/400`
                  }
                  alt={event.title}
                  className='event-image'
                />

                <span className='event-category'>
                  {event.category}
                </span>

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
    </AnimatedPage>
  );
}

export default Events;
