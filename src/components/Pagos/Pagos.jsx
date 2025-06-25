//componentes/Pagos/Pagos.jsx
import React, { useEffect, useState } from 'react';
import { listarPagos, registrarPago, obtenerPagoPorId, actualizarPago, eliminarPago } from '../../api/pago';
import ActualizarPago from './ActualizarPago';
import BuscarPago from './BuscarPago';
import RegistrarPago from './RegistrarPago';

const Pagos = () => {
  const [pagos, setPagos] = useState([]);
  const [pantalla, setPantalla] = useState('listar');
  const [idPago, setIdPago] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (pantalla === 'listar') {
      cargarPagos();
    }
  }, [pantalla]);

  const cargarPagos = async () => {
    try {
      setLoading(true);
      const data = await listarPagos();
      setPagos(data);
    } catch (error) {
      alert('Error al cargar los pagos');
    } finally {
      setLoading(false);
    }
  };

  const manejarRegistrarPago = async (data) => {
    try {
      const nuevoPago = await registrarPago(data);
      setPagos([...pagos, nuevoPago]);
      setMensaje('Pago registrado exitosamente.');
      setPantalla('listar');
    } catch (error) {
      setMensaje('Error al registrar el pago.');
    }
  };

  const manejarActualizarPago = async (id, data) => {
    try {
      const pagoActualizado = await actualizarPago(id, data);
      setPagos(pagos.map(pago => (pago.id === id ? pagoActualizado : pago)));
      setMensaje('Pago actualizado exitosamente.');
      setPantalla('listar');
    } catch (error) {
      setMensaje('Error al actualizar el pago.');
    }
  };

  const manejarEliminarPago = async (id) => {
    try {
      await eliminarPago(id);
      setPagos(pagos.filter(pago => pago.id !== id));
      setMensaje('Pago eliminado exitosamente.');
    } catch (error) {
      setMensaje('Error al eliminar el pago.');
    }
  };

  const handleEditar = (id) => {
    setIdPago(id);
    setPantalla('editar');
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestión de Pagos</h2>

      <div className="mb-4 d-flex gap-2 flex-wrap">
        <button className="btn btn-primary" onClick={() => setPantalla('listar')}>
          <i className="bi bi-list"></i> Listar Pagos
        </button>
        <button className="btn btn-success" onClick={() => setPantalla('registrar')}>
          <i className="bi bi-plus-circle"></i> Registrar Pago
        </button>
        <button className="btn btn-info" onClick={() => setPantalla('buscar')}>
          <i className="bi bi-search"></i> Buscar Pago
        </button>
        <button className="btn btn-outline-secondary" onClick={cargarPagos}>
          <i className="bi bi-arrow-clockwise"></i> Actualizar Lista
        </button>
      </div>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {pantalla === 'listar' && (
        <>
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status" />
              <div>Cargando pagos...</div>
            </div>
          ) : pagos.length === 0 ? (
            <div className="alert alert-warning text-center">
              No hay pagos registrados.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Nombre</th>
                    <th>Monto</th>
                    <th>Fecha de Pago</th>
                    <th>Método de Pago</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((pago) => (
                    <tr key={pago.id}>
                      <td>{pago.cliente}</td>
                      <td>{pago.monto}</td>
                      <td>{pago.fecha_pago}</td>
                      <td>{pago.metodo_pago}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleEditar(pago.id)}
                          title="Editar pago"
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
        <RegistrarPago onRegistrar={manejarRegistrarPago} onVolver={() => setPantalla('listar')} />
      )}

      {pantalla === 'editar' && idPago && (
        <ActualizarPago
          idPago={idPago}
          onActualizar={manejarActualizarPago}
          onVolver={() => setPantalla('listar')}
        />
      )}

      {pantalla === 'buscar' && (
        <BuscarPago onVolver={() => setPantalla('listar')} />
      )}
    </div>
  );
};

export default Pagos;
