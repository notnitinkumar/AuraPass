import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";
import AnimatedPage from '../components/animatedPage';

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    venue: "",
    price: "",
    total_tickets: "",
    category: "TECH",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);

        const event = response.data.event || response.data;

        setFormData({
          title: event.title || "",
          description: event.description || "",
          event_date: event.event_date ? event.event_date.split("T")[0] : "",
          venue: event.venue || "",
          price: event.price || "",
          total_tickets: event.total_tickets || "",
          category: (event.category || "TECH").toUpperCase(),
        });
      } catch (error) {
        alert("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const eventData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        eventData.append(key, value);
      });

      if (image) {
        eventData.append("image", image);
      }

      await api.put(`/events/${id}`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Event updated successfully");
      navigate("/my-events");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update event");
    }
  };

  if (loading) {
    return (
      <AnimatedPage>
        <h2>Loading event...</h2>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="auth-container">
      <div className="auth-card">
        <h1>Edit Event</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            className="auth-input"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            className="auth-input"
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            required
          />

          <input
            className="auth-input"
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />

          <select
            className="auth-input"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="TECH">Tech</option>
            <option value="WORKSHOP">Workshop</option>
            <option value="CULTURAL">Cultural</option>
            <option value="SPORTS">Sports</option>
            <option value="MUSIC">Music</option>
            <option value="SEMINAR">Seminar</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            className="auth-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <input
            className="auth-input"
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            className="auth-input"
            type="number"
            name="total_tickets"
            placeholder="Total Tickets"
            value={formData.total_tickets}
            onChange={handleChange}
            required
          />

          <button className="auth-button" type="submit">
            Update Event
          </button>
        </form>
        </div>
        </div>
    </AnimatedPage>
  );
}

export default EditEvent;
