import React, { useState } from 'react';
import { registrarCliente } from '../../api/clienteService';

export default function ClienteRegistrar({ onVolver, rol }) {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    dni: '',
    celular: '',
    telefono: '',
    direccion: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generarPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8); // Generar contraseña aleatoria
    setForm({ ...form, password: randomPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registrarCliente({ ...form, rol });

      if (
        response.mensaje === 'Cliente registrado por recepcionista' ||
        response.mensaje === 'Cliente y usuario registrados correctamente'
      ) {
        alert('✅ Cliente registrado exitosamente');
        onVolver();
      } else {
        alert('⚠️ Registro fallido: ' + (response.mensaje || 'Respuesta inesperada'));
        console.error('Respuesta inesperada:', response);
      }
    } catch (error) {
      alert('❌ Error al registrar el cliente: ' + error.message);
      console.error(error);
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Registrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos existentes */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre <span className="text-danger">*</span></label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Ingrese nombre"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellidos" className="form-label">Apellidos <span className="text-danger">*</span></label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            className="form-control"
            value={form.apellidos}
            onChange={handleChange}
            required
            placeholder="Ingrese apellidos"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">DNI <span className="text-danger">*</span></label>
          <input
            type="text"
            id="dni"
            name="dni"
            className="form-control"
            value={form.dni}
            onChange={handleChange}
            required
            placeholder="Ingrese DNI"
            maxLength={8}
            pattern="\d{8}"
            title="Debe ser un DNI válido de 8 dígitos"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="celular" className="form-label">Celular <span className="text-danger">*</span></label>
          <input
            type="tel"
            id="celular"
            name="celular"
            className="form-control"
            value={form.celular}
            onChange={handleChange}
            required
            placeholder="Ingrese celular"
            pattern="\d{9}"
            title="Debe ser un número celular válido de 9 dígitos"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            className="form-control"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ingrese teléfono (opcional)"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            className="form-control"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Ingrese dirección (opcional)"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Ingrese correo electrónico"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña <span className="text-danger">*</span></label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required={rol === 'cliente'} // Solo obligatorio para el cliente
            placeholder="Ingrese contraseña"
            minLength={6}
          />
          {rol === 'recepcionista' && (
            <button type="button" className="btn btn-primary mt-2" onClick={generarPassword}>
              Generar Contraseña
            </button>
          )}
        </div>
        <button type="submit" className="btn btn-success me-2">Registrar</button>
        <button type="button" className="btn btn-secondary" onClick={onVolver}>Cancelar</button>
      </form>
    </div>
  );
}