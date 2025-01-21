import React from 'react'
import { IoHome } from "react-icons/io5";
import { GrCubes } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { FaWhatsapp } from "react-icons/fa";

export const NavBar = () => {
  return (
    <>
        <nav className="nav" id="nav">
            <ul>
               <li><IoHome /><a href="http://172.30.0.3:83/PruebaIntra/InventarioCCQ/"> Inicio</a></li>
               <li><GrCubes /><a href="articulos.html"> Ver Artículos</a></li>
               <li><MdDelete /><a href="papelera.html"> Papelera</a></li>
               <li><BsFillPeopleFill /><a href="proveedores.html"> Ver Proveedores</a></li>
               <li><VscGraphLine /><a href="graficas.html"> Ver Graficas</a></li>
               <li><FaWhatsapp /><a href="https://wa.me/" target="_blank">Whatsapp</a></li>

            </ul>
        </nav>
    </>
  )
}
