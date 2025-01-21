import React, { useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import './Header.css';
import { NavBar } from '../../NavBar/NavBar';

export const Header = () => {

    const [isVisible, setIsVisible] = useState(false);

    const openMenu = () => {
        setIsVisible(true);
    };

    const closeMenu = () => {
        setIsVisible(false);
    };

  return (
    <>
        <div className='menu'>
             <button onClick={openMenu}>
                <FiMenu />
            </button>
            <h1>Inventario TM</h1>

        </div>

        {isVisible && (
            <header>
                <button onClick={closeMenu}>
                    <IoClose />
                </button>
                <NavBar/>
            </header>
        )}
    
    </>
  )
}
