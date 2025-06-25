import React, { useState } from 'react';
import { asignarServicioAReserva } from '../../api/servicioService';

function AsignarServicioReserva({ onSuccess }) {
  const [idReserva, setIdReserva] = useState('');
  const [idServicioExtra, setIdServicioExtra] = useState('');
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    if (!idReserva || !idServicioExtra) {
      setMensaje('Reserva y servicio extra son obligatorios');
      return;
    }

    try {
      const response = await asignarServicioAReserva({ id_reserva: idReserva, id_servicio_extra: idServicioExtra });
      if (response.mensaje) {
        setMensaje(response.mensaje);
        onSuccess();
      } else {
        setMensaje('Error al asignar servicio');
      }
    } catch (error) {
      setMensaje('Error en la conexión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Asignar Servicio Extra a Reserva</h2>

      {mensaje && <p className="mb-4">{mensaje}</p>}

      <label className="block mb-2">
        ID Reserva:
        <input
          type="text"
          value={idReserva}
          onChange={(e) => setIdReserva(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </label>

      <label className="block mb-4">
        ID Servicio Extra:
        <input
          type="text"
          value={idServicioExtra}
          onChange={(e) => setIdServicioExtra(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </label>

      <button type="submit" className="btn btn-primary w-full">
        Asignar
      </button>
    </form>
  );
}

export default AsignarServicioReserva;
