# Frolic 🎉

Frolic is a full-stack college/institute event management platform built using the MERN stack (MongoDB, Express, React, Node.js). It streamlines event organization, participant registration, group management, and winner announcements.

## Features

- **Authentication & Authorization**: Secure user login and registration with JWT.
- **Institute & Department Management**: Organize and structure college/institute hierarchies.
- **Event Management**: Create, view, update, and manage campus events and competitions.
- **Group & Participant Tracking**: Organize teams, group entries, and individual participants.
- **Winner Announcements**: Track and display event winners.
- **Interactive Dashboard**: Overview of ongoing activities, institutes, and events.

## Tech Stack

- **Frontend**: React, React Router, Axios, CSS / Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcryptjs

## Project Structure

```
Frolic/
├── Backend/              # Express API server & MongoDB models
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth and validation middleware
│   ├── models/           # Mongoose schemas (User, Event, Institute, etc.)
│   ├── routes/           # Express API endpoints
│   ├── server.js         # Entry point for backend
│   └── .env.example      # Example environment variables
├── Frontend/             # React single-page application
│   ├── public/
│   └── src/
│       ├── api/          # Axios API client
│       ├── components/   # Reusable UI components (Layout, Navbar, etc.)
│       └── pages/        # Views (Dashboard, Events, Login, Register, etc.)
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB running locally or a MongoDB Atlas connection URI

### 1. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory based on `.env.example`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/Frolic-DB
JWT_SECRET=your_secret_key_here
```

Start the backend server:
```bash
npm run dev
# or
node server.js
```

### 2. Frontend Setup

```bash
cd Frontend
npm install
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and connect to the backend API at [http://localhost:5000](http://localhost:5000).

## License

This project is licensed under the ISC License.
