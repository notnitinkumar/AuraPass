import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Sun, MoonStar } from 'lucide-react';
import '../styles/navbar.css';
import { useTheme } from '../context/theme';

function Navbar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
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
    <>
      <button
        className="floating-theme-toggle"
        onClick={() => setTheme(theme === 'night' ? 'light' : 'night')}
        title={theme === 'night' ? 'Switch to Light Mode' : 'Switch to Night Mode'}
      >
        {theme === 'night' ? (
          <Sun size={24} strokeWidth={2.2} />
        ) : (
          <MoonStar size={24} strokeWidth={2.2} />
        )}
      </button>
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>AuraPass</h2>
          {token && <small>Welcome, {name}</small>}
        </div>
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className={`navbar-links ${menuOpen ? 'mobile-open' : ''}`}>
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
    </>
  );
}

export default Navbar;
