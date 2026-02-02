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

## Features

- ✨ Modern, gradient-based UI design

cd frontend
npm install
npm run dev

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js, Express
- **Storage**: In-memory (array-based)
- **Styling**: Custom CSS with gradients and animations

## Note

Since this app uses in-memory storage, all todos will be reset when the server restarts.