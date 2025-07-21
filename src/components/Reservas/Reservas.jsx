import React, { useEffect, useState } from 'react';
import {
  listarReservas,
  crearReserva,
  cancelarReserva,
} from '../../api/reservaService';
import {
  obtenerPagoPorReserva,
  registrarPago,
} from '../../api/pago';
import { serviciosPorReserva } from '../../api/reservaService';
import RegistrarPago from '../Pagos/RegistrarPago';

export default function Reservas() {
  const [pantalla, setPantalla] = useState('listar');
  const [reservas, setReservas] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [form, setForm] = useState({
    id_cliente: '',
    id_habitacion: '',
    fecha_inicio: '',
    fecha_fin: '',
  });
  const [loading, setLoading] = useState(false);

  const [mostrarPago, setMostrarPago] = useState(false);
  const [reservaPago, setReservaPago] = useState(null);

  const [mostrarDetallePago, setMostrarDetallePago] = useState(false);
  const [reservaDetalle, setReservaDetalle] = useState(null);
  const [serviciosExtras, setServiciosExtras] = useState([]);
  const [detallePago, setDetallePago] = useState(null);

  // Mapa de iconos para servicios extras
  const iconosServicios = {
    "Masaje Relajante": "💆",
    "Lavandería": "🧺",
    "Estacionamiento": "🅿️",
    // Agrega aquí más servicios e íconos si quieres
  };

  useEffect(() => {
    if (pantalla === 'listar') cargarReservas();
  }, [pantalla]);

  const cargarReservas = async (fecha = null) => {
    try {
      setLoading(true);
      const data = await listarReservas(fecha);
      setReservas(data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar reservas');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCrearReserva = async (e) => {
    e.preventDefault();
    try {
      await crearReserva(form);
      alert('Reserva creada correctamente');
      setForm({
        id_cliente: '',
        id_habitacion: '',
        fecha_inicio: '',
        fecha_fin: '',
      });
      setPantalla('listar');
    } catch (error) {
      console.error(error);
      alert('Error al crear reserva');
    }
  };

  const handleCancelar = async (id) => {
    if (!window.confirm('¿Está seguro que desea cancelar esta reserva?')) return;
    try {
      await cancelarReserva(id);
      alert('Reserva cancelada');
      cargarReservas();
    } catch (error) {
      console.error(error);
      alert('Error al cancelar reserva');
    }
  };

  const handleRegistrarPago = async (formPago) => {
    try {
      await registrarPago({
        ...formPago,
        id_reserva: reservaPago.id,
      });
      alert('Pago registrado correctamente');
      setMostrarPago(false);
      setReservaPago(null);
      cargarReservas();
    } catch (error) {
      console.error(error);
      alert('Error al registrar el pago');
    }
  };

  const abrirPago = (reserva) => {
    setReservaPago(reserva);
    setMostrarPago(true);
  };

  const cerrarPago = () => {
    setMostrarPago(false);
    setReservaPago(null);
  };

  const abrirDetallePago = async (reserva) => {
    try {
      setReservaDetalle(reserva);

      // Obtener servicios extras de la reserva
      const servicios = await serviciosPorReserva(reserva.id);
      setServiciosExtras(servicios);

      // Obtener pago por reserva
      const pago = await obtenerPagoPorReserva(reserva.id);
      setDetallePago(pago);

      setMostrarDetallePago(true);
    } catch (error) {
      console.error(error);
      alert("Error al obtener detalles de la reserva");
    }
  };

  const cerrarDetallePago = () => {
    setReservaDetalle(null);
    setServiciosExtras([]);
    setDetallePago(null);
    setMostrarDetallePago(false);
  };

  const handleFiltrarFecha = () => {
    cargarReservas(fechaFiltro);
    setPantalla('listar');
  };

  const colorEstado = (estado) => {
    switch (estado) {
      case 'cancelada':
        return 'danger';
      case 'finalizada':
        return 'secondary';
      default:
        return 'success';
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Reservas</h2>

      <div className="mb-4 d-flex gap-2">
        <button className="btn btn-primary" onClick={() => setPantalla('listar')}>Listar Reservas</button>
        <button className="btn btn-success" onClick={() => setPantalla('crear')}>Crear Reserva</button>
        <button className="btn btn-info" onClick={() => setPantalla('filtrar')}>Filtrar por Fecha</button>
      </div>

      {pantalla === 'listar' && (
        <>
          {loading ? (
            <div className="alert alert-secondary">Cargando reservas...</div>
          ) : reservas.length === 0 ? (
            <div className="alert alert-warning">No hay reservas.</div>
          ) : (
            <div className="row">
              {reservas.map((reserva) => (
                <div className="col-md-4 mb-3" key={reserva.id}>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">Reserva #{reserva.id}</h5>
                      <p><strong>Cliente:</strong> {reserva.cliente?.nombre} {reserva.cliente?.apellidos}</p>
                      <p><strong>Habitación:</strong> N° {reserva.habitacion?.numero}</p>
                      <p><strong>Inicio:</strong> {reserva.fecha_inicio}</p>
                      <p><strong>Fin:</strong> {reserva.fecha_fin}</p>
                      <p>
                        <strong>Estado:</strong>{' '}
                        <span className={`badge bg-${colorEstado(reserva.estado)}`}>
                          {reserva.estado}
                        </span>
                      </p>

                      {reserva.estado !== 'cancelada' && reserva.estado !== 'finalizada' && (
                        <>
                          <button
                            className="btn btn-outline-danger mt-2"
                            onClick={() => handleCancelar(reserva.id)}
                          >
                            Cancelar
                          </button>
                          <button
                            className="btn btn-outline-primary mt-2 ms-2"
                            onClick={() => abrirPago(reserva)}
                          >
                            Registrar Pago
                          </button>
                        </>
                      )}

                      {reserva.estado === 'finalizada' && (
                        <button
                          className="btn btn-outline-info mt-2"
                          onClick={() => abrirDetallePago(reserva)}
                        >
                          Ver Detalles de Pago
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {pantalla === 'crear' && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="mb-3">Crear Nueva Reserva</h4>
            <form onSubmit={handleCrearReserva}>
              <div className="mb-3">
                <input
                  name="id_cliente"
                  className="form-control"
                  placeholder="ID Cliente"
                  value={form.id_cliente}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="id_habitacion"
                  className="form-control"
                  placeholder="ID Habitación"
                  value={form.id_habitacion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha Inicio</label>
                <input
                  type="date"
                  name="fecha_inicio"
                  className="form-control"
                  value={form.fecha_inicio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha Fin</label>
                <input
                  type="date"
                  name="fecha_fin"
                  className="form-control"
                  value={form.fecha_fin}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button className="btn btn-success" type="submit">Guardar Reserva</button>
            </form>
          </div>
        </div>
      )}

      {pantalla === 'filtrar' && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="mb-3">Filtrar Reservas por Fecha</h4>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                value={fechaFiltro}
                onChange={(e) => setFechaFiltro(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-info" onClick={handleFiltrarFecha}>Filtrar</button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setFechaFiltro('');
                  cargarReservas();
                  setPantalla('listar');
                }}
              >
                Limpiar Filtro
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarPago && (
        <RegistrarPago
          reserva={reservaPago}
          onRegistrar={handleRegistrarPago}
          onVolver={cerrarPago}
        />
      )}

      {/* Modal Detalle de Pago */}
      {mostrarDetallePago && reservaDetalle && (
        <div className="modal d-block" style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", justifyContent: "center", alignItems: "center",
          zIndex: 1050
        }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalle de la Reserva</h5>
                <button className="btn-close" onClick={cerrarDetallePago}></button>
              </div>
              <div className="modal-body">
                <p><strong>Cliente:</strong> {reservaDetalle.cliente?.nombre}</p>
                <p><strong>DNI:</strong> {reservaDetalle.cliente?.dni}</p>
                <p><strong>Habitación:</strong> {reservaDetalle.habitacion?.numero}</p>
                <p><strong>Precio Habitación:</strong> S/ {Number(reservaDetalle.habitacion?.precio).toFixed(2)}</p>
                <p><strong>Fecha Inicio:</strong> {reservaDetalle.fecha_inicio}</p>
                <p><strong>Fecha Fin:</strong> {reservaDetalle.fecha_fin}</p>

                <p><strong>Servicios Extras:</strong></p>
                <ul>
                  {serviciosExtras.length > 0 ? (
                    serviciosExtras.map((s, i) => (
                      <li key={i}>
                        {iconosServicios[s.nombre] || "🔹"} {s.nombre} - S/ {Number(s.precio).toFixed(2)}
                      </li>
                    ))
                  ) : (
                    <li>No se registraron servicios.</li>
                  )}
                </ul>

                <p><strong>Total:</strong> S/ {(
                  Number(reservaDetalle.habitacion?.precio || 0) +
                  serviciosExtras.reduce((acc, s) => acc + Number(s.precio), 0)
                ).toFixed(2)}</p>

                {detallePago && (
                  <p><strong>Fecha de pago:</strong> {new Date(detallePago.fecha_pago).toLocaleString()}</p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarDetallePago}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
