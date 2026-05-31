import { Link, useNavigate } from "react-router-dom";

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
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ddd",
        marginBottom: "2rem",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>AuraPass</h2>
        {token && <small>Welcome, {name}</small>}
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
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
