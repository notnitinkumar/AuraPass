import { useEffect, useState } from "react";
import api from "../services/api";
import '../styles/myBookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data.bookings);
      } catch (err) {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <h2 className='loading-bookings'>Loading bookings...</h2>;
  }

  if (error) {
    return <h2 className='error-bookings'>{error}</h2>;
  }

  return (
    <div className='my-bookings-container'>
      <h1 className='my-bookings-title'>My Bookings</h1>

      {bookings.length === 0 ? (
        <p className='no-bookings'>No bookings found.</p>
      ) : (
        <div className='bookings-grid'>
          {bookings.map((booking) => (
            <div key={booking.id} className='booking-card'>
              <h2>{booking.event_title}</h2>
              <p><strong>Venue:</strong> {booking.venue}</p>
              <p><strong>Event Date:</strong> {booking.event_date}</p>
              <p><strong>Quantity:</strong> {booking.quantity}</p>
              <p><strong>Total Amount:</strong> ₹{booking.total_amount}</p>
              <p><strong>Booking Date:</strong> {booking.booking_date}</p>

              <span className='booking-status'>
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
