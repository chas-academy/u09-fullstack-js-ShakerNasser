const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true // Titel är ett obligatoriskt fält
  },
  author: { 
    type: String, 
    required: true // Författare är ett obligatoriskt fält
  },
  description: {
    type: String,
    required: false, // Beskrivning är inte ett obligatoriskt fält
  },
  image: {
    type: String,
    required: false, // Bild är inte ett obligatoriskt fält
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
