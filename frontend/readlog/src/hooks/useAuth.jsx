// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Dekoda token
        setIsAdmin(decodedToken.role === 'admin'); // Kontrollera om användaren är admin
      } catch (error) {
        console.error("Token decoding failed", error);
      }
    } else {
      console.warn("No token found"); // Lägg till en varning om ingen token hittas
      setIsAdmin(false); // Se till att `isAdmin` sätts till false om ingen token finns
    }
  }, []); // Tom array för att köra endast vid montering

  return { isAdmin };
};

export default useAuth;
