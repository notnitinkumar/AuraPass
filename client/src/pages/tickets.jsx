import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import api from "../services/api";
import "../styles/tickets.css";

function Tickets() {
  const { bookingId } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTickets();
  }, [bookingId]);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/bookings/tickets/booking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTickets(response.data.tickets || []);
    } catch (err) {
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-message">Loading tickets...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="tickets-container">
      <h1 className="tickets-title">My Tickets</h1>

      <div className="tickets-grid">
        {tickets.map((ticket) => (
          <div className="ticket-card" key={ticket.id}>
            <h3>Ticket #{ticket.id}</h3>

            <QRCodeCanvas
              value={ticket.ticket_code}
              size={220}
            />

            <p className="ticket-code">{ticket.ticket_code}</p>

            <span
              className={`ticket-status ${ticket.is_used ? "used" : "active"}`}
            >
              {ticket.is_used ? "Used" : "Active"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tickets;