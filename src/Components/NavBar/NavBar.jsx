import React from 'react';
import { IoHome } from "react-icons/io5";
import { GrCubes } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Importa Link
import './NavBar.css';

export const NavBar = () => {
  return (
    <nav className="nav input" id="nav">
      <Link to="/" className="value"><IoHome /> Inicio</Link>
      <Link to="/categorias" className="value"><GrCubes /> Categorías</Link>
      <Link to="/papelera" className="value"><MdDelete /> Papelera</Link>
      <Link to="/proveedores" className="value"><BsFillPeopleFill /> Proveedores</Link>
      <Link to="/whatsapp" className="value"><FaWhatsapp /> Whatsapp</Link>
    </nav>
  );
};
