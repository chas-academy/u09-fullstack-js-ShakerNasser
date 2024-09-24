// src/pages/GenrePage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const GenrePage = () => {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books/genre/${genre}`); // Ensure the URL is correct
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Could not fetch books.'); // Display an error message
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genre]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>; // Display error message if there is one

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Books in {genre.charAt(0).toUpperCase() + genre.slice(1)}:</h1>

      {/* Knappar för genrer
      <div className="my-4 flex justify-center space-x-4">
        <Link to="/genre/fantasy" className="text-lg text-blue-500 hover:text-blue-700">
          Fantasy
        </Link>
        <Link to="/genre/romance" className="text-lg text-blue-500 hover:text-blue-700">
          Romance
        </Link>
        <Link to="/genre/drama" className="text-lg text-blue-500 hover:text-blue-700">
          Drama
        </Link>
      </div> */}

      <ul className="space-y-2">
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book._id}>
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p>Author: {book.author}</p>
            </li>
          ))
        ) : (
          <p>No books found for this genre.</p>
        )}
      </ul>
    </div>
  );
};

export default GenrePage;
