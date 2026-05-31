import { Link, useNavigate } from "react-router-dom";
import '../styles/navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    navigate("/events");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>AuraPass</h2>
        {token && <small>Welcome, {name}</small>}
      </div>

      <div className="navbar-links">
        <Link to="/events">Events</Link>

        {token ? (
          <>
            <Link to="/my-bookings">My Bookings</Link>

            {(role === 'ADMIN' || role === 'ORGANIZER') && (
              <>
                <Link to="/my-events">My Events</Link>
                <Link to="/create-event">Create Event</Link>
              </>
            )}

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
