import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUpdateTitle from '../hooks/UpdateTitle';  // Import the custom hook

function Home() {
  useUpdateTitle("Home");  // Fliktiteln kommer vara "ReadLog - Home"

  const [books, setBooks] = useState([]); // Tillstånd för att lagra böcker
  const genres = ['Fantasy', 'Romance', 'Drama', 'Mystery'];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books`); // Hämta böcker
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data); // Uppdatera tillståndet med böckerna
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks(); // Anropa funktionen
  }, []); // Tom array betyder att den körs en gång vid montering

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
            {genres.map((genre) => (
              <Link to={`/genre/${genre}`} key={genre}>
                <span className="hover:text-gray-400 capitalize">{genre}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Avsnitt för att visa böckerna */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mb-16">
        {books.map((book) => (
          <div key={book._id} className="border rounded-lg p-4">
            <img 
              src={book.image} // Se till att du har en bild-URL i bok-objektet
              alt={book.title} 
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-bold mt-2">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            {/* Eventuellt en länk till bokens sida */}
            <Link to={`/books/${book._id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
