import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMoviesByGenre, getGenres } from '../store';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Grid from '../components/CarouselYGrid/Grid';
import Footer from '../components/Footer';
import RiseLoader from 'react-spinners/RiseLoader';
import Buscador from '../components/Buscador';

export default function SeriesyTv() {

  // Se declara funciones propias de react
  const dispatch = useDispatch();

  // Obtener datos de store utilizando useSelector
  const movies = useSelector((state) => state.cinestories.movies);
  const genres = useSelector((state) => state.cinestories.genres);
  const genresLoaded = useSelector((state) => state.cinestories.genresLoaded);

  // Se utiliza useState para declarar múltiples variables de estado
  const [mostrarPelis, setMostrarPelis] = useState(false);
  const [pelisVisibles, setPelisVisibles] = useState(20);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
  const [botonSeleccionado] = useState("boton-genero");
  const [loading, setLoading] = useState(true);

  // useEffect para establecer el estado que simula un tiempo de carga de 2 seg y muestra el spinner
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Carga los géneros al montar el componente con el tipo tv
  useEffect(() => {
    dispatch(getGenres({ type: "tv" }));
  }, [])

  // Carga las películas cuando se hayan cargado los géneros con el tipo tv
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "tv" }));
      setMostrarPelis(true);
    }
  }, [genresLoaded]);

  // Maneja la selección de un género cuando se pulse el botón de tipo tv
  const handleSeleccionGenero = (genreId) => {
    setGeneroSeleccionado(genreId);

    if (genreId !== null) {
      dispatch(fetchMoviesByGenre({ type: "tv", genres_id: genreId }));
      setMostrarPelis(true);
    } else {
      dispatch(fetchMovies({ type: "tv" }));
      setMostrarPelis(true);
    }
  };

  // Maneja la carga 20 películas más cuando se pulse al botón
  const handleCargarMas = () => {
    setPelisVisibles((prevPelisVisibles) => prevPelisVisibles + 20);
  };

  // Muestra todas las películas que se realiza por defecto al acceder a la página "Series y TV"
  const handleMostrarTodo = () => {
    setGeneroSeleccionado(null);
    dispatch(fetchMovies({ type: "tv" }));
    setMostrarPelis(true);
  };

  return (
    <Contenedor>
      <div className="navbar">
        <Navbar />
      </div>

      <Contenido>
        <h1 className='titulo'>Series & TV</h1>
        <div className="buscador">
          <h2>Busca la serie o programa de TV</h2>
          {/* Se le pasa las props type:tv */}
          <Buscador type="tv" />
        </div>

        <div className='flex-flow j-center'>
          {/* Botón para mostrar todas las películas y por defecto inicia con Todos */}
          <button
            className={`boton-genero ${generoSeleccionado === null ? 'seleccionado' : ''}`}
            onClick={handleMostrarTodo}
          >
            Todos
          </button>

          {/* Botones para mostrar películas por género */}
          {genres.map((genre) => (
            <button
              className={`boton-genero ${generoSeleccionado === genre.id ? 'seleccionado' : ''}`}
              key={genre.id}
              onClick={() => handleSeleccionGenero(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Div para mostrar el texto de género seleccionado */}
        {generoSeleccionado && botonSeleccionado === "boton-genero" && (
          <div className="genero-seleccionado">
            <h2 className='titulo2'> Has seleccionado el género: {genres.find((genre) => genre.id === generoSeleccionado)?.name}</h2>
          </div>
        )}

        {/* Si loading es true, muestra el Spinner.Si loading es false se muestra el componente Grid y la opción de cargar más. */}
        {loading ? (
          <SpinnerContainer>
            <RiseLoader color='lime' />
          </SpinnerContainer>
        ) : (
          <>
            {/* Mostrar las películas en el Grid */}
            {movies && mostrarPelis && <Grid movies={movies.slice(0, pelisVisibles)} />}

            {movies && movies.length > pelisVisibles && (
              <div className="cargar-mas">
                {/* Botón para cargar más películas */}
                <button className='cargar flex' onClick={handleCargarMas}>Cargar más</button>
              </div>
            )}
          </>
        )}
      </Contenido>

      <Footer />
    </Contenedor>
  );
}

// Estilos
const Contenedor = styled.div`
  position: relative;
  height: 100%;
`;

const Contenido = styled.div`
  padding: 3rem 2rem 3rem 3rem;

  .boton-genero.seleccionado {
    background-color: lime;
    color: black;
  }

  .genero-seleccionado {
    margin-top: 20px;
  }

  .cargar {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 1rem 2.5rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 0 auto;
    transition-duration: 0.4s;
    cursor: pointer;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }

  .cargar:hover {
    background-color: lime;
    color: rgb(48, 50, 62);
  }

  .buscador {
    text-align: center;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
