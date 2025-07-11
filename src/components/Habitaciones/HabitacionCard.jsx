import React, { useEffect, useState } from 'react';
import { disponibilidadPorHabitacion } from '../../api/habitacionService';

export default function HabitacionCard({ habitacion, onClick }) {
  const [disponibilidades, setDisponibilidades] = useState([]);

  useEffect(() => {
  const hoy = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
  disponibilidadPorHabitacion(habitacion.id, hoy)
    .then((data) => {
      setDisponibilidades(data.disponibilidades || []);
    })
    .catch(() => {
      setDisponibilidades([]);
    });
}, [habitacion.id]);



  // Capitaliza estado
  const capitalizar = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Color según estado
  const estadoColor = {
    disponible: 'text-success',
    ocupada: 'text-danger',
    mantenimiento: 'text-warning',
  };

  return (
    <div
      className="card shadow-sm"
      style={{
        cursor: 'pointer',
        width: '250px',
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => onClick(habitacion)}
    >
      {habitacion.imagen && (
        <img
          src={habitacion.imagen}
          alt={`Habitación ${habitacion.numero}`}
          className="card-img-top"
          style={{ height: '140px', objectFit: 'cover' }}
        />
      )}

      <div
        className="card-body d-flex flex-column"
        style={{ flex: '1 1 auto', padding: '1rem', overflow: 'hidden' }}
      >
        <h5 className="card-title">Habitación {habitacion.numero}</h5>

        <p
          className="card-text text-truncate"
          title={habitacion.descripcion}
          style={{ maxHeight: '3rem', overflow: 'hidden', marginBottom: '0.5rem' }}
        >
          {habitacion.descripcion || 'Sin descripción'}
        </p>

        <p className="mb-2">
          <strong>Estado: </strong>
          <span className={estadoColor[habitacion.estado] || 'text-muted'}>
            {capitalizar(habitacion.estado)}
          </span>
        </p>

        <div
          className="mt-auto"
          style={{ overflowY: 'auto', maxHeight: '90px', paddingRight: '0.5rem' }}
        >
          <h6>Disponibilidad:</h6>
          {disponibilidades.length === 0 ? (
            <p className="text-muted small">No hay información de disponibilidad</p>
          ) : (
            <ul className="list-unstyled small mb-0" style={{ paddingLeft: '1rem' }}>
              {disponibilidades.map((disp, idx) => (
                <li key={idx}>
                  <i className="bi bi-calendar-event me-1"></i>
                  Desde <strong>{disp.desde}</strong> hasta{' '}
                  <strong>{disp.hasta || 'Indefinido'}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
