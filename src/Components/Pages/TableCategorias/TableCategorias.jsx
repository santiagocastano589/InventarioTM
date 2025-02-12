import React, { useState, useEffect } from 'react';
import "../../Table/Table.css";
import { Main } from '../../Layout/Main/Main';
import { Header } from '../../Layout/Header/Header';


export const TableCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [articlesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [updatedCategoria, setUpdatedCategoria] = useState({
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const response = await fetch("https://inventariotm.onrender.com/allCategorias");
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar los artículos:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (data) => {
    setModalData(data);
    setUpdatedCategoria({
      nombre: data.nombre,
      descripcion: data.descripcion,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const displayPage = () => {
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    return categorias.slice(start, end);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategoria((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateCategoria = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://inventariotm.onrender.com/updateCategoria/${modalData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategoria),
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        setCategorias((prevCategorias) =>
          prevCategorias.map((categoria) =>
            categoria.id === updatedCategory.id ? updatedCategory : categoria
          )
        );
        handleCloseModal();
      } else {
        alert('Error al actualizar la categoria');
      }
    } catch (error) {
      console.error('Error al actualizar la categoria:', error);
    }
  };


  const handleUpdateEstado = async (categoria) => {
    const confirmacion = window.confirm(`¿Está seguro de eliminar la categoría: ${categoria.nombre}?`);
  
    if (!confirmacion) return;
  
    try {
      const response = await fetch(`https://inventariotm.onrender.com/updateEstadoCategoria/${categoria.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const updatedCategoria = await response.json();
        setCategorias((prevCategorias) =>
          prevCategorias.map((cat) =>
            cat.id === updatedCategoria.id ? updatedCategoria : cat
          )
        );
  
        alert('✅ Categoría eliminada correctamente.');
      } else {
        alert('❌ Error al actualizar el estado de la categoría.');
      }
    } catch (error) {
      console.error('Error al actualizar el estado de la categoría:', error);
      alert('❌ Ocurrió un error inesperado.');
    }
  };
  


  return (
    <>
    <Main>
      <Header/>
      <h2>Categorias</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {displayPage().map((category) => (
            <React.Fragment key={category.id}>
              <tr>
                <td>{category.id}</td>
                <td>{category.nombre}</td>
                <td>{category.descripcion}</td>
                <td>
                  <button className="edit" onClick={() => handleOpenModal(category)}>Editar</button>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleUpdateEstado(category)}>Borrar</button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(categorias.length / articlesPerPage) }, (_, i) => (
          <button id="pages"
            key={i}
            className={i + 1 === currentPage ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <h3>Editar Producto</h3>
          <form onSubmit={handleUpdateCategoria}>
            <label>
              Codigo:
              <input type="text" value={modalData?.id} readOnly />
            </label>
            <label>
              Nombre:
              <input type="text" name="nombre" value={updatedCategoria.nombre} onChange={handleChange} />
            </label>
            <label>
              Descripcion:
              <input type="text" name="descripcion" value={updatedCategoria.descripcion} onChange={handleChange} />
            </label>
            <div className="options">
              <button className="guardar" type="submit">Guardar</button>
              <button className="cerrar" type="button" onClick={handleCloseModal}>Cerrar</button>
            </div>
          </form>
        </div>
      )}
      </Main>
    </>
  );
};
