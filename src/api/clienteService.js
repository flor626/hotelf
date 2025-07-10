const API_URL = import.meta.env.VITE_API_URL;
 // Usa el proxy de Vite

// Manejo de errores para respuestas no JSON
async function safeJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    // Aquí estamos utilizando 'err' para proporcionar más contexto sobre el error.
    throw new Error(`Respuesta inesperada del servidor: ${text}. Error: ${err.message}`);
  }
}


export async function listarReservasPorClienteId(clienteId) {
  const res = await fetch(`${API_URL}/clientes/${clienteId}/reservas`);
  if (!res.ok) throw new Error('No se pudieron obtener las reservas');
  const data = await safeJson(res);
  return data.map((reserva) => ({
    ...reserva,
    precio: parseFloat(reserva.precio ?? 0),
  }));
}

export async function listarClientes() {
  const res = await fetch(`${API_URL}/clientes`);
  if (!res.ok) throw new Error('No se pudieron listar los clientes');
  return safeJson(res);
}

export async function obtenerClientePorId(id) {
  const res = await fetch(`${API_URL}/clientes/${id}`);
  if (!res.ok) throw new Error('Cliente no encontrado');
  return safeJson(res);
}

export async function buscarClientePorDni(dni) {
  const res = await fetch(`${API_URL}/clientes/${dni}/buscar`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Cliente no encontrado');
  }

  return safeJson(res);
}

export async function registrarCliente(data) {
  const res = await fetch(`${API_URL}/registro-cliente`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text();
    throw new Error('Respuesta inesperada del servidor: ' + text.slice(0, 100));
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.mensaje || 'Error al registrar');
  }

  return res.json();
}



export async function actualizarCliente(id, data) {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await safeJson(res);
    throw new Error(error.mensaje || 'Error al actualizar el cliente');
  }

  return safeJson(res);
}
