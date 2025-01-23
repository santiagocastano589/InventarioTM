import React, { useState, useEffect } from 'react';
import './Categorias.css';
import { Header } from '../../Layout/Header/Header';


export const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCategoria, setNewCategoria] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    fetch('http://localhost:3000/allCategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoria({ ...newCategoria, [name]: value });
  };

  const handleCreateCategoria = () => {
    fetch('http://localhost:3000/newCategoria', {
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
              <h4>Productos:</h4>
              {categoria.productos.length > 0 ? (
                <ul>
                  {categoria.productos.map((producto) => (
                    <li key={producto.id}>
                      <strong>{producto.nombre}:</strong> {producto.descripcion}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay productos registrados.</p>
              )}
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
    {/* Formulario para agregar una nueva categoría */}
    {showForm && (
        <div className="form-container">
          <h3>Agregar Nueva Categoría</h3>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newCategoria.nombre}
            onChange={handleInputChange}
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={newCategoria.descripcion}
            onChange={handleInputChange}
          />
          <button onClick={handleCreateCategoria}>Guardar</button>
        </div>
      )}
    </>
  );
};




