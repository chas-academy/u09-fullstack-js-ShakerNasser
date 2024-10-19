import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUpdateTitle from '../hooks/UpdateTitle';  // Import the custom hook
import useAuth from '../hooks/useAuth';
import { genres } from '../components/genres';  // Import genres from the new file


function Home() {
  useUpdateTitle("Home");  // Fliktiteln kommer vara "ReadLog - Home"

  const { isAdmin } = useAuth();
  const [books, setBooks] = useState([]); // Tillstånd för att lagra böcker

  // Funktion för att radera en bok
  const deleteBook = async (bookId) => {
    const token = localStorage.getItem('token');  // Hämta token från localStorage (om det är där du lagrar den)
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,  // Lägg till Authorization-headern
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        // Uppdatera books tillståndet för att ta bort den raderade boken
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books`); // Hämta böcker
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const shuffledBooks = data.sort(() => Math.random() - 0.5);
        setBooks(shuffledBooks); // Uppdatera tillståndet med böckerna
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks(); // Anropa funktionen
  }, []); // Tom array betyder att den körs en gång vid montering

  // Begränsa antalet genrer som visas, t.ex. till de första fyra
  const displayedGenres = genres.slice(0, 4);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-left text-2xl md:text-4xl">
          Deciding what to read next?
        </p>

        <div className="flex justify-end">
          <img
            src="./src/images/image.png"
            alt="React Image"
            className="max-w-xs md:max-w-md lg:max-w-lg p-3"
          />
        </div>
      </div>

      <div className="bg-gray-200">
        <div className="w-full shadow-md p-4">
          <div className="flex justify-around mt-1 font-bold">
            {/* Visa endast ett urval av genrer */}
            {displayedGenres.map((genre) => (
              <Link to={`/genre/${genre}`} key={genre}>
                <span className="hover:text-gray-400 capitalize">{genre}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Avsnitt för att visa böckerna */}
      <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 mb-16">
        {books.map((book) => {
          return (
            <div key={book._id} className="border rounded-lg p-4">
              <img
                src={`${import.meta.env.VITE_API_URL}/${book.image}`} // Kombinera med API URL
                alt={book.title}
                className="w-full h-38 object-cover rounded-md"
              />

              <Link to={`/books/${book._id}`} className="text-blue-500 hover:underline">
              <h3 className="text-lg font-bold mt-2">{book.title}</h3>
              </Link>
              <p className="text-gray-600"> By: {book.author}</p>

              {isAdmin && (
                <button 
                  onClick={() => deleteBook(book._id)}  // Anropa deleteBook-funktionen
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
