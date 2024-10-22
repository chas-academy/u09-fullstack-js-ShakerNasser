import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUpdateTitle from '../hooks/UpdateTitle';  

const BookById = () => {
  useUpdateTitle("Book Details");

  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${id}`); 
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
    <div className="border rounded-lg p-4 mb-20 max-w-sm mx-auto"> 
      {book ? (
        <>
          <img
            src={`${import.meta.env.VITE_API_URL}/${book.image}`} 
            alt={`Cover image of ${book.title}`}
            className="w-full h-48 object-cover rounded-md" 
          />
          <h1 className="text-lg font-semibold mt-3">{book.title}</h1>
          <p className="text-gray-600 text-sm mt-1"> <span className="font-bold">By:</span> {book.author}</p>
          <p className="text-gray-800 text-sm mt-2"> <span className="font-bold">Description:</span> {book.description}</p>
        </>
      ) : (
        <p>No book found</p>
      )}
    </div>
  );
};

export default BookById;
