// src/api/checkinoutService.js
const API_URL = import.meta.env.VITE_API_URL;
/**
 * Registrar un nuevo check-in para una reserva
 * @param {number} id_reserva
 */
export async function registrarCheckin(id_reserva) {
  const res = await fetch(`${API_URL}/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_reserva }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || 'Error al registrar check-in');
  }

  return res.json();
}

/**
 * Registrar un nuevo check-out para una reserva
 * @param {number} id_reserva
 */
export async function registrarCheckout(id_reserva) {
  const res = await fetch(`${API_URL}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_reserva }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || 'Error al registrar check-out');
  }

  return res.json();
}

/**
 * Obtener historial completo de check-in y check-out
 */
export async function obtenerHistorialCheckinCheckout() {
  const res = await fetch(`${API_URL}/checkinout/historial`);

  if (!res.ok) {
    throw new Error('No se pudo obtener el historial');
  }

  return res.json();
}

/**
 * Listar check-ins/check-outs por cliente (si decides implementar este endpoint)
 */
export async function obtenerHistorialPorCliente(clienteId) {
  const res = await fetch(`${API_URL}/clientes/${clienteId}/checkinout`);

  if (!res.ok) {
    throw new Error('No se pudo obtener el historial del cliente');
  }

  return res.json();
}
