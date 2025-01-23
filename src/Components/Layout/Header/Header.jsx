import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "./Header.css";
import { NavBar } from "../../NavBar/NavBar";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <div className="cinta-seguridad">
        <button className="boton" onClick={toggleMenu}>
          {isVisible ? <IoClose /> : <FiMenu />}
        </button>
        <h1 className="titulo">Inventario TM</h1>
        <div className="franjas"></div>
      </div>

      {isVisible && (
        <header className="menu-desplegable">
          <NavBar />
        </header>
      )}
    </>
  );
};
