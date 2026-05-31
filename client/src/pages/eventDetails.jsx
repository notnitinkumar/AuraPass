

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data.event);
      } catch (err) {
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');

      await api.post(
        '/bookings',
        {
          event_id: event.id,
          quantity: Number(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Booking created successfully');
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Booking failed'
      );
    }
  };

  if (loading) {
    return <h2>Loading event...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>{event.title}</h1>

      <p>{event.description}</p>
      <p>Venue: {event.venue}</p>
      <p>Date: {event.event_date}</p>
      <p>Price: ₹{event.price}</p>
      <p>Available Tickets: {event.available_tickets}</p>

      <hr />

      <h3>Book Tickets</h3>

      <input
        type='number'
        min='1'
        max={event.available_tickets}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
}

export default EventDetails;