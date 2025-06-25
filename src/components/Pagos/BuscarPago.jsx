import React, { useState } from 'react';
import { obtenerPagoPorId } from '../../api/pago';

const BuscarPago = ({ setPantalla }) => {
  const [id, setId] = useState('');
  const [pago, setPago] = useState(null);
  const [error, setError] = useState('');

  const handleBuscar = async (e) => {
    e.preventDefault();
    setError('');
    setPago(null);

    try {
      const data = await obtenerPagoPorId(id);
      setPago(data);
    } catch (err) {
      setError('Pago no encontrado: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Buscar Pago</h2>
      <form onSubmit={handleBuscar}>
        <div className="mb-3">
          <label>ID Pago</label>
          <input
            type="text"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-info">Buscar</button>
        <button type="button" className="btn btn-secondary" onClick={() => setPantalla('listar')}>Cancelar</button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {pago && (
        <div className="mt-3">
          <h4>Detalles del Pago</h4>
          <p>ID: {pago.id}</p>
          <p>ID Reserva: {pago.id_reserva}</p>
          <p>Monto: {pago.monto}</p>
          <p>Fecha de Pago: {pago.fecha_pago}</p>
          <p>Método de Pago: {pago.metodo_pago}</p>
        </div>
      )}
    </div>
  );
};

export default BuscarPago;
