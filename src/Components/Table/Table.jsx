import React, { useState, useEffect } from 'react';
import "./Table.css";

export const Table = () => {
  const [articles, setArticles] = useState([]);
  const [articlesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    estado: '',
    categoria_id: '',
    categoria_nombre: '',
    proveedor_id: '',
    proveedor_nombre: ''  
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch("https://inventariotm.onrender.com/productos/");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error al cargar los artículos:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (data) => {
    setModalData(data);
    setUpdatedProduct({
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      cantidad: data.cantidad,
      estado: data.estado,
      categoria_id: data.categoria_id,
      proveedor_id: data.proveedor_id
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
    return articles.slice(start, end);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://inventariotm.onrender.com/updateProducto/${modalData.serial}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const updatedArticle = await response.json();
        setArticles((prevArticles) =>
          prevArticles.map((article) =>
            article.serial === updatedArticle.serial ? updatedArticle : article
          )
        );
        handleCloseModal();
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };







  const handleUpdateEstado = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://inventariotm.onrender.com/sendPapelera/${modalData.serial}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const updatedArticle = await response.json();
        setArticles((prevArticles) =>
          prevArticles.map((article) =>
            article.serial === updatedArticle.serial ? updatedArticle : article
          )
        );
        handleCloseModal();
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Cantidad</th>
            {/* <th>Categoria</th>
            <th>Proveedor</th> */}
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {displayPage().map((article) => (
            <React.Fragment key={article.serial}>
              <tr>
                <td>{article.serial}</td>
                <td>{article.nombre}</td>
                <td>{article.descripcion}</td>
                <td>${article.precio}</td>
                <td>{article.cantidad}</td>
                {/* <td>{article.categoria_nombre}</td>
                <td>{article.proveedor_nombre}</td> */}
                <td>
                  <button className="edit" onClick={() => handleOpenModal(article)}>Editar</button>
                </td>
                <td>
                  <button className="delete"
                    onClick={() => {
                      if (window.confirm(`¿Eliminar el artículo ${article.serial}?`)) {
                        // Lógica para eliminar el artículo
                      }
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, i) => (
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
          <form onSubmit={handleUpdateProduct}>
            <label>
              Codigo:
              <input type="text" value={modalData?.serial} readOnly />
            </label>
            <label>
              Nombre:
              <input type="text" name="nombre" value={updatedProduct.nombre} onChange={handleChange} />
            </label>
            <label>
              Descripcion:
              <input type="text" name="descripcion" value={updatedProduct.descripcion} onChange={handleChange} />
            </label>
            <label>
              Precio:
              <input type="text" name="precio" value={updatedProduct.precio} onChange={handleChange} />
            </label>
            <label>
              Cantidad:
              <input type="text" name="cantidad" value={updatedProduct.cantidad} onChange={handleChange} />
            </label>
            <div className="options">
              <button className="guardar" type="submit">Guardar</button>
              <button className="cerrar" type="button" onClick={handleCloseModal}>Cerrar</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
