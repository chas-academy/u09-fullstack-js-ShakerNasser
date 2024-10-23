import React from 'react';
import { Link } from 'react-router-dom';
import { genres } from '../components/genres';  // Importerar listan av genrer

function Genres() {
  return (
    <div className="p-4 mb-16">
      <h1 className="text-3xl font-bold mb-6">Browse by genre:</h1>
      
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {genres.map((genre, index) => (
          <div key={index} className="border rounded-lg p-3 shadow-md">
            <Link to={`/genre/${genre}`} className="text-blue-700 text-xs hover:underline capitalize">
              {genre}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Genres;
