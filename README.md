# Simple MERN Todo App

A simple Todo application built with the MERN stack (without MongoDB - using in-memory storage).

## Project Structure

```
Tryfeb2/
├── backend/          # Express server with in-memory storage
│   ├── server.js    # Main backend file with REST API
│   └── package.json
└── frontend/         # React app built with Vite
    ├── src/
    │   ├── App.jsx  # Main application component
    │   ├── index.css # Styles
    │   └── main.jsx
    └── package.json
```

## Features

- ✨ Modern, gradient-based UI design
- ✅ Add new todos
- ✏️ Mark todos as complete/incomplete
- 🗑️ Delete todos
- 💾 In-memory storage (no database required)
- 🎨 Smooth animations and transitions
- 📱 Responsive design

## Setup & Run

### Backend

```bash
cd backend
npm install
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a single todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js, Express
- **Storage**: In-memory (array-based)
- **Styling**: Custom CSS with gradients and animations

## Note

Since this app uses in-memory storage, all todos will be reset when the server restarts.