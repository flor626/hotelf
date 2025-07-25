const API_URL = import.meta.env.VITE_API_URL;
//const API_URL = 'http://127.0.0.1:8000/api';

export async function listarPagos() {
  const res = await fetch(`${API_URL}/pagos`);

  if (!res.ok) throw new Error('No se pudieron obtener los pagos');
  return res.json();
}

export async function registrarPago(data) {
  const res = await fetch(`${API_URL}/pagos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Error al registrar el pago');
  return res.json();
}


export async function obtenerPagoPorId(id) {
  const res = await fetch(`${API_URL}/pagos/${id}`);
  if (!res.ok) throw new Error('Pago no encontrado');
  return res.json();
}

export async function actualizarPago(id, data) {
  const res = await fetch(`${API_URL}/pagos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function eliminarPago(id) {
  const res = await fetch(`${API_URL}/pagos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar el pago');
}

export const obtenerPagoPorReserva = async (reservaId) => {
  try {
    const response = await axios.get(`${API_URL}/pagos/reserva/${reservaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago por reserva:", error);
    return null;
  }
};