// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const AuthContext = createContext();

// Provider que envuelve la app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simula persistencia de sesión (puedes usar localStorage o verificar token backend)
  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  // Función para login (aquí deberías llamar a backend y validar)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Función para logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
