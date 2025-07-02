// src/api/habitacionService.js
const API_URL = '/api';

export async function listarHabitaciones() {
  const res = await fetch(`${API_URL}/habitaciones`);
  return res.json();
}

export async function registrarHabitacion(data) {
  const res = await fetch(`${API_URL}/habitaciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function actualizarHabitacion(id, data) {
  const res = await fetch(`${API_URL}/habitaciones/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function buscarPorTipo(tipo) {
  const res = await fetch(`${API_URL}/habitaciones/buscar-por-tipo?tipo=${tipo}`);
  return res.json();
}

export async function habitacionesDisponibles(fechaInicio, fechaFin) {
  const params = new URLSearchParams({ fechaInicio, fechaFin });
  const res = await fetch(`${API_URL}/habitaciones/disponibles?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
}

export async function asignarHabitacion(data) {
  try {
    const response = await axios.post('/api/habitaciones/asignar', data);
    return response.data; // <-- Importante: solo devolver data para usar en tu componente
  } catch (error) {
    if (error.response) {
      return error.response.data; // Devolver el error del backend para manejarlo
    } else {
      return { mensaje: 'Error desconocido' };
    }}}

export async function disponibilidadPorHabitacion(id, fechaInicio, fechaFin) {
  let url = `${API_URL}/habitaciones/${id}/disponibilidad?fechaInicio=${fechaInicio}`;
  if(fechaFin) url += `&fechaFin=${fechaFin}`;

  const res = await fetch(url);
  return res.json();
}
