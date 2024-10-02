const express = require('express');
const { getUsers, deleteUser, updateUser, getUserByID, createUser } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Hämta alla användare (admin-rättigheter krävs)
router.get('/', getUsers);
router.get('/:id', getUserByID);

// skapa en ny användare (admin-rättigheter krävs)
router.post('/', protect, admin, createUser);

// Uppdatera användare (admin-rättigheter krävs)
router.put('/:id', protect, admin, updateUser);

// Ta bort användare (admin-rättigheter krävs)
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
