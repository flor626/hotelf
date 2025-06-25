// src/api/servicioService.js
const API_URL = 'http://127.0.0.1:8000/api';

// Listar servicios extra
export async function listarServiciosExtra() {
  const res = await fetch(`${API_URL}/servicios-extras`);
  return res.json();
}

// Registrar un nuevo servicio extra
export async function registrarServicioExtra(data) {
  const res = await fetch(`${API_URL}/servicios-extras`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Actualizar un servicio extra
export async function actualizarServicioExtra(id, data) {
  const res = await fetch(`${API_URL}/servicios-extras/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Asignar un servicio extra a una reserva
export async function asignarServicioAReserva(datos) {
  const response = await fetch(`${API_URL}/reserva-servicios-extras`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  if (!response.ok) throw new Error('Error en la solicitud');
  return await response.json();
}
