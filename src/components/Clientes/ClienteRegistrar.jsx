import React, { useState } from 'react';
import { registrarCliente } from '../../api/clienteService'; // Verifica la ruta

export default function ClienteRegistrar({ onVolver }) {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    dni: '',
    celular: '',
    telefono: '',
    direccion: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registrarCliente(form);
      if (response.mensaje === 'Cliente creado') {
        alert('Cliente registrado exitosamente');
        onVolver(); // vuelve al listado
      } else {
        alert('Hubo un problema al registrar el cliente');
        console.error(response);
      }
    } catch (error) {
      alert('Error al registrar el cliente');
      console.error(error);
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Registrar Cliente</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-success me-2">Registrar</button>
        <button type="button" className="btn btn-secondary" onClick={onVolver}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
