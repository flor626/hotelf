import React from 'react';

export default function HabitacionDetalle({ habitacion, onBack }) {
  if (!habitacion) return null;

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={onBack} style={{ marginBottom: '1rem' }}>← Volver</button>
      <h2>Habitación {habitacion.numero}</h2>
      {habitacion.imagen && (
        <img 
          src={habitacion.imagen} 
          alt={`Habitación ${habitacion.numero}`} 
          style={{ width: '100%', maxWidth: '400px', objectFit: 'cover', marginBottom: '1rem' }} 
        />
      )}
      <p><strong>Tipo:</strong> {habitacion.tipo}</p>
      <p><strong>Precio:</strong> S/. {habitacion.precio}</p>
      <p><strong>Capacidad:</strong> {habitacion.capacidad} personas</p>
      <p><strong>Descripción:</strong> {habitacion.descripcion || 'No disponible'}</p>
      <p><strong>Estado:</strong> {habitacion.estado}</p>
      <p><strong>Creada:</strong> {new Date(habitacion.created_at).toLocaleString()}</p>
      <p><strong>Actualizada:</strong> {new Date(habitacion.updated_at).toLocaleString()}</p>
    </div>
  );
}
