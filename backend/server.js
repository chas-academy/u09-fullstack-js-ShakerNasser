const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

// Konfigurera miljövariabler
dotenv.config();

// Anslut till databasen
connectDB();

// Skapa Express-applikationen
const app = express(); // Flytta denna rad upp hit

// Middleware för CORS
app.use(
    cors({
      origin: "http://localhost:5173", 
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
);

// Middleware för att tolka JSON
app.use(express.json());

// Definiera rutter
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
