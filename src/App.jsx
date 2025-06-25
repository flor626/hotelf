import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';

import Habitaciones from './components/Habitaciones/Habitaciones';
import Clientes from './components/Clientes/Clientes';
import Reservas from './components/Reservas/Reservas';
import ServiciosExtra from './components/ServiciosExtra/ServiciosExtra';
import CheckInOut from './components/CheckInOut/CheckInOut';
import Pagos from './components/Pagos/Pagos';


import MainLayout from './components/Layout/MainLayout';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas con navbar */}
          <Route
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
<Route path="/habitaciones" element={<Habitaciones />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/servicios" element={<ServiciosExtra />} />
            <Route path="/checkinout" element={<CheckInOut />} />
            <Route path="/pagos" element={<Pagos />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
