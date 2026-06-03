import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import socket from '../socket';
import '../styles/eventDetails.css';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    socket.on('ticketsUpdated', (data) => {
      if (Number(data.eventId) === Number(id)) {
        setEvent((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            available_tickets: data.availableTickets,
          };
        });
      }
    });

    return () => {
      socket.off('ticketsUpdated');
    };
  }, [id]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

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
      setQuantity(1);
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Booking failed'
      );
    }
  };

  if (loading) {
    return <h2 className='loading-text'>Loading event...</h2>;
  }

  if (error) {
    return <h2 className='error-text'>{error}</h2>;
  }

  return (
    <div className='event-details-container'>
      <div className='event-details-card'>
        <h1>{event.title}</h1>

        <p>{event.description}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Date:</strong> {event.event_date}</p>
        <p><strong>Price:</strong> ₹{event.price}</p>
        <p><strong>Available Tickets:</strong> {event.available_tickets}</p>

        <div className='booking-section'>
          <h3>Book Tickets</h3>

          <input
            className='booking-input'
            type='number'
            min='1'
            max={event.available_tickets}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button
            className='book-button'
            onClick={handleBooking}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;