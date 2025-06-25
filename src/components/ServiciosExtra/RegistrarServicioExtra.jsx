import React, { useState } from 'react';
import { registrarServicioExtra } from '../../api/servicioService';

function RegistrarServicioExtra({ onSuccess }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!nombre || !precio) {
      setError('Nombre y precio son obligatorios');
      return;
    }

    const data = { nombre, precio: parseFloat(precio), descripcion };

    try {
      await registrarServicioExtra(data);
      alert('Servicio extra registrado');
      onSuccess();
    } catch (err) {
      setError('Error al registrar servicio extra');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registrar Servicio Extra</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <label className="block mb-2">
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </label>

      <label className="block mb-2">
        Precio:
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full border rounded px-2 py-1"
          min="0"
          step="0.01"
          required
        />
      </label>

      <label className="block mb-4">
        Descripción:
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border rounded px-2 py-1"
          rows="3"
        />
      </label>

      <button type="submit" className="btn btn-success w-full">
        Registrar
      </button>
    </form>
  );
}

export default RegistrarServicioExtra;
