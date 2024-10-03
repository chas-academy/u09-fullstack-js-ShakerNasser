import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/Layer_3ew.png'; // Justera sökvägen till din bild

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
    setSearchTerm('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/home');
  };

  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home">
          <img src={logo} alt="Logo" className="h-9" />
        </Link>

        <form onSubmit={handleSearchSubmit} className="hidden md:flex">
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

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>

        <div className={`hidden md:flex items-center space-x-4 ${isOpen ? 'hidden' : 'flex'}`}>
          <Link to="/home" className="text-black hover:text-gray-400 font-bold">Home</Link>
          <Link to="/contact" className="text-black hover:text-gray-400 font-bold">Contact</Link>
          <Link to="/aboutus" className="text-black hover:text-gray-400 font-bold">About Us</Link>
          <Link to="/genres" className="text-black hover:text-gray-400 font-bold">Genres</Link>

          {isLoggedIn ? (
            <>
              <Link to="/mysite" className="text-black hover:text-gray-400 font-bold">My Site</Link>
              <button onClick={handleLogout} className="text-black hover:text-gray-400 font-bold">Log out</button>
            </>
          ) : (
            <Link to="/login" className="text-black hover:text-gray-400 font-bold">Log in</Link>
          )}
        </div>
      </div>

      {isOpen && (
        <form onSubmit={handleSearchSubmit} className="flex mt-2 md:hidden">
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
      )}
    </nav>
  );
};

export default Navbar;
