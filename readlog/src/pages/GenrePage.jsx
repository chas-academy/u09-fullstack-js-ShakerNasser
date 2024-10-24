// src/pages/GenrePage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useUpdateTitle from '../hooks/UpdateTitle';  // Import the custom hook


const GenrePage = () => {
  useUpdateTitle("Books by genre"); 

  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/books/genre/${genre}`); // Ensure the URL is correct
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

  if (loading) return <p className="text-lg text-center">Loading books...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>; // Display error message if there is one

  return (
    <div className="p-4 mb-12">
      <h1 className="text-3xl font-extrabold mb-2flex items-center mb-5">
 
        Books in {genre.charAt(0).toUpperCase() + genre.slice(1)}:
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="border rounded-lg p-4"> 
              <img 
                src={`${import.meta.env.VITE_API_URL}/${book.image}`} // Kombinera med API URL
                alt={`Cover of ${book.title}`} 
                className="w-full h-38 object-cover rounded-md" 
              />
              <h3 className="text-lg font-bold mt-2">{book.title}</h3>
              <p className="text-gray-600"> By: {book.author}</p>
              {/* Länk till bokens sida */}
              <Link to={`/books/${book._id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No books found for this genre.</p> // Meddelande om inga böcker hittades
        )}
      </div>
    </div>
  );
};

export default GenrePage;
