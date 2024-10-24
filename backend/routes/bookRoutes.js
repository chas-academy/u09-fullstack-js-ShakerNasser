const express = require('express');
const { createBook, getBooks, getBookById, getBooksByGenre, getSearch , deleteBook} = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
const upload = require('../middlewares/uploadConfig'); // Adjust the path as needed

router.post('/', upload.single('image'), protect, createBook);  // Endast inloggade användare kan skapa böcker

router.post('/', upload.single('image'), createBook);  // Endast inloggade användare kan skapa böcker
router.get('/', getBooks);              // Alla kan se böcker
router.get('/search', getSearch); // Denna ska vara först för att fånga sökningen
router.get('/:id', getBookById); // Denna ska komma efter getSearch
router.get('/genre/:genre', getBooksByGenre); // Hämta böcker baserat på genre

router.delete('/:id', protect, deleteBook); // Endast inloggade användare kan radera böcker

module.exports = router;
