import React, { useState } from 'react';
import styled from "styled-components";
import logo from "../assets/logo.png";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineCheckCircle, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { firebaseAuth } from "../utils/firebase-config";
import UserProfile from './UserProfile';

export default function Navbar() {

  // Se declara funciones propias de react
  const navegacion = useNavigate();

  // Se utiliza useState para declarar múltiples variables de estado
  const [isOpen, setIsOpen] = useState(false);

  // Se declara una matriz de links
  const links = [
    { ico: AiFillHome, name: "Inicio", link: "/" },
    { ico: BiCameraMovie, name: "Pelis", link: "/peliculas" },
    { ico: SlScreenDesktop, name: "Series & Tv", link: "/seriestv" },
    { ico: MdFavorite, name: "Favoritas", link: "/listaFavoritas" },
    { ico: AiOutlineCheckCircle, name: "Pendientes", link: "/listaPendientes" },
  ];

  // Verifica si hay un usuario autenticado
  onAuthStateChanged(firebaseAuth, (Usuario) => {
    if (!Usuario) navegacion("/login");
  });

  // Función para cambiar el estado isOpen cuando se hace clic en el botón del menu responsive
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <div className="flex a-center">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        {/* Aplica estilos específicos cuando isOpen es true, para mostrar un ícono de cierre y también llama a toggleMenu donde cambia el estado  */}
        <div className={"menu-icon " + (isOpen ? 'open' : '')} onClick={toggleMenu}>
          {/* Icono del botón del menu responsive */}
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
        <ul className={"menu " + (isOpen ? 'open' : '')}>
          {/* Mapea la matriz de links */}
          {links.map(({ ico: Icon, name, link }) => (
            <li key={name}>
              <Link to={link}>
                {/* Icono y nombre del elemento de menú */}
                {Icon && <Icon />} {name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="dcha">
          {/* Componente UserProfile */}
          <UserProfile></UserProfile>
        </div>
      </div>
    </Nav>
  );
}

// Estilos
const Nav = styled.div`
  box-shadow: 0 3px 3px black;
  top: 0;
  background-color: #1a1d29;
  height: 4.5rem;
  width: 100%;
  z-index: 2;
  padding: 0.3rem;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-left: 2rem;
      margin-right: 2rem;
      height: 4rem;
    }
  }

  .menu-icon {
    font-size: 24px;
    cursor: pointer;
    display: none;

    @media (max-width: 767px) {
      display: block;
    }
  }

  .menu {
    display: flex;
    align-items: center;

    @media (max-width: 767px) {
      display: none;
    }

    @media (min-width: 767px) and (max-width: 900px) {
      li a {
        font-size: 0.8rem;
      }
    }

    li {
      list-style: none;
      margin-left: 20px;
      margin: 0.8rem;
      text-transform: uppercase;
      font-size: 1.1rem;

      a {
        position: relative;
        overflow: hidden;
        display: inline-block;
        text-decoration: none;
        color: white;
        transition: color 0.2s ease-in;

        &:hover {
          color: lime;
        }

        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: lime;
          transition: left 0.4s;
        }

        &:hover:after {
          left: 0;
        }
      }
    }
  }

  .dcha {
    margin-left: auto;
    margin-right: 2rem;
  }

  @media (max-width: 767px) {
    .menu.open {
      display: block;
      position: absolute;
      top: 4.5rem;
      left: 0;
      width: 100%;
      background-color: #1a1d29;
      padding: 1rem;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s ease-in;

      &.open {
        visibility: visible;
        opacity: 1;
        z-index: 9999;
      }

      ul {
        flex-direction: column;
        align-items: flex-start;

        li {
          margin-bottom: 0.5rem;
        }

        a {
          display: block;
          padding: 0.5rem 0;
        }
      }
    }
  }
`;
