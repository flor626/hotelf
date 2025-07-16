import React, { useState } from 'react';
import { buscarClientePorDni, listarReservasPorClienteId } from '../../api/clienteService';

export default function BuscarClienteDNI({ onEditar, onVolver }) {
  const [dni, setDni] = useState('');
  const [cliente, setCliente] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!dni.trim()) {
      alert('Por favor ingrese un DNI válido');
      return;
    }

    setLoading(true);
    setCliente(null);
    setReservas([]);
    setNotFound(false);

    try {
      const data = await buscarClientePorDni(dni.trim());
      setCliente(data);

      const reservasData = await listarReservasPorClienteId(data.id);
      setReservas(reservasData);
    } catch (error) {
      setNotFound(true);
    }

    setLoading(false);
  };

  const formatoRangoFecha = (inicio, fin) => {
    const fInicio = new Date(inicio);
    const fFin = new Date(fin);

    return `${fInicio.toLocaleDateString()} ${fInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${fFin.toLocaleDateString()} ${fFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const formatearPrecio = (valor) => {
    const numero = parseFloat(valor);
    return isNaN(numero) ? '-' : `S/. ${numero.toFixed(2)}`;
  };

  return (
    <div style={{ margin: '2rem auto', maxWidth: 900, display: 'flex', gap: '2rem' }}>
      {/* Panel de búsqueda */}
      <div style={{ flex: 1, padding: '1.5rem', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2>Buscar Cliente por DNI</h2>
        <div style={{ display: 'flex', margin: '1rem 0' }}>
          <input
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="Ingrese DNI"
            style={{ flex: 1, padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px 0 0 4px' }}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: loading ? '#95a5a6' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              cursor: loading ? 'default' : 'pointer',
            }}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {cliente && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3>Datos del Cliente</h3>
            {['nombre', 'apellidos', 'dni', 'celular', 'telefono', 'direccion'].map((field) => (
              <p key={field}>
                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {cliente[field] || '-'}
              </p>
            ))}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <button onClick={() => onEditar(cliente)} style={{ flex: 1, backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '5px' }}>
                Editar
              </button>
              <button onClick={onVolver} style={{ flex: 1, backgroundColor: '#7f8c8d', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '5px' }}>
                Volver
              </button>
            </div>
          </div>
        )}

        {notFound && (
          <div style={{ marginTop: '1rem', padding: '1rem', textAlign: 'center', color: '#e74c3c', backgroundColor: '#fdecea', borderRadius: '8px' }}>
            <p>No se encontró ningún cliente con ese DNI.</p>
            <button
              onClick={onVolver}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Volver
            </button>
          </div>
        )}
      </div>

      {/* Panel de reservas */}
      <div style={{ flex: 1 }}>
        <h3>Reservas del Cliente</h3>
        {loading ? (
          <p>Cargando reservas...</p>
        ) : reservas.length === 0 ? (
          <p>No hay reservas para este cliente.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
              <tr>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Habitación</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id}>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                    {formatoRangoFecha(r.fecha_inicio, r.fecha_fin)}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{r.estado || 'Pendiente'}</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{r.habitacion?.numero || 'N/A'}</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{formatearPrecio(r.habitacion?.precio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
