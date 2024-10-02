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
      setIsAdmin(false);
    }
  }, []); // Tom array för att köra endast vid montering

  return { isAdmin };
};

export default useAuth;
