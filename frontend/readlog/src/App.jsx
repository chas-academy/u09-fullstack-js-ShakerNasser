import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Books from '../src/components/Books';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/home';  // Importera Home-komponenten
import Contact from '../src/pages/contact';
import AboutUs from '../src/pages/aboutUs';
import MySite from '../src/pages/mysite';
import Register from '../src/pages/register';
import Login from '../src/pages/login';
import AdminPanel from '../src/pages/adminpanel';
import FAQ from '../src/pages/faq';
import Footer from './components/Footer'; 

function App() {
  return (
    <Router>

      <Navbar />

      <div className="p-4">
        
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/mysite" element={<MySite />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/faq" element={<FAQ/>} />

        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
