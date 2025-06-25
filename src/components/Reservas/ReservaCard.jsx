// src/components/ReservaCard.jsx
import React from 'react';

export default function ReservaCard({ reserva, onCancelar }) {
  const estadoColor = reserva.estado === 'cancelada' ? 'danger' : 'success';

  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title">Reserva #{reserva.id}</h5>
        <p className="card-text"><strong>ID Cliente:</strong> {reserva.id_cliente}</p>
        <p className="card-text"><strong>ID Habitación:</strong> {reserva.id_habitacion}</p>
        <p className="card-text"><strong>Fecha Inicio:</strong> {reserva.fecha_inicio}</p>
        <p className="card-text"><strong>Fecha Fin:</strong> {reserva.fecha_fin}</p>
        <p className="card-text">
          <strong>Estado:</strong>{' '}
          <span className={`badge bg-${estadoColor}`}>{reserva.estado}</span>
        </p>

        {reserva.estado !== 'cancelada' && (
          <button
            onClick={() => onCancelar(reserva.id)}
            className="btn btn-outline-danger mt-2"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
