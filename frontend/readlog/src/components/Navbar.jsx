import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/Layer_3ew.png'; // Justera sökvägen till din bild

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
    setSearchTerm('');
  };
  
  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>

        <form onSubmit={handleSearchSubmit} className="flex">
            <input 
              type="text" 
              value={searchTerm} 
              onChange={handleSearchChange} 
              placeholder="Search..." 
              className="border border-gray-300 rounded-l p-2"
            />
            <button type="submit" className="bg-stone-300 text-black font-bold rounded-r p-2">
              Search
            </button>
          </form>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Links */}
        <div className={`hidden md:flex items-center space-x-4 ${isOpen ? 'hidden' : 'flex'}`}>
          <Link to="/home" className="text-black hover:text-gray-400 font-bold">Home</Link>
          <Link to="/contact" className="text-black hover:text-gray-400 font-bold">Contact</Link>
          <Link to="/aboutus" className="text-black hover:text-gray-400 font-bold">About Us</Link>
          <Link to="/login" className="text-black hover:text-gray-400 font-bold">Log in</Link>
        </div>
      </div>

      {/* Mobile menu links */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-4">
          <Link to="/home" className="text-black hover:text-gray-400">Home</Link>
          <Link to="/contact" className="text-black hover:text-gray-400">Contact</Link>
          <Link to="/about" className="text-black hover:text-gray-400">About Us</Link>
          <Link to="/login" className="text-black hover:text-gray-400">Log in</Link>
          
          {/* Search Field for Mobile */}
          <form onSubmit={handleSearchSubmit} className="flex mt-2">
            <input 
              type="text" 
              value={searchTerm} 
              onChange={handleSearchChange} 
              placeholder="Search..." 
              className="border border-gray-300 rounded-l p-2"
            />
            <button type="submit" className="bg-blue-500 text-black rounded-r p-2">
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
