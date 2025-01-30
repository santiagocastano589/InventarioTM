import React, { useState, useEffect } from 'react';
import "../../Table/Table.css";
import { Main } from '../../Layout/Main/Main';
import { Header } from '../../Layout/Header/Header';

export const Proveedores = () => {
  const [provider, setProvider] = useState([]);
  const [providerPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpenAddProvider, setIsAddModalOpenAddProvider] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [newProvider, setNewProvider] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    descripcion: '',
    direccion: ''
  });

  const [updatedProvider, setUpdatedProvider] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    descripcion: '',
    direccion: ''
  });

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const response = await fetch("https://inventariotm.onrender.com/allProveedores/");
      const data = await response.json();
      setProvider(data);
    } catch (error) {
      console.error("Error al cargar los proveedores:", error);
    }
  };

    const filteredProvider = provider.filter(provider => {
      return (
        provider.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.contacto.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (data) => {
    setModalData(data);
    setUpdatedProvider({
      nombre: data.nombre,
      descripcion: data.descripcion,
      contacto: data.contacto,
      direccion: data.direccion,
      telefono: data.telefono,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const handleCloseModalAddProduct = () => {
    setIsAddModalOpenAddProvider(false);
    setModalData(null);
  };

  const displayPage = () => {
    const start = (currentPage - 1) * providerPerPage;
    const end = start + providerPerPage;
    return filteredProvider.slice(start, end);
  }; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProvider((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewProvider((prevState) => ({ ...prevState, [name]: value }));
  };

    const handleSearchChange = (e) => {handleNewChange
      setSearchTerm(e.target.value);
    };


  const handleUpdateProvider = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`https://inventariotm.onrender.com/updateProvider/${modalData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProvider),
      });
  
      if (response.ok) {
        const updatedProvider = await response.json();
        setProvider((prevProvider) =>
          prevProvider.map((provider) =>
            provider.id === updatedProvider.id ? updatedProvider : provider
          )
        );
        alert("Proveedor actualizado exitosamente");
        handleCloseModal();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Error al actualizar el proveedor");
      }
      
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
      alert("Ocurrió un error. Intenta nuevamente.");
    }
  };



  const handleDeleteProvider = async (provider) => {
    try {
      const response = await fetch(`https://inventariotm.onrender.com/deleteProvider/${provider.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setProvider((prevProvider) =>
          prevProvider.filter((pro) => pro.id !== provider.id)
        );
        alert('Proveedor eliminado permanentemente');
      } else {
        alert('Error al eliminar el proveedor');
      }
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
    }
  };


const handleAddProvider = async (e) => {
  e.preventDefault();
  
  if (!window.confirm("¿Estás seguro de que deseas registrar este proveedor?")) {
    return;
  }

  try {
    const response = await fetch("https://inventariotm.onrender.com/newProvider/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProvider)
    });

    if (response.ok) {
      alert("Proveedor registrado exitosamente");
      loadProviders();
      handleCloseModalAddProduct();
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Error al agregar el proveedor");
    }
  } catch (error) {
    console.error("Error al agregar el proveedor:", error);
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
          placeholder="Buscar proveedores..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
          className="search-bar"
        />
        <button className='btn-add' onClick={() => setIsAddModalOpenAddProvider(true)}>Agregar Proveedor</button>
        
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Contacto</th>
            <th>Telefono</th>
            <th>Direccion</th>
            {/* <th>Categoria</th>
            <th>Proveedor</th> */}
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {displayPage().map((provider) => (
            <React.Fragment key={provider.id}>
              <tr>
                <td>{provider.id}</td>
                <td>{provider.nombre}</td>
                <td>{provider.descripcion}</td>
                <td>{provider.contacto}</td>
                <td>{provider.telefono}</td>
                <td>{provider.direccion}</td>
                {/* <td>{article.categoria_nombre}</td>
                <td>{article.proveedor_nombre}</td> */}
                <td>
                  <button className="edit" onClick={() => handleOpenModal(provider)}>Editar</button>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => {
                      if (window.confirm(`¿Eliminar permanentemente el proveedor: ${provider.nombre}?`)) {
                        handleDeleteProvider(provider);
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
        {Array.from({ length: Math.ceil(filteredProvider.length / providerPerPage) }, (_, i) => (
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
          <form onSubmit={handleUpdateProvider}>
            <label>
              ID:
              <input type="text" value={modalData?.id} readOnly />
            </label>
            <label>
              Nombre:
              <input type="text" name="nombre" value={updatedProvider.nombre} onChange={handleChange} />
            </label>
            <label>
              Descripcion:
              <input type="text" name="descripcion" value={updatedProvider.descripcion} onChange={handleChange} />
            </label>
            <label>
              Contacto:
              <input type="text" name="precio" value={updatedProvider.contacto} onChange={handleChange} />
            </label>
            <label>
              Telefono:
              <input type="text" name="cantidad" value={updatedProvider.telefono} onChange={handleChange} />
            </label>
            <label>
              Direccion:
              <input type="text" name="cantidad" value={updatedProvider.direccion} onChange={handleChange} />
            </label>
            <div className="options">
              <button className="guardar" type="submit">Guardar</button>
              <button className="cerrar" type="button" onClick={handleCloseModal}>Cerrar</button>
            </div>
          </form>
        </div>
      )}


      {isAddModalOpenAddProvider && (
        <div className="modal">
          <h3>Agregar Producto</h3>
          <form onSubmit={handleAddProvider}>
            <label>Nombre: <input type="text" name="nombre" value={newProvider.nombre} onChange={handleNewChange} /></label>
            <label>Descripcion: <input type="text" name="descripcion" value={newProvider.descripcion} onChange={handleNewChange} /></label>
            <label>Contacto: <input type="text" name="contacto" value={newProvider.contacto} onChange={handleNewChange} /></label>
            <label>Teléfono: <input type="text" name="telefono" value={newProvider.telefono} onChange={handleNewChange} /></label>
            <label>Dirección: <input type="text" name="direccion" value={newProvider.direccion} onChange={handleNewChange} /></label>
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



