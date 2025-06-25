import React, { useEffect, useState } from 'react';
import { listarHabitaciones } from '../../api/habitacionService';

import HabitacionCard from './HabitacionCard';
import HabitacionForm from './HabitacionForm';
import HabitacionBuscarPorTipo from './HabitacionBuscarPorTipo';
import HabitacionDisponibilidad from './HabitacionDisponibilidad';
import HabitacionAsignar from './HabitacionAsignar';
import HabitacionDetalle from './HabitacionDetalle';

export default function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [pantalla, setPantalla] = useState('listar'); // 'listar', 'registrar', 'buscar', 'disponibilidad', 'asignar', 'detalle'
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  const cargarHabitaciones = () => {
    listarHabitaciones().then(setHabitaciones);
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const verDetalle = (habitacion) => {
    setHabitacionSeleccionada(habitacion);
    setPantalla('detalle');
  };

  const volverAlListado = () => {
    setHabitacionSeleccionada(null);
    setPantalla('listar');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Gestión de Habitaciones</h2>

      {/* Botones para cambiar de pantalla */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button className="btn btn-primary" onClick={() => setPantalla('listar')}>
          <i className="bi bi-list me-2"></i> Listar Habitaciones
        </button>

        <button className="btn btn-success" onClick={() => setPantalla('registrar')}>
          <i className="bi bi-plus-circle me-2"></i> Registrar Habitación
        </button>

        <button className="btn btn-info" onClick={() => setPantalla('buscar')}>
          <i className="bi bi-search me-2"></i> Buscar por Tipo
        </button>

        <button className="btn btn-warning" onClick={() => setPantalla('disponibilidad')}>
          <i className="bi bi-calendar-check me-2"></i> Ver Disponibilidad
        </button>

        <button className="btn btn-dark" onClick={() => setPantalla('asignar')}>
          <i className="bi bi-door-open me-2"></i> Asignar Habitación
        </button>
      </div>

      {/* Mostrar componentes según pantalla */}
      {pantalla === 'listar' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {habitaciones.map(h => (
            <HabitacionCard key={h.id} habitacion={h} onClick={verDetalle} />
          ))}
        </div>
      )}

      {pantalla === 'registrar' && (
        <HabitacionForm
          onSuccess={() => {
            cargarHabitaciones();
            setPantalla('listar');
          }}
        />
      )}

      {pantalla === 'buscar' && <HabitacionBuscarPorTipo />}

      {pantalla === 'disponibilidad' && <HabitacionDisponibilidad />}

      {pantalla === 'asignar' && (
        <HabitacionAsignar
          onSuccess={() => {
            cargarHabitaciones();
            setPantalla('listar');
          }}
        />
      )}

      {pantalla === 'detalle' && habitacionSeleccionada && (
        <HabitacionDetalle habitacion={habitacionSeleccionada} onBack={volverAlListado} />
      )}
    </div>
  );
}
