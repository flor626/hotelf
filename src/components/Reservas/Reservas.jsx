import React, { useEffect, useState } from 'react';
import { listarReservas, crearReserva, cancelarReserva } from '../../api/reservaService';
import RegistrarPago from '../Pagos/RegistrarPago'; // Importa el componente
import { registrarPago } from '../../api/pago'; // importa la función para registrar pago

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

  // Estado para mostrar formulario de pago y la reserva a pagar
  const [mostrarPago, setMostrarPago] = useState(false);
  const [reservaPago, setReservaPago] = useState(null);

  useEffect(() => {
    if (pantalla === 'listar') cargarReservas();
  }, [pantalla]);

  const cargarReservas = async (fecha = null) => {
    try {
      setLoading(true);
      const data = await listarReservas(fecha);
      setReservas(data);
    } catch (error) {
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
      alert('Error al cancelar reserva');
    }
  };

  // Función para registrar pago llamando a la API y actualizar la vista
  const handleRegistrarPago = async (formPago) => {
    try {
      // Enviar datos de pago + id_reserva
      await registrarPago({
        ...formPago,
        id_reserva: reservaPago.id,
      });
      alert('Pago registrado correctamente');
      setMostrarPago(false);
      setReservaPago(null);
      cargarReservas();
    } catch (error) {
      alert('Error al registrar el pago');
    }
  };

  // Abrir formulario para registrar pago
  const abrirPago = (reserva) => {
    setReservaPago(reserva);
    setMostrarPago(true);
  };

  // Cerrar formulario de pago sin registrar
  const cerrarPago = () => {
    setMostrarPago(false);
    setReservaPago(null);
  };

  const handleFiltrarFecha = () => {
    cargarReservas(fechaFiltro);
    setPantalla('listar');
  };

  // Función para asignar color según estado
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
                      <p><strong>ID Cliente:</strong> {reserva.id_cliente}</p>
                      <p><strong>ID Habitación:</strong> {reserva.id_habitacion}</p>
                      <p><strong>Inicio:</strong> {reserva.fecha_inicio}</p>
                      <p><strong>Fin:</strong> {reserva.fecha_fin}</p>
                      <p>
                        <strong>Estado:</strong>{' '}
                        <span className={`badge bg-${colorEstado(reserva.estado)}`}>
                          {reserva.estado}
                        </span>
                      </p>

                      {reserva.estado !== 'cancelada' && (
                        <button
                          className="btn btn-outline-danger mt-2"
                          onClick={() => handleCancelar(reserva.id)}
                        >
                          Cancelar
                        </button>
                      )}

                      {/* Mostrar botón Registrar Pago solo si NO está cancelada ni finalizada */}
                      {reserva.estado !== 'cancelada' && reserva.estado !== 'finalizada' && (
                        <button
                          className="btn btn-outline-primary mt-2 ms-2"
                          onClick={() => abrirPago(reserva)}
                        >
                          Registrar Pago
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

      {/* Formulario para registrar pago, se muestra sólo si mostrarPago = true */}
      {mostrarPago && (
        <RegistrarPago
          reserva={reservaPago}
          onRegistrar={handleRegistrarPago}
          onVolver={cerrarPago}
        />
      )}
    </div>
  );
}
