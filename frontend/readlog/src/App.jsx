import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/home';  
import Contact from '../src/pages/contact';
import AboutUs from '../src/pages/aboutus';
import MySite from '../src/pages/mysite';
import Register from '../src/pages/register';
import Login from '../src/pages/login';
import AdminPanel from '../src/pages/adminpanel';
import FAQ from '../src/pages/faq';
import Footer from './components/Footer'; 
import GenrePage from '../src/pages/GenrePage';  // Importera GenrePage-komponenten
import Search from '../src/pages/search';  // Importera getSearch-komponenten
import BookItem from './pages/BookItem';  // Importera BookItem-komponenten
import BookById from './pages/bookbyid';  // Importera BookById-komponenten
import MyList from '../src/pages/mylist';  // Importera MyList-komponenten
import PrivateRoute from './components/PrivateRoute'; // Importera PrivateRoute
import Genres from '../src/pages/genres';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books/:id" element={<BookById />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/mysite" element={<PrivateRoute element={<MySite />} />} /> {/* Skydda MySite */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminpanel" element={<PrivateRoute element={<AdminPanel />} />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/genre/:genre" element={<GenrePage />} />
          <Route path="/search" element={<Search />} /> 
          <Route path="/BookItem" element={<BookItem />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/genres" element={<Genres />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
