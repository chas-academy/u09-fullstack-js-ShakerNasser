const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  genre: { 
    type: String, 
    required: true  // Genre är fortfarande ett obligatoriskt fält
  },
  isInList: { 
    type: Boolean, 
    default: false  // Standard är att boken inte är markerad i listan
  },
}, {
  timestamps: true  // Skapar automatisk createdAt och updatedAt
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
