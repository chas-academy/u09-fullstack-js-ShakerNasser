const express = require('express');
const { createBook, getBooks, getBookById} = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createBook);  // Endast inloggade användare kan skapa böcker
router.get('/', getBooks);              // Alla kan se böcker
router.get('/:id', getBookById);         // Route för att hämta en bok med ID


module.exports = router;
