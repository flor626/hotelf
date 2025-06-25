const API_URL = 'http://127.0.0.1:8000/api';

export async function listarReservasPorClienteId(clienteId) {
  const res = await fetch(`${API_URL}/clientes/${clienteId}/reservas`);
  if (!res.ok) throw new Error('No se pudieron obtener las reservas');

  const data = await res.json();

  // ✅ Asegurar que todos los precios sean numéricos
  return data.map((reserva) => ({
    ...reserva,
    precio: parseFloat(reserva.precio ?? 0),
  }));
}

export async function listarClientes() {
  const res = await fetch(`${API_URL}/clientes`);
  return res.json();
}

export async function obtenerClientePorId(id) {
  const res = await fetch(`${API_URL}/clientes/${id}`);
  if (!res.ok) throw new Error('Cliente no encontrado');
  return res.json();
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

  return res.json();
}

export async function registrarCliente(data) {
  const res = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function actualizarCliente(id, data) {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
