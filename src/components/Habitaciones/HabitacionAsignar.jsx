import React, { useState } from 'react';
import { asignarHabitacion } from '../../api/habitacionService';

export default function HabitacionAsignar({ onSuccess }) {
  const [form, setForm] = useState({
    idHabitacion: '',
    idReserva: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await asignarHabitacion(form);
    if (res.mensaje === 'Habitación asignada a la reserva') {
      alert('✅ Habitación asignada correctamente');
      onSuccess && onSuccess();
    } else {
      alert(`❌ Error al asignar habitación: ${res.mensaje || 'Error desconocido'}`);
    }
  } catch (error) {
    alert('❌ Error al asignar habitación: ' + error.message);
  }
};


  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Asignar Habitación a Reserva</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="idHabitacion"
            placeholder="ID Habitación"
            value={form.idHabitacion}
            onChange={handleChange}
            required
            type="number"
          />
        </div>
        <div>
          <input
            name="idReserva"
            placeholder="ID Reserva"
            value={form.idReserva}
            onChange={handleChange}
            required
            type="number"
          />
        </div>
        <button type="submit">Asignar</button>
      </form>
    </div>
  );
}
