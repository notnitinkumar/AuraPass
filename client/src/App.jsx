import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Events from './pages/events';
import EventDetails from './pages/eventDetails';
import MyBookings from './pages/myBookings';
import MyEvents from './pages/myEvents';
import CreateEvent from './pages/createEvent';
import Navbar from './components/navbar';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/:id' element={<EventDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;