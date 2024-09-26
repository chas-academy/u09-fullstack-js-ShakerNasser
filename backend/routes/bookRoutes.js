const express = require('express');
const { createBook, getBooks, getBookById, getBooksByGenre, getSearch} = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createBook);  // Endast inloggade användare kan skapa böcker
router.get('/', getBooks);              // Alla kan se böcker
router.get('/search', getSearch); // Denna ska vara först för att fånga sökningen
router.get('/:id', getBookById); // Denna ska komma efter getSearch
router.get('/genre/:genre', getBooksByGenre); // Hämta böcker baserat på genre

module.exports = router;
