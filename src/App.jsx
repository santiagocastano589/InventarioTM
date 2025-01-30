import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Main } from './Components/Layout/Main/Main';
import { Categorias } from './Components/Pages/Categorias/Categorias';
import { Papelera } from './Components/Pages/Papelera/Papelera';
import { Table } from './Components/Table/Table';
import { TableCategorias } from './Components/Pages/TableCategorias/TableCategorias';

import { Proveedores } from './Components/Pages/Proveedores/Proveedores';
// import { Graficas } from './Components/Pages/Graficas/Graficas';
// import { Whatsapp } from './Components/Pages/Whatsapp/Whatsapp';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} /> {/* Main como la página de inicio */}
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/papelera" element={<Papelera />} />
        <Route path="/TablaCategorias" element={<TableCategorias />} />
        <Route path="/proveedores" element={<Proveedores />} />
        {/* 
        
        <Route path="/whatsapp" element={<Whatsapp />} /> */}
      </Routes>
    </>
  );
}

export default App;
