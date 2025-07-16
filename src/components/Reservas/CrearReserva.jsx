import React, { useState, useEffect } from 'react';
import { crearReserva, buscarClientePorDni, listarHabitaciones } from '../../api/reservaService';

export default function CrearReserva({ onReservaCreada }) {
  const [form, setForm] = useState({
    dni: '',
    id_habitacion: '',
    fecha_inicio: '',
    fecha_fin: '',
  });
  const [cliente, setCliente] = useState(null);
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    const fetchHabitaciones = async () => {
      const data = await listarHabitaciones();
      setHabitaciones(data);
    };
    fetchHabitaciones();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBuscarCliente = async () => {
    try {
      const clienteData = await buscarClientePorDni(form.dni);
      setCliente(clienteData);
    } catch (err) {
      alert(err.message);
      setCliente(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevaReserva = await crearReserva({
        id_cliente: cliente.id, // Asumiendo que el cliente tiene un id
        id_habitacion: form.id_habitacion,
        fecha_inicio: form.fecha_inicio,
        fecha_fin: form.fecha_fin,
      });
      alert('Reserva creada exitosamente');
      onReservaCreada(nuevaReserva);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Crear Nueva Reserva</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="dni"
          value={form.dni}
          onChange={handleChange}
          placeholder="DNI Cliente"
          className="border p-2 rounded"
          required
        />
        <button type="button" onClick={handleBuscarCliente} className="bg-blue-500 text-white py-2 rounded">
          Verificar
        </button>
        {cliente && (
          <div className="col-span-2">
            <p>Nombre: {cliente.nombre} {cliente.apellidos}</p>
          </div>
        )}
        <select
          name="id_habitacion"
          value={form.id_habitacion}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Seleccionar Habitación</option>
          {habitaciones.map(habitacion => (
            <option key={habitacion.id} value={habitacion.id}>
              {habitacion.numero} - {habitacion.tipo}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="fecha_inicio"
          value={form.fecha_inicio}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="fecha_fin"
          value={form.fecha_fin}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="col-span-2 bg-green-500 text-white py-2 rounded">Guardar Reserva</button>
      </div>
    </form>
  );
}
