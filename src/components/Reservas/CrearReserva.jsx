// ✅ Reservas/CrearReserva.jsx
import React, { useState } from 'react';
import { crearReserva } from '../../api/reservaService';


export default function CrearReserva({ onReservaCreada }) {
  const [form, setForm] = useState({
    id_cliente: '',
    id_habitacion: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevaReserva = await crearReserva(form);
      alert('Reserva creada exitosamente');
      onReservaCreada(nuevaReserva);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Crear Nueva Reserva</h2>
      <div className="grid grid-cols-2 gap-4">
        <input type="number" name="id_cliente" value={form.id_cliente} onChange={handleChange} placeholder="ID Cliente" className="border p-2 rounded" required />
        <input type="number" name="id_habitacion" value={form.id_habitacion} onChange={handleChange} placeholder="ID Habitación" className="border p-2 rounded" required />
        <input type="date" name="fecha_inicio" value={form.fecha_inicio} onChange={handleChange} className="border p-2 rounded" required />
        <input type="date" name="fecha_fin" value={form.fecha_fin} onChange={handleChange} className="border p-2 rounded" required />
        <button type="submit" className="col-span-2 bg-green-500 text-white py-2 rounded">Guardar Reserva</button>
      </div>
    </form>
  );
}
