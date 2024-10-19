// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Dekoda token
        setIsAuthenticated(true); // Användaren är inloggad
        setIsAdmin(decodedToken.role === 'admin'); // Kontrollera om användaren är admin
      } catch (error) {
        console.error("Token decoding failed", error);
        setIsAuthenticated(false); // Om det uppstår ett fel, se till att sätta inloggning till false
      }
    } else {
      console.warn("No token found"); // Lägg till en varning om ingen token hittas
      setIsAuthenticated(false); // Sätt `isAuthenticated` till false om ingen token finns
    }
  }, []); // Tom array för att köra endast vid montering

  return { isAuthenticated, isAdmin }; // Returnera båda värdena
};

export default useAuth;
