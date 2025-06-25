// src/components/Habitaciones/HabitacionUpdateForm.jsx
import React, { useState, useEffect } from 'react';
import { actualizarHabitacion } from '../../api/habitacionService';

export default function HabitacionUpdateForm({ habitacion, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    numero: '',
    tipo: '',
    precio: '',
    capacidad: '',
    descripcion: '',
    estado: '',
  });

  useEffect(() => {
    if (habitacion) {
      setForm({ ...habitacion });
    }
  }, [habitacion]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await actualizarHabitacion(habitacion.id, form);
    if (res.habitacion) {
      onSuccess();
    }
  };

  if (!habitacion) return null;

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} required />
      <select name="tipo" value={form.tipo} onChange={handleChange} required>
        <option value="simple">Simple</option>
        <option value="doble">Doble</option>
        <option value="suite">Suite</option>
      </select>
      <input name="precio" placeholder="Precio" type="number" value={form.precio} onChange={handleChange} required />
      <input name="capacidad" placeholder="Capacidad" type="number" value={form.capacidad} onChange={handleChange} required />
      <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
      <select name="estado" value={form.estado} onChange={handleChange}>
        <option value="disponible">Disponible</option>
        <option value="ocupada">Ocupada</option>
        <option value="mantenimiento">Mantenimiento</option>
        <option value="inactiva">Inactiva</option>
      </select>
      <button type="submit">Actualizar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}
