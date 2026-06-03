import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/events";
import EventDetails from "./pages/eventDetails";
import MyBookings from "./pages/myBookings";
import MyEvents from "./pages/myEvents";
import CreateEvent from "./pages/createEvent";
import EditEvent from "./pages/editEvent";
import Tickets from "./pages/tickets";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./components/protectedRoute";
import OrganizerRoute from "./components/organizerRoute";
import { ThemeProvider } from './context/theme';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-events"
            element={
              <OrganizerRoute>
                <MyEvents />
              </OrganizerRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <OrganizerRoute>
                <CreateEvent />
              </OrganizerRoute>
            }
          />
          <Route
            path="/events/edit/:id"
            element={
              <OrganizerRoute>
                <EditEvent />
              </OrganizerRoute>
            }
          />
          <Route
            path="/tickets/:bookingId"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
