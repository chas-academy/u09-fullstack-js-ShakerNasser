const Book = require('../models/Book');

// Skapa ny bok
const createBook = async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const book = await Book.create({ title, author, genre });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error creating book', error });
  }
};

// Hämta alla böcker från databasen
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();  // Hämta alla böcker från databasen
    res.status(200).json(books);  // Returnera böckerna som JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Hämta en specifik bok baserat på ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);  // Hämta boken från databasen med ID

    if (book) {
      res.status(200).json(book);  // Returnera boken om den hittas
    } else {
      res.status(404).json({ message: 'Book not found' });  // Om boken inte hittas
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the book', error });
  }
}

const getBooksByGenre = async (req, res) => {
  const { genre } = req.params;  // Hämta genre från URL-parametrarna
  try {
    const books = await Book.find({ genre });  // Hämta böcker med specifik genre
    res.status(200).json(books);  // Returnera böckerna som JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books by genre', error });
  }
};

const getSearch = async (req, res) => {
  const searchTerm = req.query.q;  // Hämta sökterm från query-parametrar
  try {
    // Regex för att hitta böcker med titlar som innehåller söktermen, case-insensitive
    const books = await Book.find({
      title: { $regex: searchTerm, $options: 'i' }
    });
    
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error searching books', error: err });
  }
};



module.exports = { createBook, getBooks, getBookById, getBooksByGenre, getSearch};
