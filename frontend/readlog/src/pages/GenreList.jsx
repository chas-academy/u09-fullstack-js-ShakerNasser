// src/pages/GenreList.js
import React from 'react';
import { Link } from 'react-router-dom';

const GenreList = () => {
  const genres = ['romance', 'drama', 'fantasy'];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Choose a genre:</h1>
      <ul className="space-y-2">
        {genres.map((genre) => (
          <li key={genre}>
            <Link
              to={`/genre/${genre}`}
              className="text-blue-600 hover:underline"
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)} books
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
