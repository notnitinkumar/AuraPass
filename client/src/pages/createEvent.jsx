import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import '../styles/auth.css';

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    venue: "",
    price: "",
    total_tickets: "",
    category: "TECH",
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
    <div className='auth-container'>
      <div className='auth-card'>
        <h1>Create Event</h1>

        <form
          className='auth-form'
          onSubmit={handleSubmit}
        >
          <input
            className='auth-input'
            type='text'
            name='title'
            placeholder='Title'
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            className='auth-input'
            name='description'
            placeholder='Description'
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            className='auth-input'
            type='date'
            name='event_date'
            value={formData.event_date}
            onChange={handleChange}
            required
          />

          <input
            className='auth-input'
            type='text'
            name='venue'
            placeholder='Venue'
            value={formData.venue}
            onChange={handleChange}
            required
          />
          <select
            className='auth-input'
            name='category'
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value='TECH'>Tech</option>
            <option value='WORKSHOP'>Workshop</option>
            <option value='CULTURAL'>Cultural</option>
            <option value='SPORTS'>Sports</option>
            <option value='MUSIC'>Music</option>
            <option value='SEMINAR'>Seminar</option>
            <option value='OTHER'>Other</option>
          </select>

          <input
            className='auth-input'
            type='number'
            name='price'
            placeholder='Price'
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            className='auth-input'
            type='number'
            name='total_tickets'
            placeholder='Total Tickets'
            value={formData.total_tickets}
            onChange={handleChange}
            required
          />

          <button
            className='auth-button'
            type='submit'
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
