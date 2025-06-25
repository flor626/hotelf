import React, { useState, useEffect } from 'react';
import HabitacionCard from './HabitacionCard';
import { listarHabitaciones } from '../../api/habitacionService';

export default function HabitacionDisponibilidad() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    listarHabitaciones().then(setHabitaciones);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!fechaInicio || !fechaFin) {
      alert('Seleccione ambas fechas');
      return;
    }
    // Las fechas ya se envían a cada tarjeta para verificar disponibilidad
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Consultar Habitaciones Disponibles</h2>

      <form onSubmit={handleSubmit} className="row g-3 align-items-end">
        <div className="col-md-4">
          <label className="form-label">Fecha de Inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={e => setFechaInicio(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha de Fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={e => setFechaFin(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-4">
          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-search me-2"></i>Consultar
          </button>
        </div>
      </form>

      <hr className="my-4" />

      <div className="row">
        {habitaciones.map(h => (
          <div key={h.id} className="col-md-4 mb-4">
            <HabitacionCard
              habitacion={h}
              fechaInicio={fechaInicio}
              fechaFin={fechaFin}
              onClick={(habitacion) => console.log('Habitación seleccionada:', habitacion)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
