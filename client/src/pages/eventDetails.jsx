import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import socket from '../socket';
import '../styles/eventDetails.css';
import AnimatedPage from '../components/animatedPage';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

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
      setBookingLoading(true);
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
      setShowBookingModal(false);
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Booking failed'
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <AnimatedPage>
        <h2 className='loading-text'>Loading event...</h2>
      </AnimatedPage>
    );
  }

  if (error) {
    return (
      <AnimatedPage>
        <h2 className='error-text'>{error}</h2>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
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
              onClick={() => setShowBookingModal(true)}
            >
              Book Now
            </button>
          </div>
          {showBookingModal && (
            <div className='booking-modal-overlay'>
              <div className='booking-modal'>
                <h2>Confirm Booking</h2>

                <p><strong>Event:</strong> {event.title}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Date:</strong> {event.event_date}</p>
                <p><strong>Price per Ticket:</strong> ₹{event.price}</p>
                <p><strong>Tickets:</strong> {quantity}</p>
                <p><strong>Total:</strong> ₹{Number(event.price) * Number(quantity)}</p>

                <div className='booking-actions'>
                  <button
                    className='book-button'
                    onClick={() => setShowBookingModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className='book-button'
                    onClick={handleBooking}
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default EventDetails;