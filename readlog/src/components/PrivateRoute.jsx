// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth  from '../hooks/useAuth'; // Anpassa sökvägen efter din struktur

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Erhåller autentiseringsstatus

  return isAuthenticated ? element : <Navigate to="/mysite" />;
};

export default PrivateRoute;
