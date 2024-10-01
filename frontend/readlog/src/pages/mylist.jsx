import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUpdateTitle from '../hooks/UpdateTitle';  // Import the custom hook

const MyList = () => {
  useUpdateTitle("My List");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Om du har ett sökfält

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books`);
        if (!response.ok) {
          throw new Error('Nätverksfel: ' + response.status);
        }
        const data = await response.json();
        console.log(data); // Logga den hämtade datan
        setBooks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book._id} className="border rounded-lg p-4">
              <img 
                src={book.image} 
                alt={`Cover of ${book.title}`} 
                className="w-full h-48 object-cover rounded-md" 
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

export default MyList;

