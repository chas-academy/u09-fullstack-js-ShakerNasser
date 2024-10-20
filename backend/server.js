const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const path = require('path'); // Importera path-modulen

// Konfigurera miljövariabler
dotenv.config();

// Anslut till databasen
connectDB();

// Skapa Express-applikationen
const app = express();

// Middleware för CORS
app.use(
    cors({
        origin: "https://67157f007e39fd0008f87cdc--readlog.netlify.app",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);
app.options('*', cors()); // Tillåt CORS för alla OPTIONS-begärningar

// Middleware för att tolka JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware för att servera statiska filer (bilder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Definiera rutter
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
