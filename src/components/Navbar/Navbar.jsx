// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../image/cielo-azul.png'; // Ajusta la ruta según la ubicación de tu imagen

const Navbar = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <img src={logo} alt="Logo de Cielo Azul" style={styles.logo} />
      </div>
      <nav style={styles.nav}>
        <Link to="/habitaciones" style={styles.link}>Habitaciones</Link>
        <Link to="/clientes" style={styles.link}>Clientes</Link>
        <Link to="/reservas" style={styles.link}>Reservas</Link>
        <Link to="/servicios" style={styles.link}>Servicios</Link>
        <Link to="/pagos" style={styles.link}>Check-In/Outs</Link>

      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    height: '100vh',
    backgroundColor: '#4a90e2', // color azul cielo
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 10px',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  logo: {
    maxWidth: '100%', // Asegura que la imagen no exceda el ancho del contenedor
    height: 'auto', // Mantiene la proporción de la imagen
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '8px 12px',
    borderRadius: '4px',
  },
};

export default Navbar;
