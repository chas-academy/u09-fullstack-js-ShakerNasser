import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get('q');

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books/search?q=${searchTerm}`);
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch search results');
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchBooks();
    }
  }, [searchTerm]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default Search;
