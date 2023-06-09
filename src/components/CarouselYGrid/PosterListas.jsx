import styled from 'styled-components';
import { IMG_API } from '../../utils/tmbd-config';
import { useEffect, useState } from 'react';
import PosterNotFound from '../../assets/posterNotFound.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../utils/firebase-config';
import { AiFillDelete } from 'react-icons/ai';
import { removeMovieFromLiked, removeMovieFromToWatch } from '../../store/index';

// Se le pasa como props: moviedata
export default function PosterListas({ movieData }) {

  // Se declara funciones propias de react
  const navegacion = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(undefined);

  // Verifica si hay un usuario autenticado al montar el componente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (Usuario) => {
      if (Usuario) setEmail(Usuario.email);
      else navegacion('/login');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Maneja la eliminación de la película si es para la lista de favoritos(removeMovieFromLiked) o para las pendientes(removeMovieFromToWatch)
  const handleDelete = async () => {
    try {
      await dispatch(removeMovieFromToWatch({ email: email, movieId: movieData.id }));
      await dispatch(removeMovieFromLiked({ email: email, movieId: movieData.id }));

      console.log("Película eliminada exitosamente");
    } catch (error) {
      console.log(error);
    }
  };

  // Maneja que cuando se le de al poster, va a la página de información de la película
  const handleClick = () => {
    navegacion('/infoPeli', { state: movieData });
  };

  return (
    <CajaPoster>
      {/* Muestra la imagen del póster si está disponible, si no, muestra un póster predeterminado */}
      <ImagenPoster
        src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}` : PosterNotFound}
        alt="Poster"
        onClick={handleClick}
      />

      {/* Muestra el título de la película o serie */}
      <TextOverlay>
        <Text>{movieData.name || movieData.title}</Text>
      </TextOverlay>
      {/* Botón que llama a handleDelete para eliminar la película*/}
      <button className="btn-eliminar" title='Eliminar' onClick={handleDelete}>
        <AiFillDelete />
      </button>
    </CajaPoster>
  );
}

// Estilos
const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const CajaPoster = styled.div`
  align-items: center;
  text-align: center;
  position: relative;

  &:hover ${TextOverlay} {
    opacity: 1;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }

  button.btn-eliminar {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease-in;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    border-radius: 0.3rem;

    &:hover {
      color: lime;
    }
  }

`;

const ImagenPoster = styled.img`
  width: 100%;
  height: 90%;
  box-shadow: 0 5px 10px black;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    border: 3px solid lime;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

`;

const Text = styled.div`
  `;

