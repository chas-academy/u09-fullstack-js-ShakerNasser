import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import useUpdateTitle from '../hooks/UpdateTitle';  // Import the custom hook


const Search = () => {
  useUpdateTitle("Search Results");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get('q');

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/books/search?q=${searchTerm}`);
        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchBooks();
    }
  }, [searchTerm]);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-6">
        Search Results for "{searchTerm}"
      </h1>
      
      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Grid layout för sökresultat */}
          {books.map((book) => (
            <div key={book._id} className="border rounded-lg p-4"> {/* Varje bok i sitt eget kort */}
              <img 
             src={`${import.meta.env.VITE_API_URL}/${book.image}`} // Kombinera med API URL
                alt={`Cover of ${book.title}`} 
                className="w-full h-38 object-cover rounded-md" 
              />
              <h3 className="text-lg font-bold mt-2">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              <Link to={`/books/${book._id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No results found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default Search;
