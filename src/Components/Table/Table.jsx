import React, { useState, useEffect } from 'react';
import "./Table.css";

export const Table = () => {
  const [articles, setArticles] = useState([]);
  const [articlesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch("https://inventariotm.onrender.com/productos/allProducts");
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

  const handleExpand = (index) => {
    const updatedArticles = [...articles];
    updatedArticles[index].expanded = !updatedArticles[index].expanded;
    setArticles(updatedArticles);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Categoria</th>
            <th>Proveedor</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {displayPage().map((article, index) => (
            <React.Fragment key={article.serial}>
              <tr>
                <td>{article.serial}</td>
                <td>{article.nombre}</td>
                <td>{article.descripcion}</td>
                <td>{article.precio}</td>
                <td>{article.cantidad}</td>
                <td>{article.categoria_nombre}</td>
                <td>{article.proveedor_nombre}</td>
                {/* <td>
                  <button onClick={() => handleExpand(index)}>
                    {article.expanded ? "Contraer" : "Expandir"}
                  </button>
                </td> */}
                <td>
                  <button onClick={() => handleOpenModal(article)}>Editar</button>
                </td>
                <td>
                  <button
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
              {article.expanded && (
                <tr>
                  <td colSpan="7">
                    <strong>Detalles:</strong>
                    <ul>
                      <li><strong>Características:</strong> {article.caracteristicas}</li>
                      <li><strong>Descripción:</strong> {article.descripcion}</li>
                      <li><strong>Localización:</strong> {article.localizacion}</li>
                      <li><strong>Estado:</strong> {article.estado}</li>
                      <li><strong>Categoría:</strong> {article.categoria}</li>
                      <li><strong>Fecha Asignación:</strong> {article.fechaAsignacion}</li>
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, i) => (
          <button
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
          <h3>Editar Artículo</h3>
          <form>
            <label>
              Serial:
              <input type="text" value={modalData?.serial} readOnly />
            </label>
            <label>
              Nombre:
              <input type="text" value={modalData?.nombre} />
            </label>
            <label>
              Descripcion:
              <input type="text" value={modalData?.descripcion} />
            </label>
            <label>
              Precio:
              <input type="text" value={modalData?.precio} />
            </label>
            <label>
              Cantidad:
              <input type="text" value={modalData?.cantidad} />
            </label>
            {/* Otros campos */}
            <button type="submit">Guardar</button>
          </form>
          <button onClick={handleCloseModal}>Cerrar</button>
        </div>
      )}
    </div>
  );
};
