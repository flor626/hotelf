// src/components/Layout/MainLayout.jsx
import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div style={styles.container}>
      <Navbar />
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
  },
  main: {
    marginLeft: '220px', // ancho del sidebar para que no quede detrás
    padding: '20px',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
  },
};

export default MainLayout;
