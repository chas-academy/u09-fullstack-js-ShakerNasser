const express = require('express');
const { createBook, getBooks, getBookById, getBooksByGenre} = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createBook);  // Endast inloggade användare kan skapa böcker
router.get('/', getBooks);              // Alla kan se böcker
router.get('/:id', getBookById);         // Route för att hämta en bok med ID
router.get('/genre/:genre', getBooksByGenre); // Hämta böcker baserat på genre

module.exports = router;
