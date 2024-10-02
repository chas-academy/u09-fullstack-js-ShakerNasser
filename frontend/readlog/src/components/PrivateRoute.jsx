import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Importera den tidigare skapade useAuth hooken

const PrivateRoute = ({ element }) => {
  const { isAdmin } = useAuth(); // Hämta användarens adminstatus från useAuth hooken

  return isAdmin ? element : <Navigate to="/adminpanel" />; // Om användaren är admin, rendera elementet, annars navigera till /home
};

export default PrivateRoute;
