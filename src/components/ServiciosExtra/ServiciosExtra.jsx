import React, { useEffect, useState } from 'react';
import { listarServiciosExtra } from '../../api/servicioService';

import RegistrarServicioExtra from './RegistrarServicioExtra';
import AsignarServicioReserva from './AsignarServicioReserva';
import ActualizarServicioExtra from './ActualizarServicioExtra';

function ServiciosExtra() {
  const [servicios, setServicios] = useState([]);
  const [pantalla, setPantalla] = useState('listar'); // listar, registrar, asignar
  const [servicioEditandoId, setServicioEditandoId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await listarServiciosExtra();
      setServicios(data);
    }
    fetchData();
  }, [pantalla]);

  const handleActualizarExito = () => {
    setPantalla('listar');
    setServicioEditandoId(null);
  };

  return (
    <div className="p-4">
      <div className="mb-4 d-flex gap-2 flex-wrap">
        <button className="btn btn-primary" onClick={() => setPantalla('listar')}>
          <i className="bi bi-list"></i> Listar Servicios Extra
        </button>
        <button className="btn btn-success" onClick={() => setPantalla('registrar')}>
          <i className="bi bi-plus-circle"></i> Registrar Servicio Extra
        </button>
        <button className="btn btn-info" onClick={() => setPantalla('asignar')}>
          <i className="bi bi-link"></i> Asignar Servicio a Reserva
        </button>
      </div>

      {pantalla === 'listar' && (
  <div className="d-flex flex-wrap gap-3">
    {servicios.map((servicio) => (
      <div
        key={servicio.id}
        className="card shadow-sm border-0"
        style={{ width: '18rem' }}
      >
        <div className="card-body">
          {servicioEditandoId === servicio.id ? (
            <ActualizarServicioExtra
              servicio={servicio}
              onSuccess={handleActualizarExito}
            />
          ) : (
            <>
              <h5 className="card-title">{servicio.nombre}</h5>
              <p className="card-text"><strong>Precio:</strong> S/ {servicio.precio}</p>
              <p className="card-text text-muted">{servicio.descripcion}</p>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => setServicioEditandoId(servicio.id)}
              >
                <i className="bi bi-pencil"></i> Editar
              </button>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
)}



      {pantalla === 'registrar' && <RegistrarServicioExtra onSuccess={() => setPantalla('listar')} />}
      {pantalla === 'asignar' && <AsignarServicioReserva onSuccess={() => setPantalla('listar')} />}
    </div>
  );
}

export default ServiciosExtra;
