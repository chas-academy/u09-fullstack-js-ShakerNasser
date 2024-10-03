import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-black py-4 fixed bottom-0 left-0 w-full">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} ReadLog. All right reserved.</p>
                <nav className="mt-2">
                    <ul className="flex justify-center space-x-4">
                    <Link to="/faq" className="hover:underline">FAQ </Link>
                        <Link to="/Aboutus" className="hover:underline">AboutUs</Link>
                        <Link to="/contact" className="hover:underline">Contact</Link>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
