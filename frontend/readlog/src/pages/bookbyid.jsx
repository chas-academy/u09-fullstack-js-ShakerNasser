import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookById = () => {
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
    <div className="p-4">
      {book ? (
        <>
          <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-md" />
          <h1 className="text-lg font-bold mt-2">{book.title}</h1>
          <p className="text-gray-600">{book.author}</p>
          <p>{book.description}</p> 
        </>
      ) : (
        <p>Ingen bok hittades.</p>
      )}
    </div>
  );
};

export default BookById;
