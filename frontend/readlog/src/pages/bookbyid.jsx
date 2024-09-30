import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUpdateTitle from '../hooks/UpdateTitle';  // Import the custom hook

const BookById = () => {
useUpdateTitle("Book Details");

  const { id } = useParams(); // Hämta ID från URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`); // Kontrollera API-endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <div className="border rounded-lg p-4 mb-4 max-w-md mx-auto"> {/* Added styling for consistency */}
    {book ? (
      <>
        <img 
          src={book.image || "default-image-url.jpg"} // Fallback for missing images
          alt={`Cover image of ${book.title}`} 
          className="w-full h-48 object-cover rounded-md" 
        />
        <h1 className="text-lg font-bold mt-2">{book.title}</h1>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-gray-800 mt-2">{book.description}</p> {/* Optional styling for description */}
      </>
    ) : (
        <p>No book found</p>
      )}
    </div>
  );
};

export default BookById;
