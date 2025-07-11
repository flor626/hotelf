// src/api/reservaService.js
const API_URL = import.meta.env.VITE_API_URL;

// Listar todas las reservas o filtrar por fecha
// En api/reservaService.js
export async function listarReservas(fecha = null) {
  let url = `${API_URL}/reservas?with=cliente,habitacion`;
  if (fecha) {
    url += `&fecha=${fecha}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener reservas');
  return await res.json();
}


// Crear nueva reserva
export async function crearReserva(data) {
  const res = await fetch(`${API_URL}/reservas`, {
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
