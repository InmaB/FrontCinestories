import styled from 'styled-components';
import { URL_TMBD, KEY_API, IMG_API } from '../../utils/tmbd-config';
import { useEffect } from 'react';
import PosterNotFound from '../../assets/posterNotFound.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../../store';

// Se le pasa como props: moviedata
export default function PosterResultados({ movieData }) {

  // Se declara funciones propias de react
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect se ejecuta una vez, al montar el componente, para enviar getGenres() utilizando dispatch para obtener los géneros de películas
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  // Maneja que cuando se le de al poster, va a la página de información de la película
  const handleClick = () => {
    navigate('/infoPeli', { state: movieData });
  };

  return (
    <CajaPoster>
      {/* Muestra la imagen del póster si está disponible, si no, muestra un póster predeterminado */}
      <ImagenPoster
        src={movieData.poster_path ? `https://image.tmdb.org/t/p/w90/${IMG_API}${movieData.poster_path}` : PosterNotFound}
        alt="Poster"
        onClick={handleClick}
      />
      {/* Muestra el título de la película o serie */}
      <Text>{movieData.name || movieData.title}</Text>
    </CajaPoster>
  );
}

// Estilos
const CajaPoster = styled.div`
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
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
`;

const Text = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 5px;
`;
