import React from 'react'
import { IoHome } from "react-icons/io5";
import { GrCubes } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { FaWhatsapp } from "react-icons/fa";
import './NavBar.css';
export const NavBar = () => {
  return (
    <>
        <nav className="nav input" id="nav">
            <a href='#' className="value"><IoHome />Inicio</a>
            <a href='#' className="value"><GrCubes />Categorias</a>
            <a href='#' className="value"><MdDelete />Papelera</a>
            <a href='#' className="value"><BsFillPeopleFill />Proveedores</a>
            <a href='#' className="value"><VscGraphLine />Graficas</a>
            <a href='#' className="value"><FaWhatsapp />Whatsapp</a>
        </nav>

    </>
  )
}
