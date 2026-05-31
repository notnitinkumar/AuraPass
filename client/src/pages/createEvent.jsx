import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    venue: "",
    price: "",
    total_tickets: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/events",
        {
          ...formData,
          price: Number(formData.price),
          total_tickets: Number(formData.total_tickets),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Event created successfully");
      navigate("/my-events");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div>
      <h1>Create Event</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={formData.venue}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="number"
          name="total_tickets"
          placeholder="Total Tickets"
          value={formData.total_tickets}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
