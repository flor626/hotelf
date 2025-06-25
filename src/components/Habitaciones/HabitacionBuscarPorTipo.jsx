import React, { useState } from 'react';
import { buscarPorTipo } from '../../api/habitacionService';
import HabitacionCard from './HabitacionCard';

export default function HabitacionBuscarPorTipo() {
  const [tipo, setTipo] = useState('simple');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    setResultados([]);

    try {
      const res = await buscarPorTipo(tipo);
      if (res.habitaciones && res.habitaciones.length > 0) {
        setResultados(res.habitaciones);
      } else {
        setMensaje('No se encontraron habitaciones de este tipo.');
      }
    } catch (error) {
      console.error(error);
      setMensaje('Ocurrió un error al buscar habitaciones.');
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '1rem' }}>🔍 Buscar Habitación por Tipo</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <select
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        >
          <option value="simple">Simple</option>
          <option value="doble">Doble</option>
          <option value="suite">Suite</option>
        </select>
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Buscar
        </button>
      </form>

      {loading && <p>Cargando habitaciones...</p>}
      {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {resultados.map(h => (
          <HabitacionCard key={h.id} habitacion={h} />
        ))}
      </div>
    </div>
  );
}
