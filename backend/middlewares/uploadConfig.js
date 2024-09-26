// middlewares/uploadConfig.js
const multer = require('multer');

// Set storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file to avoid collisions
  }
});

// Create multer instance with the defined storage
const upload = multer({ storage });

module.exports = upload;
