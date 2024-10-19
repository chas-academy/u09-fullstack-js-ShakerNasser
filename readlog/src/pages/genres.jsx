import React from 'react';
import { Link } from 'react-router-dom';
import { genres } from '../components/genres';  // Importerar listan av genrer

function Genres() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Browse by Genre</h1>
      
      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <div key={genre} className="border rounded-lg p-4 shadow-md">
            <Link to={`/genre/${genre}`} className="text-blue-700 hover:underline capitalize">
              {genre}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Genres;
