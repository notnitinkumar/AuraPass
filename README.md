# AuraPass 

AuraPass is a full-stack event ticket booking platform built using React, Express.js, MySQL, and Socket.IO. The platform allows users to discover events, book tickets, and manage bookings, while organizers can create and manage their own events.

## Key Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (User / Organizer / Admin)

### Event Management
- Create, edit, and delete events
- Event image uploads using Multer
- Event categorization
- Automatic hiding of past events

### Ticket Booking System
- Book tickets for events
- View booking history
- Cancel bookings
- Automatic ticket inventory restoration

### Search & Filtering
- Search events by title
- Filter events by category

### Real-Time Updates
- Real-time ticket availability using Socket.IO
- Instant inventory synchronization across connected clients

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- JWT
- Socket.IO
- Multer

### Database
- MySQL

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Railway MySQL

## Project Highlights

- Implemented real-time ticket inventory updates using WebSockets.
- Designed a complete booking and cancellation workflow.
- Built role-based access control for users, organizers, and admins.
- Integrated image upload functionality for event management.
- Developed responsive user and organizer dashboards.

## Links

- Live Application: https://aurapass-delta.vercel.app/
- Backend API: https://aurapass-api.onrender.com
- Source Code: https://github.com/notnitinkumar/AuraPass

## Author

Nitin Kumar
