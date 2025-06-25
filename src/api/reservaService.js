// src/api/reservaService.js

const API_URL = 'http://127.0.0.1:8000/api/reservas';

// Listar todas las reservas o filtrar por fecha
export async function listarReservas(fecha = null) {
  let url = API_URL;
  if (fecha) {
    const params = new URLSearchParams({ fecha });
    url += `?${params.toString()}`;
  }

  const res = await fetch(url);
  // Validar que la respuesta sea correcta
  if (!res.ok) throw new Error('Error al obtener reservas');
  
  const data = await res.json();
  // Aseguramos que siempre retornamos un array (vacío si no hay datos)
  return Array.isArray(data) ? data : [];
}

// Crear nueva reserva
export async function crearReserva(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.mensaje || 'Error al crear la reserva');
  }

  return res.json();
}

// Cancelar reserva por ID
export async function cancelarReserva(id) {
  const url = `${API_URL}/${id}/cancelar`;
  const res = await fetch(url, {
    method: 'PATCH',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.mensaje || 'Error al cancelar la reserva');
  }

  return res.json();
}
