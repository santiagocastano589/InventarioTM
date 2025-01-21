import React, { useState } from 'react'
import { useEffect } from 'react';


export const Table = () => {

    const [articles, setArticles] = useState([]);
    const [articlesPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      loadArticles();
    }, [])

    const loadArticles = async () => {
        try {
          const response = await fetch("php/db.php");
          const data = await response.json();
          setArticles(data);
        } catch (error) {
          console.error("Error al cargar los artículos:", error);
        }
      };

      const handlePageChange = (page) => {
        setCurrentPage(page);
      }
      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
      const displayPage = () => {
        const start = (currentPage - 1) * articlesPerPage;
        const end = start + articlesPerPage;
        return articles.slice(start, end);
      };
    
  return (
    <div>
      <table>
        <thead>
            <th>Serial</th>
            <th>Activo</th>
            <th>Artículo</th>
            <th>Área</th>
            <th>Expandir</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </thead>
        <tbody>
          {displayPage().map((article) => (
            <tr key={article.serial}>
            </tr>
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
          <button onClick={handleCloseModal}>Cerrar</button>
        </div>
      )}

      <button onClick={handleOpenModal}>Abrir modal</button>
    </div>
  );
}






