// src/components/ReservaCard.jsx
import React from 'react';

export default function ReservaCard({ reserva, onCancelar }) {
  const estadoColor = reserva.estado === 'cancelada' ? 'danger' :
                      reserva.estado === 'finalizada' ? 'secondary' : 'success';

  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title">Reserva #{reserva.id}</h5>
        <p className="card-text"><strong>Cliente:</strong> {reserva.cliente?.nombre} {reserva.cliente?.apellidos}</p>
        <p className="card-text"><strong>Habitación:</strong> #{reserva.habitacion?.numero}</p>
        <p className="card-text"><strong>Inicio:</strong> {reserva.fecha_inicio}</p>
        <p className="card-text"><strong>Fin:</strong> {reserva.fecha_fin}</p>
        <p className="card-text">
          <strong>Estado:</strong>{' '}
          <span className={`badge bg-${estadoColor}`}>{reserva.estado}</span>
        </p>

        {reserva.estado !== 'cancelada' && (
          <button onClick={() => onCancelar(reserva.id)} className="btn btn-outline-danger mt-2">
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
