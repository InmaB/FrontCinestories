
import styled from 'styled-components';
import { URL_TMBD, KEY_API, IMG_API } from '../../utils/tmbd-config';
import { useEffect, useState } from 'react';
import PosterNotFound from '../../assets/posterNotFound.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../../store';

export default function PosterTopRated({ movieData, index }) {

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
      <ImagenPoster src={`https://image.tmdb.org/t/p/w500/` + movieData.poster_path ? IMG_API + movieData.poster_path : PosterNotFound} alt="Poster" onClick={handleClick} />
      <TextOverlay>
        {/* Muestra el título de la película o serie */}
        <Text>{movieData.name || movieData.title}</Text>
      </TextOverlay>
      <div className="transparente">
        <Posicion><h2>Ranking:</h2></Posicion>
        {/* Para que se muestre el nº del ranking */}
        <NumberOverlay className='hit-the-floor'>{index + 1}</NumberOverlay>
      </div>
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

  .transparente {
    width: 100%;
    height: 90px;
    position: absolute;
    bottom: 1rem;
    right: 0px;
    background: none;
    border: none;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
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

const Text = styled.div``;

const Posicion = styled.div`
    h2 {
        position: absolute;
  bottom: 1rem;
  left: 1rem;
  -webkit-text-stroke: 1px black;
text-shadow: black 0.2em 0.1em 0.2em;
font-weight:bold;
    }
`


const NumberOverlay = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
`;
