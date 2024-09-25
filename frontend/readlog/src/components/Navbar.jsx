import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Layer_3ew.png'; // Justera sökvägen till din bild

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Hantera sökning här, t.ex. navigera till en söksida
    console.log("Searching for:", searchTerm);
  };

  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Links */}
        <div className={`hidden md:flex items-center space-x-4`}>
          <Link to="/home" className="text-black hover:text-gray-400 font-bold">Home</Link>
          <Link to="/contact" className="text-black hover:text-gray-400 font-bold">Contact</Link>
          <Link to="/aboutus" className="text-black hover:text-gray-400 font-bold">About Us</Link>
          <Link to="/mysite" className="text-black hover:text-gray-400 font-bold">My Site</Link>
        </div>
      </div>

      {/* Mobile menu links */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-4">
          <Link to="/home" className="text-black hover:text-gray-400">Home</Link>
          <Link to="/contact" className="text-black hover:text-gray-400">Contact</Link>
          <Link to="/aboutus" className="text-black hover:text-gray-400">About Us</Link>
          <Link to="/mysite" className="text-black hover:text-gray-400">My Site</Link>
          
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
