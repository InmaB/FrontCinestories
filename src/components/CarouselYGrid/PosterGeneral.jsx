import styled from 'styled-components';
import { IMG_API } from '../../utils/tmbd-config';
import { useEffect } from 'react';
import PosterNotFound from '../../assets/posterNotFound.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getGenres } from '../../store';

export default function PosterGeneral({ movieData }) {

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
        src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}` : PosterNotFound}
        alt="Poster"
        onClick={handleClick}
      />
      <TextOverlay>
        {/* Muestra el título de la película o serie */}
        <Text>{movieData.name || movieData.title}</Text>
      </TextOverlay>
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
