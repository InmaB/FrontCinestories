import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieByRated, fetchMovies, fetchTvByRated, fetchUpcoming, getGenres } from '../store';
import CarouselHome from '../components/CarouselYGrid/CarouselHome';
import CarouselGeneral from '../components/CarouselYGrid/CarouselGeneral';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RiseLoader from 'react-spinners/RiseLoader';

export default function Cinestories() {
  const [loading, setLoading] = useState(true); // Estado para controlar el estado de carga

  // Se utiliza useState para declarar múltiples variables de estado
  const movies = useSelector((state) => state.cinestories.movies);
  const genresLoaded = useSelector((state) => state.cinestories.genresLoaded);
  const moviesByRated = useSelector((state) => state.cinestories.moviesByRated);
  const tvByRated = useSelector((state) => state.cinestories.tvByRated);
  const upcoming = useSelector((state) => state.cinestories.upcoming);

  // Se declara funciones propias de react
  const dispatch = useDispatch();

  // useEffect se ejecuta una vez, al montar el componente, para enviar getGenres() utilizando dispatch para obtener los géneros de películas
  useEffect(() => {
    dispatch(getGenres({ type: "movie" }));
  }, []);

  // Si genresLoaded es true indica que los géneros se han cargado correctamente y ejecuta la función en store/index.js
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" })).then(() => {
        setLoading(false); // Marcar la carga como completa cuando los datos se hayan cargado
      });
    }
  }, [genresLoaded]);

  // Si genresLoaded es true indica que los géneros se han cargado correctamente y ejecuta la función en store/index.js
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovieByRated());
    }
  }, [genresLoaded]);

  // Si genresLoaded es true indica que los géneros se han cargado correctamente y ejecuta la función en store/index.js
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchTvByRated());
    }
  }, [genresLoaded]);

  // Si genresLoaded es true indica que los géneros se han cargado correctamente y ejecuta la función en store/index.js
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchUpcoming());
    }
  }, [genresLoaded]);

  return (
    <Contenedor>
      <Navbar></Navbar>
      <div className="portada">
        <CarouselHome></CarouselHome>
      </div>
      <div className="content">
        <div className="contenido">
          {loading ? ( // Mostrar el spinner si la carga está en progreso
            <SpinnerContainer>
              <RiseLoader color='lime' />
            </SpinnerContainer>
          ) : (
            // LLamada al componente donde se le pasa distintas props
            <CarouselGeneral
              movies={movies}
              moviesByRated={moviesByRated}
              tvByRated={tvByRated}
              upcoming={upcoming}
            />
          )}
        </div>
      </div>
      <Footer></Footer>
    </Contenedor>
  );
}

// Estilos
const Contenedor = styled.div`
  background-color: linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42));
  .content {
    padding: 1rem 2rem 2rem 3rem;
  }
  .portada {
    position: relative;
    margin-bottom: 2rem;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
