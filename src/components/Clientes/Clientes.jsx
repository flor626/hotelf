import React, { useEffect, useState } from 'react';
import { listarClientes } from '../../api/clienteService';
import ClienteRegistrar from './ClienteRegistrar';
import ClienteActualizar from './ClienteActualizar';
import BuscarClienteDNI from './BuscarClienteDNI';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [pantalla, setPantalla] = useState('listar');
  const [clienteEditar, setClienteEditar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pantalla === 'listar') {
      cargarClientes();
    }
  }, [pantalla]);

  const cargarClientes = async () => {
    try {
      setLoading(true);
      const data = await listarClientes();
      setClientes(data);
    } catch (err) {
      alert('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (cliente) => {
    setClienteEditar(cliente);
    setPantalla('editar');
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestión de Clientes</h2>

      <div className="mb-4 d-flex gap-2 flex-wrap">
        <button className="btn btn-primary" onClick={() => setPantalla('listar')}>
          <i className="bi bi-list"></i> Listar Clientes
        </button>
        <button className="btn btn-success" onClick={() => setPantalla('registrar')}>
          <i className="bi bi-plus-circle"></i> Registrar Cliente
        </button>
        <button className="btn btn-info" onClick={() => setPantalla('buscar')}>
          <i className="bi bi-search"></i> Buscar por DNI
        </button>
        <button className="btn btn-outline-secondary" onClick={cargarClientes}>
    <i className="bi bi-arrow-clockwise"></i> Actualizar Lista
  </button>
      </div>

      {pantalla === 'listar' && (
        <>
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status" />
              <div>Cargando clientes...</div>
            </div>
          ) : clientes.length === 0 ? (
            <div className="alert alert-warning text-center">
              No hay clientes registrados.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>DNI</th>
                    <th>Celular</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.apellidos}</td>
                      <td>{cliente.dni}</td>
                      <td>{cliente.celular}</td>
                      <td>{cliente.telefono || '-'}</td>
                      <td>{cliente.direccion || '-'}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleEditar(cliente)}
                          title="Editar cliente"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {pantalla === 'registrar' && (
        <ClienteRegistrar onVolver={() => setPantalla('listar')} />
      )}

      {pantalla === 'editar' && clienteEditar && (
        <ClienteActualizar cliente={clienteEditar} onVolver={() => setPantalla('listar')} />
      )}

      {pantalla === 'buscar' && (
        <BuscarClienteDNI onVolver={() => setPantalla('listar')} onEditar={handleEditar} />
      )}
    </div>
  );
}
