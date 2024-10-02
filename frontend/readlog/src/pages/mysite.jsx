// src/pages/MySite.js

import React from 'react';
import { Link } from 'react-router-dom';
import useUpdateTitle from '../hooks/UpdateTitle';
import useAuth from '../hooks/useAuth';

const MySite = () => {
  useUpdateTitle("My Site");
  const { isAdmin } = useAuth();

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Site!</h1>
      <p className="mb-6">Select an option below:</p>
      <div className="flex justify-center space-x-4">
        {/* Button for My List */}
        <Link to="/mylist">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            My List
          </button>
        </Link>

        {/* Button for creating a new book */}
        <Link to="/bookitem">
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200">
            Create Book
          </button>
        </Link>

        {/* Conditional rendering for Admin Portal */}
        {isAdmin && (
          <Link to="/adminpanel">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
              Admin Portal
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MySite;
