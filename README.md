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

### Advanced Ticketing System
- Book tickets for events
- QR code-based digital tickets
- Unique ticket generation for each ticket booking
- View booking history
- Cancel bookings
- Automatic ticket inventory restoration

### Search & Filtering
- Search events by title
- Filter events by category

### User Experience
- Light / Night theme support
- Animated page transitions
- Modern glassmorphism-inspired UI
- Interactive booking workflow

### Real-Time Updates
- Real-time ticket availability using Socket.IO
- Instant inventory synchronization across connected clients

### Organizer Dashboard
- Create and manage events
- Edit and delete events
- Monitor bookings for created events
- Manage ticket inventory

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

- Built a full-stack event ticketing platform with role-based access control.
- Implemented QR-code based digital ticket generation for booked events.
- Developed real-time ticket inventory synchronization using Socket.IO.
- Designed organizer dashboards for event creation and management.
- Integrated image upload functionality using Multer.
- Built a responsive modern UI with theme switching and mobile support.
- Implemented complete booking, cancellation, and inventory restoration workflows.

## Architecture

Frontend (React + Vite)
        ↓
REST API (Express.js)
        ↓
MySQL Database
        ↓
Socket.IO Real-Time Layer

## Links

- Live Application: https://aurapass-delta.vercel.app/
- Backend API: https://aurapass-api.onrender.com
- Source Code: https://github.com/notnitinkumar/AuraPass

## Author

Nitin Kumar
