import React, { useState, useEffect } from 'react';
import './Categorias.css';
import { Header } from '../../Layout/Header/Header';


export const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCategoria, setNewCategoria] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    fetch('https://inventariotm.onrender.com/allCategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoria({ ...newCategoria, [name]: value });
  };

  const [error, setError] = useState('');

  const handleCreateCategoria = () => {
    if (!newCategoria.nombre.trim() || !newCategoria.descripcion.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }
  
    setError(''); // Limpiar el mensaje de error si pasa la validación
  
    fetch('https://inventariotm.onrender.com/newCategoria', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategoria),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategorias([...categorias, data]);
        setShowForm(false);
        setNewCategoria({ nombre: '', descripcion: '' });
      })
      .catch((error) => console.error('Error:', error));
  };

  

  return (
    <>
    <Header/>
    {showForm && (
        <div className="form-container">
          <h3>Agregar Nueva Categoría</h3>
          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newCategoria.nombre}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={newCategoria.descripcion}
            onChange={handleInputChange}
            required
          />
          <div className="botones-form">
            <button onClick={handleCreateCategoria}>Guardar</button>
            <button onClick={() => setShowForm(!showForm)} className='cerrarForm'>Cerrar</button>
          </div>
        </div>
      )}
    <div className="container">
      {categorias.map((categoria) => (
        <div className="card-category" key={categoria.id}>
          <div className="face face1">
            <div className="content">
              <i className="bi bi-folder-fill"></i>
              <h3>{categoria.nombre}</h3>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              <p>{categoria.descripcion}</p>
              <p>Cantidad de productos: {categoria.productos.length}</p>
               
              {/* {categoria.productos.length > 0 ? (
                <ul>
                  {categoria.productos.map((producto) => (
                      <p>serial: {producto.serial}</p>
                  ))}
                </ul>
              ) : (
                <p>No hay productos registrados.</p>
              )} */}
            </div>
          </div>
        </div>
      ))}

      {/* Tarjeta para crear una nueva categoría */}
      <div className="card create-card" onClick={() => setShowForm(!showForm)}>
        <div className="face face1">
          <div className="content">
            <i className="bi bi-plus-circle-fill"></i>
            <h3>Crear nueva categoría</h3>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};
