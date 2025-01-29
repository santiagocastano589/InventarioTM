// 
import React, { useState, useEffect } from 'react';
import "./Table.css";
import { Main } from '../Layout/Main/Main';
import { Header } from '../Layout/Header/Header';



export const Table = () => {
  const [articles, setArticles] = useState([]);
  const [articlesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpenAddProduct, setIsModalOpenAddProduct] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [newProduct, setNewProduct] = useState({
    serial: '',
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    categoria_id: '',
    proveedor_id: ''
  });

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


    const filteredArticles = articles.filter(article => {
      return (
        article.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });




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
  const handleCloseModalAddProduct = () => {
    setIsModalOpenAddProduct(false);
    setModalData(null);
  };

  const displayPage = () => {
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    return filteredArticles.slice(start, end);
  }; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
  };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
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
        alert("Producto actualizado exitosamente");
        handleCloseModal();
      } else {
        alert("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Ocurrió un error. Intenta nuevamente.");
    }
  };


const handleUpdateEstado = async (article) => {
  try {
    const response = await fetch(`https://inventariotm.onrender.com/sendPapelera/${article.serial}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const updatedArticle = await response.json();
      setArticles((prevArticles) =>
        prevArticles.map((art) =>
          art.serial === updatedArticle.serial ? updatedArticle : art
        )
      );
    } else {
      alert('Error al enviar el producto a la papelera');
    }
  } catch (error) {
    console.error('Error al enviar el producto a la papelera:', error);
  }
};


const handleAddProduct = async (e) => {
  e.preventDefault();
  
  if (!window.confirm("¿Estás seguro de que deseas registrar este producto?")) {
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/newProducto/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });

    if (response.ok) {
      alert("Producto registrado exitosamente");
      loadArticles();
      handleCloseModalAddProduct();
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Error al agregar el producto");
    }
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    alert("Ocurrió un error. Intenta nuevamente.");
  }
};




  return (
    <>
    <Main>
      <Header/>
      <div className="box">
      <input 
          type="text" 
          placeholder="Buscar productos..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
          className="search-bar"
        />
        <button className='btn-add' onClick={() => setIsModalOpenAddProduct(true)}>Agregar Producto</button>
        
      </div>
      
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
            <th>Papelera</th>
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
                  <button
                    className="delete"
                    onClick={() => {
                      if (window.confirm(`¿Mover el artículo ${article.serial} a la papelera?`)) {
                        handleUpdateEstado(article);
                      }
                    }}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredArticles.length / articlesPerPage) }, (_, i) => (
          <button id='pages'
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


      {isAddModalOpenAddProduct && (
        <div className="modal">
          <h3>Agregar Producto</h3>
          <form onSubmit={handleAddProduct}>
            <label>Serial: <input type="text" name="serial" value={newProduct.serial} onChange={handleNewChange} /></label>
            <label>Nombre: <input type="text" name="nombre" value={newProduct.nombre} onChange={handleNewChange} /></label>
            <label>Descripcion: <input type="text" name="descripcion" value={newProduct.descripcion} onChange={handleNewChange} /></label>
            <label>Precio: <input type="text" name="precio" value={newProduct.precio} onChange={handleNewChange} /></label>
            <label>Cantidad: <input type="text" name="cantidad" value={newProduct.cantidad} onChange={handleNewChange} /></label>
            <label>categoria_id: <input type="text" name="categoria_id" value={newProduct.categoria_id} onChange={handleNewChange} /></label>
            <label>proveedor_id: <input type="text" name="proveedor_id" value={newProduct.proveedor_id} onChange={handleNewChange} /></label>
            <div className="options">
              <button type="submit" className='add'>Guardar</button>
              <button type="button" onClick={handleCloseModalAddProduct} className='close-add'>Cerrar</button>
            </div>
          </form>
        </div>
      )}
      </Main>
    </>
  );
};

