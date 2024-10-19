// src/components/BookList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Ändra till att använda fullständig URL
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`);
                setBooks(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Book List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {books.map((book) => (
                    <div key={book._id} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">{book.title}</h2>
                        <h3 className="text-gray-700">{book.author}</h3>
                        <h4 className="text-gray-600">{book.genre}</h4>
                        <p className="text-gray-500 mt-2">{book.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
