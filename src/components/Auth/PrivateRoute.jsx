// src/components/Auth/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Si no está logueado, redirige a login
    return <Navigate to="/" />;
  }

  // Si está logueado, muestra los hijos (componente protegido)
  return children;
};

export default PrivateRoute;
