import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (

    
    <div className="bg-gray-100">
      <div className="w-full bg-white shadow-md p-4">
        <div className="flex justify-around mt-2">
          <Link to="/genre/fantasy">
            <span>Fantasy</span>
          </Link>
          <Link to="/genre/romance">
            <span>Romance</span>
          </Link>
          <Link to="/genre/drama">
            <span>Drama</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
