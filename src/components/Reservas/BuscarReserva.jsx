// ✅ Reservas/BuscarReserva.jsx
import React, { useState } from 'react';
import { listarReservas } from '@/api/reservaService';

export default function BuscarReserva({ onResultados }) {
  const [fecha, setFecha] = useState('');

  const buscar = async () => {
    try {
      const resultados = await listarReservas(fecha);
      onResultados(resultados);
    } catch (err) {
      console.error('Error al buscar reservas:', err);
      alert('Error al buscar reservas.');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Buscar Reservas por Fecha</h2>
      <div className="flex gap-2">
        <input
          type="date"
          className="border p-2 rounded"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <button onClick={buscar} className="bg-blue-500 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </div>
    </div>
  );
}