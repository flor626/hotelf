// src/api/reservaService.js
const API_URL = import.meta.env.VITE_API_URL;
//const API_URL = 'http://127.0.0.1:8000/api';

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

export async function buscarClientePorDni(dni) {
  const res = await fetch(`${API_URL}/clientes/buscar-por-dni?dni=${dni}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.mensaje || 'Error al buscar el cliente');
  }
  return res.json();
}





export const serviciosPorReserva = async (idReserva) => {
  try {
    const response = await fetch(`${API_URL}/reserva-servicios/${idReserva}`);
    if (!response.ok) throw new Error("Error al obtener servicios");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener servicios extras de la reserva:", error);
    return [];
  }
};