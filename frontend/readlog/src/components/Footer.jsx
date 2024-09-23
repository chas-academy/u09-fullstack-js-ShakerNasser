import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-black py-4 fixed bottom-0 left-0 w-full">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} ReadLog. All right reserved.</p>
                <nav className="mt-2">
                    <ul className="flex justify-center space-x-4">
                    <Link to="/faq"className="hover:underline">FAQ </Link>
                        <li><a href="/Aboutus" className="hover:underline">AboutUs</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
