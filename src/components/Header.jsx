import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Se pasa props como argumento
export default function Header(props) {

  // Se declara funciones propias de react
  const navegacion = useNavigate();

  return (
    <Contenedor className='flex-flow  j-center a-center'>
      {/* Banner  */}
      <div className="content">
        <div className="slider-wrapper">
          Razones para registrarte
          <div className="slider">
            <div className="slider-text-1">Gratuito</div>
            <div className="slider-text-2">Pelis</div>
            <div className="slider-text-3">Series</div>
          </div>
        </div>
      </div>

      {/* Button llama a la función navegacion. Si props.login es verdadero, se establece la ruta "/login", si no, "/registro". El texto dentro del botón también se determina, si props.login es verdadero, el texto es "Loggearse", si no, es "Registrarse". */}
      <button onClick={() => navegacion(props.login ? "/login" : "/registro")}>
        {props.login ? "Loggearse" : "Registrarse"}
      </button>
    </Contenedor>
  );
}


// Estilos
const Contenedor = styled.div`
  padding: 2rem 4rem;

  p {
    margin-right: 55px;
  }

  button {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background-color: lime;
    border: none;
    cursor: pointer;
    color: black;
    font-weight: bolder;
    font-size: 1rem;
    :hover {
      color: lime;
      background-color: black;
    }
  }

  .content {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider-wrapper {
    font-size: 2rem;
    color: #aaa;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider {
    height: 50px;
    padding-left: 15px;
    overflow: hidden;
  }

  .slider div {
    height: 50px;
    padding: 2px 15px;
    color: #ffffff;
    text-align: center;
    margin-bottom: 50px;
    box-sizing: border-box;
  }

  .slider-text-1 {
    background: #4a6ee0;
    animation: slide 5s linear infinite;
  }

  .slider-text-2 {
    background: #ffd156;
  }

  .slider-text-3 {
    background: #56bdff;
  }

  @keyframes slide {
    0% {
      margin-top: -300px;
    }
    5% {
      margin-top: -200px;
    }
    33% {
      margin-top: -200px;
    }
    38% {
      margin-top: -100px;
    }
    66% {
      margin-top: -100px;
    }
    71% {
      margin-top: 0px;
    }
    100% {
      margin-top: 0px;
    }
  }
`;
