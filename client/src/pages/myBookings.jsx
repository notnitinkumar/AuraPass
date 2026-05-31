import { useEffect, useState } from "react";
import api from "../services/api";

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
    return <h2>Loading bookings...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id}>
            <h2>{booking.event_title}</h2>
            <p>Venue: {booking.venue}</p>
            <p>Event Date: {booking.event_date}</p>
            <p>Quantity: {booking.quantity}</p>
            <p>Total Amount: ₹{booking.total_amount}</p>
            <p>Status: {booking.status}</p>
            <p>Booking Date: {booking.booking_date}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
