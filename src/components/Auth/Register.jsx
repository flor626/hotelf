// src/components/Auth/Register.jsx
import React from 'react';

const Register = () => {
  return (
    <div>
      <h2>Registro Recepcionista</h2>
      {/* Aquí tu formulario de registro */}
      <form>
        {/* Inputs para nombre, email, contraseña, etc */}
        <input type="text" placeholder="Nombre" required />
        <input type="email" placeholder="Correo" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
