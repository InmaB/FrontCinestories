import React, { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Registro() {
  const navegacion = useNavigate();
  const [valoresFormulario, setvaloresFormulario] = useState({
    email: '',
    password: '',
  });
  const [mensajeError, setMensajeError] = useState('');

  const nuevoUsuario = async () => {
    try {
      const { email, password } = valoresFormulario;


      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const response = await axios.post('http://localhost:5000/api/user/crearUsuario', { email, password });

      if (response.status === 200) {
        // Usuario creado correctamente
        navegacion('/');
      } else {
        // Error al crear el usuario
        setMensajeError('Error al registrar nuevo usuario');
      }
    } catch (err) {
      setMensajeError('Error al registrar nuevo usuario, PRUEBA');
      console.log(err);
    }
  };

  return (
    <Contenedor>
      <div className="contenido">
        <Header login></Header>
        <div className="body flex column a-center j-center">
          <div className="text flex colum">
            <h3>Peliculas y series</h3>

          </div>
          <div className="form">
            <input
              type="email"
              placeholder='Email'
              name='email'
              value={valoresFormulario.email}
              onChange={(e) =>
                setvaloresFormulario({
                  ...valoresFormulario,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder='Password'
              name='password'
              value={valoresFormulario.password}
              onChange={(e) =>
                setvaloresFormulario({
                  ...valoresFormulario,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {mensajeError && <p className="error">{mensajeError}</p>}
          </div>
          <button onClick={nuevoUsuario}>Registrarse</button>
        </div>
      </div>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .contenido {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;

    .body {
      /* Estilos para el cuerpo */
      display: flex;
      flex-direction: column;
      align-items: center;

      .text {
        /* Estilos para el texto */
        display: flex;
        flex-direction: column;
        align-items: center;

      }

      .form {
        /* Estilos para el formulario */
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
        color: black;
        border: none;
        padding: 1rem;
        font-size: 1rem;
        border: 1px solid black;
        &:focus {
          outline: none;
        }
      }

      .error {
        background-color: red;
        padding: 5px;
        color: white;
        margin-top: 1rem;
      }
      }

      button {
        width: 100%;
        margin-top: 2rem;
        padding: 0.5rem 1rem;
        background-color: black;
        border: none;
        cursor: pointer;
        color: white;
        font-weight: bolder;
        font-size: 1rem;
        :hover {
          background-color: lime;
          color: black;
        }
      }
    }
  }
`;