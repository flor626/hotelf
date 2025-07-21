import React, { useState } from 'react';
import { registrarHabitacion } from '../../api/habitacionService';

export default function HabitacionForm({ onSuccess }) {
  const [form, setForm] = useState({
    numero: '',
    tipo: 'simple',
    precio: '',
    capacidad: '',
    descripcion: '',
    estado: 'disponible',
  });

  const [imagen, setImagen] = useState(null);
  const [capacidadEditable, setCapacidadEditable] = useState(false); // Controla si se puede editar capacidad

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tipo') {
      let nuevaCapacidad = '';
      let editable = true;

      if (value === 'simple') {
        nuevaCapacidad = 1;
        editable = false;
      } else if (value === 'doble') {
        nuevaCapacidad = 2;
        editable = false;
      } else if (value === 'suite') {
        nuevaCapacidad = '';
        editable = true;
      }

      setForm((prev) => ({
        ...prev,
        tipo: value,
        capacidad: nuevaCapacidad,
      }));

      setCapacidadEditable(editable);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registrarHabitacion({
        ...form,
        capacidad: Number(form.capacidad), // asegurar número
        imagen,
      });

      if (response.habitacion) {
        alert('✅ Habitación registrada exitosamente');
        onSuccess(); // Recargar lista
      } else {
        alert('⚠️ Error: ' + (response.mensaje || 'No se registró la habitación'));
        console.error(response);
      }
    } catch (error) {
      alert('❌ Error al registrar habitación: ' + error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light" encType="multipart/form-data">
      <h4 className="mb-4">Registrar Nueva Habitación</h4>

      <div className="mb-3">
        <label className="form-label">Número de Habitación</label>
        <input
          name="numero"
          className="form-control"
          placeholder="Ej. 101"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo</label>
        <select
          name="tipo"
          className="form-select"
          onChange={handleChange}
          value={form.tipo}
          required
        >
          <option value="simple">Simple</option>
          <option value="doble">Doble</option>
          <option value="suite">Suite</option>
        </select>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Precio</label>
          <input
            name="precio"
            className="form-control"
            type="number"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Capacidad</label>
          <input
            name="capacidad"
            className="form-control"
            type="number"
            onChange={handleChange}
            value={form.capacidad}
            readOnly={!capacidadEditable} // Importante: no usar disabled
            required
            min={1}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          name="descripcion"
          className="form-control"
          rows="3"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select
          name="estado"
          className="form-select"
          onChange={handleChange}
          value={form.estado}
        >
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
          <option value="mantenimiento">Mantenimiento</option>
          <option value="inactiva">Inactiva</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label">Imagen</label>
        <input
          type="file"
          name="imagen"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        <i className="bi bi-save me-2"></i> Registrar Habitación
      </button>
    </form>
  );
}
