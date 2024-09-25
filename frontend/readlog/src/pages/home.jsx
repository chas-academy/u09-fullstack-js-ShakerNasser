import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const genres = ['Fantasy', 'Romance', 'Drama', 'Mystery'];
  
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

    </div>
  );
}

export default Home;
