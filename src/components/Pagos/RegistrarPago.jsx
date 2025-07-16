import React, { useState, useEffect } from 'react';

export default function RegistrarPago({ reserva, onRegistrar, onVolver }) {
  const [form, setForm] = useState({
    dni: '',
    nombre: '',
    apellidos: '',
    fecha_pago: '',
    metodo_pago: 'efectivo',
  });

  const [error, setError] = useState('');

  // Prellenar datos del cliente cuando se abra el modal
  useEffect(() => {
    if (reserva && reserva.cliente) {
      setForm((f) => ({
        ...f,
        dni: reserva.cliente.dni || '',
        nombre: reserva.cliente.nombre || '',
        apellidos: reserva.cliente.apellidos || '',
      }));
    }
  }, [reserva]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.dni || !form.fecha_pago || !form.metodo_pago) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      await onRegistrar({
        ...form,
        id_reserva: reserva?.id, // Incluye el id_reserva
      });
      setError('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('No se pudo registrar el pago');
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 8,
          width: '90%',
          maxWidth: 400,
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        }}
      >
        <h4>Registrar Pago para Reserva #{reserva ? reserva.id : ''}</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">DNI del Cliente</label>
            <input
              type="text"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              className="form-control"
              maxLength="8"
              required
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              className="form-control"
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={form.apellidos}
              className="form-control"
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de Pago</label>
            <input
              type="date"
              name="fecha_pago"
              value={form.fecha_pago}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Método de Pago</label>
            <select
              name="metodo_pago"
              value={form.metodo_pago}
              onChange={handleChange}
              className="form-select"
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              Registrar
            </button>
            <button type="button" className="btn btn-secondary" onClick={onVolver}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
