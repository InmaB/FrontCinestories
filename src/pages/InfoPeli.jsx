import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../store';
import PosterNotFound from '../assets/posterNotFound.jpg';
import { IMG_API } from '../utils/tmbd-config';
import Footer from '../components/Footer';
import { BiHappyHeartEyes } from 'react-icons/bi';
import { BsCardChecklist } from 'react-icons/bs';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'


export default function InfoPeli() {

  // Se declara funciones propias de react
  const navegacion = useNavigate()
  const dispatch = useDispatch()

  // Se utiliza useState para declarar múltiples variables de estado
  const genres = useSelector((state) => state.cinestories.genres);
  const { idPelicula } = useParams();
  const location = useLocation();
  const movieData = location.state;
  const isMounted = useRef(false);
  const [email, setEmail] = useState("");
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');


  // Efecto que asegura que el componente solo realice operaciones cuando está montado y evita errores relacionados con el estado o llamadas asincrónicas después de que el componente se haya desmontado. Se utiliza para el próximo useEffect "onAuthStateChanged"
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);


  // Verifica el estado de autenticación del usuario
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (Usuario) => {
      if (isMounted.current) {
        if (Usuario) setEmail(Usuario.email);
        else navegacion("/login");
      }
    });
  }, []);


  // Obtiene los géneros al montar el componente
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  // Función para añadir la película a la lista de favoritos
  const aniadirListaFav = async () => {
    try {
      // Obtiene las películas de favoritos y pendientes del usuario desde la API
      const { data: { movies: pendientes } } = await axios.get(`http://localhost:5000/api/user/pendientes/${email}`);
      const { data: { movies: favoritas } } = await axios.get(`http://localhost:5000/api/user/favoritas/${email}`);
      // Comprueba si la película ya está en la lista de pendientes o favoritos
      const isInPendientes = pendientes.some((movie) => movie.id === movieData.id);
      const isInFavoritas = favoritas.some((movie) => movie.id === movieData.id);

      // Si la película ya está en la lista de favoritos o pendientes, muestra un mensaje
      if (isInPendientes) {
        setShowMessage(true);
        setMessage('La película ya está en la lista de pendientes');
      } else if (isInFavoritas) {
        setShowMessage(true);
        setMessage('La película ya está en la lista de favoritas');
      } else {
        // Si la película no está en ninguna lista, la añade
        await axios.post('http://localhost:5000/api/user/aniadirFav', {
          email,
          data: movieData,
        });
        setIsInFavorites(true);
        setShowMessage(true);
        setMessage('Añadida a favoritas correctamente');
      }
    } catch (err) {
      console.log(err)
    }
  };

  // Función para añadir la película a la lista de pendientes
  const aniadirListaPendientes = async () => {
    try {
      const { data: { movies: pendientes } } = await axios.get(`http://localhost:5000/api/user/pendientes/${email}`);
      const { data: { movies: favoritas } } = await axios.get(`http://localhost:5000/api/user/favoritas/${email}`);
      // Comprueba si la película ya está en la lista de pendientes o favoritos
      const isInPendientes = pendientes.some((movie) => movie.id === movieData.id);
      const isInFavoritas = favoritas.some((movie) => movie.id === movieData.id);

      // Si la película ya está en la lista de favoritos o pendientes, muestra un mensaje
      if (isInFavoritas) {
        setShowMessage(true);
        setMessage('La película ya está en la lista de favoritas');
      } else if (isInPendientes) {
        setShowMessage(true);
        setMessage('La película ya está en la lista de pendientes');
      } else {
        // Si la película no está en ninguna lista, la añade
        await axios.post('http://localhost:5000/api/user/aniadirPendientes', {
          email,
          data: movieData,
        });
        setShowMessage(true);
        setMessage('Añadida a pendientes correctamente');
      }
    } catch (err) {
      console.log(err)
    }
  }
  // Va hacía la pag anterior
  const navigateBack = () => {
    navegacion(-1);
  };

  // Función que va a encontrar el id de los géneros de las películas. movieGenreNames es un array de nombres de géneros obtenidos a partir de movieData.genre_ids utilizando el array de objetos genres
  const movieGenreNames = movieData.genre_ids && movieData.genre_ids.map((genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre ? genre.name : '';
  });

  return (
    <Contenedor>
      <Navbar />
      <Contenido>

        {movieData && (
          <CardContainer>
            <div className="card">
              <div className="photo">
                <img
                  src={
                    movieData.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}`
                      : PosterNotFound
                  }
                  alt="Poster"
                />
              </div>
              <div className="description">
                {/* Se muestra el titulo, titulo original, valoración, año, sinopsis si es película, serie de tv o programa */}
                <h1>{movieData.name || movieData.title}</h1>
                <h4>Título Original - {movieData.original_title || movieData.original_name}</h4>
                <h2>Valoración:</h2>
                <p>{movieData.vote_average}</p>
                <h2>Año:</h2>
                <p>{movieData.release_date && movieData.release_date.split('-')[0] || movieData.first_air_date && movieData.first_air_date.split("-")[0]}</p>
                <h2>Sinopsis</h2>
                <p>{movieData.overview}</p>
                <h2>Género:</h2>
                <div className="genre-container">
                  {/* Se verifica si movieData existe, si tiene la propiedad genres y si su longitud es mayor que 0, si cumple: muestra en una lista.
Se realiza lo mismo con movieGenreNames. Si ninguna de las condiciones anteriores se cumple: "No se encontraron géneros". */}
                  {movieData && movieData.genres && movieData.genres.length > 0 && (
                    <ul className="genre-list">
                      {movieData.genres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                      ))}
                    </ul>
                  )}

                  {/* Se recorre con movieGenreNames para los SearchResults  */}
                  {movieGenreNames && movieGenreNames.length > 0 && (
                    <ul className="genre-list">
                      {movieGenreNames.map((genre, index) => (
                        <li key={index}>{genre}</li>
                      ))}
                    </ul>
                  )}

                  {!movieData || (!movieData.genres || movieData.genres.length === 0) && (!movieGenreNames || movieGenreNames.length === 0) && (
                    <p>No se encontraron géneros</p>
                  )}
                </div>

                {/* Botones para añadir las películas a las listas */}
                <div className="button-container">
                  <button className="my-button" onClick={() => {
                    aniadirListaFav();
                  }} title="Añadir a favoritas">
                    <BiHappyHeartEyes className="icon" />Añadir a favoritas
                  </button>
                  <button className="my-button" onClick={() => {
                    aniadirListaPendientes();
                  }} title="Añadir a pendientes">
                    <BsCardChecklist className='icon' />Añadir a pendientes
                  </button>
                </div>
                {/* Aparece los mensajes correspondientes a la funcion descrita anteriormente, según si existe la película en alguna lista o se ha añadido correctamente */}
                {showMessage && <p>{message}</p>}
              </div>
            </div>
          </CardContainer>
        )}

      </Contenido>
      {/* Boton que va hacia la pag anterior */}
      <BackButton onClick={navigateBack}>
        <BsFillArrowLeftSquareFill title='atras' />
      </BackButton>
      <Footer></Footer>
    </Contenedor >
  );
}

// Estilos
const Contenedor = styled.div``;

const Contenido = styled.div`
  margin-top: 3rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;

  .card {
    width: 80%;
    background: white;
    border-radius:1rem;
    box-shadow: 0 2px 5px 0 rgba(55, 136, 30, 0.846), 0 2px 10px 0 rgba(170, 22, 22, 0.737);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 8px 17px 0 rgb(103, 104, 103), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .photo {
      padding: 30px;
      width: 45%;
      text-align: center;
      float: left;

      img {
        max-width: 90%;
        border-radius: 5px;
      }
    }

    .description {
      border-left: 2px solid #efefef;
      padding: 30px;
      overflow: auto;

      h1 {
        color: rgb(48, 50, 62);
        font-size: 4rem;
        padding-top: 15px;
        margin: 0;
      }

      h2 {
        font-size: 1rem;
        color: #515151;
        margin: 0;
        padding-top: 15px;
        text-transform: uppercase;
        font-weight: 500;
      }

      h4 {
        margin: 0;
        color: #727272;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 14px;
      }

      p {
        font-size: 1rem;
        line-height: 20px;
        color: #727272;
        margin: 0;
        text-align: justify;
      }

      .genre-container {
        margin-bottom: 1rem;

        .genre-list {
          display: flex;
          flex-wrap: wrap;
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        ul {
          list-style-type: none;
        }

        li {
          float: left;
          border-radius:1rem;
          color: #95b88e;
          background-color: white;
          border: 3px dotted #aedaa6;
          padding: 10px;
          margin: 5px;
          margin-right: 1rem;
        }
      }

      .button-container {

        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
      }

      button {
        outline: 0;
        border: 0;
        background-color:rgb(48, 50, 62);
        border: 1px solid black;
        padding: 8px 0px;
        color: white;
        text-transform: uppercase;
        width: 125px;
        font-family: inherit;
        margin-right: 5px;
        transition: all 0.3s ease;
        font-weight: 500;
        margin-bottom: 2rem;
        margin-right: 1rem;

        &:hover {
          border: 1px solid rgb(48, 50, 62);
          background-color: white;
          color: rgb(48, 50, 62);
          cursor: pointer;
        }
      }
      .icon {
        font-size: 2.5rem;
        float: left;
        padding:5px;
      }
    }
  }
`;

const BackButton = styled.button`
  position: relative;
  bottom: 100px;
  left: 220px;
  background-color: transparent;
  border: none;
  font-size: 5rem;
  cursor: pointer;
  color: lime;
:hover {
  color: #01b801;
}
`;
