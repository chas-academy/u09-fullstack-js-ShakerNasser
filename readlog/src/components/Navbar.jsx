import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/public/images/Layer_32.png'; // Justera sökvägen till din bild

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
    if (searchTerm) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/home');
  };

  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
          <img src={logo} alt="Logo" className="h-20" />
        </Link>

        {/* Sökformulär för större skärmar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-grow mx-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="border border-gray-300 rounded-l p-2 flex-grow"
          />
          <button type="submit" className="bg-stone-300 text-black font-bold rounded-r p-2" disabled={!searchTerm}>
            Search
          </button>
        </form>

        {/* Hamburger meny för mobila enheter */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Navigationsmeny */}
        <div className={`md:flex items-center space-x-4 ${isOpen ? 'flex flex-col' : 'hidden'} md:flex-row`}>
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

      {/* Visar sökformulär när menyn är öppen på mobila enheter */}
      {isOpen && (
        <form onSubmit={handleSearchSubmit} className="flex mt-2 md:hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="border border-gray-300 rounded-l p-2 flex-grow"
          />
          <button type="submit" className="bg-blue-500 text-black rounded-r p-2" disabled={!searchTerm}>
            Search
          </button>
        </form>
      )}
    </nav>
  );
};

export default Navbar;
