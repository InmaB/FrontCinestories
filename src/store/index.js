import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";
import { KEY_API, LENG_TMBD, URL_TMBD } from "../utils/tmbd-config";
import axios from "axios";

// initialState es el estado inicial del slice, que contiene varias propiedades para almacenar datos
const initialState = {
  movies: [],
  genresLoaded: false,
  moviesLoaded: false,
  genres: [],
  moviesByRated: [],
  tvByRated: [],
  upcoming:[],
  resultados:[],
  resultadosLoaded:false,
};


// Función auxiliar para procesar y transformar un array de datos en un nuevo formato
const createArrayFromRawData = (array, genres) => {
  // Para cada genreId, se busca en el array genres el objeto correspondiente que tenga el mismo id
  return array.map((movie) => {
    const movieGenres = movie.genre_ids
      .map((genreId) => {
        const genre = genres.find(({ id }) => id === genreId);
        console.log(genre)
        return genre ? genre.name : null;
      })
      .filter((genre) => genre !== null); // Filtrar los géneros nulos o indefinidos

    // Retorna la información de la película con los campos que hemos seleccionado de la API de The Movie Database
    return {
      id: movie.id,
      title: movie.title,
      name: movie.name,
      first_air_date:movie.first_air_date,
      poster_path: movie.poster_path,
      genres: movieGenres,
      backdrop_path: movie.backdrop_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
      original_title: movie.original_title,
      original_name: movie.original_name,
      media_type: movie.media_type,
    };
  });
};

// En todas las funciones siguientes se utiliza Redux Toolkit para realizar una solicitud HTTP y obtener las diferentes solicitudes de la API de The Movie Database

// Función que obtiene los géneros
export const getGenres = createAsyncThunk("cinestories/genres", async ({ type }) => {
  const { data } = await axios.get(`${URL_TMBD}genre/${type}/list?api_key=${KEY_API}&language=es`);
  return data.genres;
});


// Función que obtiene las películas, pasando por parámetro el type (tipo: movie o tv)
export const fetchMovies = createAsyncThunk("cinestories/trending", async ({ type }, thunkApi) => {
  // Obtiene los géneros del estado actual
  const { cinestories: { genres } } = thunkApi.getState();
  // Pags que va a iterar
  const totalPag = 5;
  // Array que contendrá películas
  const moviesArray = [];

  // Obtiene los resultados de películas de cada pag y las almacena en el array
  for (let i = 1; i <= totalPag; i++) {
    const response = await axios.get(`${URL_TMBD}trending/${type}/day?api_key=${KEY_API}&${LENG_TMBD}&page=${i}`);
    const results = response.data.results;
    const movies = createArrayFromRawData(results, genres);
    moviesArray.push(...movies);
  }

  return moviesArray;
});

// Función que obtiene las películas mejores valoradas
export const fetchMovieByRated = createAsyncThunk("cinestories/fetchMovieByRated", async (_, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  // https://api.themoviedb.org/3/movie/top_rated?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&page=1&region=ES&
  const response = await axios.get(`${URL_TMBD}movie/top_rated?api_key=${KEY_API}&${LENG_TMBD}&page=1&region=ES&`);
  const results = response.data.results;
  const movies = createArrayFromRawData(results, genres);
  return movies;
});

// Función que obtiene las series mejores valoradas
export const fetchTvByRated = createAsyncThunk("cinestories/fetchTvByRated", async (_, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  // https://api.themoviedb.org/3/tv/top_rated?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&page=1&region=ES&
  const response = await axios.get(`${URL_TMBD}/tv/top_rated?api_key=${KEY_API}&${LENG_TMBD}&page=1&region=ES&`);
  const results = response.data.results;
  const movies = createArrayFromRawData(results, genres);
  return movies;
});

// Función que obtiene las películas a estrenar
export const fetchUpcoming = createAsyncThunk("cinestories/fetchUpcoming", async (_, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  // https://api.themoviedb.org/3/movie/upcoming?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&page=1&region=ES&
  const response = await axios.get(`${URL_TMBD}movie/upcoming?api_key=${KEY_API}&${LENG_TMBD}&page=1&region=ES&`);
  const results = response.data.results;
  const movies = createArrayFromRawData(results, genres);
  return movies;
});

// Función que obtiene los géneros con el parámetro type (tipo: movie o tv)
export const fetchMoviesByGenre = createAsyncThunk("cinestories/fetchMoviesByGenre", async ({ type, genres_id  }, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  const totalPag = 5;
  const moviesArray = [];

  // Obtiene los resultados de películas de cada pag y las almacena en el array
  for (let i = 1; i <= totalPag; i++) {
    // https://api.themoviedb.org/3/discover/movie?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&region=ES&with_genres=18&page=2
    const response = await axios.get(`${URL_TMBD}discover/${type}?api_key=${KEY_API}&${LENG_TMBD}&region=ES&with_genres=${genres_id}&page=${i}`);
    const results = response.data.results;
    const movies = createArrayFromRawData(results, genres);
    moviesArray.push(...movies);
  }

  return moviesArray;
});

// Función que busca una película, serie o programa
export const searchMovies = createAsyncThunk("cinestories/search", async ({ searchQuery, type }, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  const totalPages = 10;
  const results = [];

    // Obtiene los resultados de películas de cada pag y las almacena en el array
  for (let page = 1; page <= totalPages; page++) {
    const response = await axios.get(
      `${URL_TMBD}search/${type}?api_key=${KEY_API}&${LENG_TMBD}&region=ES&query=${searchQuery}&page=${page}`
    );

    // Obtiene los resultados de la página actual
    const { data: { results: pageResults } } = response;
    // Agregar los resultados al array results
    results.push(...pageResults);
  }

  return results;
});


/////////// USUARIO
// Función que realiza una solicitud HTTP GET a la ruta creada por nuestra API REST para obtener las películas favoritas del usuario
export const getUserFavoritas = createAsyncThunk("cinestories/favs", async (email) => {
  const { data: { movies } } = await axios.get(`http://localhost:5000/api/user/favoritas/${email}`);
  console.log(movies)
  return movies;
});

// Función que realiza una solicitud HTTP GET a la ruta creada por nuestra API REST para obtener las películas pendientes del usuario
export const getUserPendientes = createAsyncThunk("cinestories/pendientes", async (email) => {
  const { data: { movies } } = await axios.get(`http://localhost:5000/api/user/pendientes/${email}`);
  return movies;
});

// Función que realiza una solicitud HTTP DELETE a la ruta creada por nuestra API REST para eliminar las películas favoritas del usuario
export const removeMovieFromLiked = createAsyncThunk(
  'cinestories/deleteLiked',
  async ({ movieId, email }) => {
    const response = await axios.delete('http://localhost:5000/api/user/eliminarFav', { data: { email, movieId } });
    return response.data.movies;
  }
);

// Función que realiza una solicitud HTTP DELETE a la ruta creada por nuestra API REST para eliminar las películas pendientes del usuario
export const removeMovieFromToWatch = createAsyncThunk(
  'cinestories/deleteToWatch',
  async ({ movieId, email }) => {
const response = await axios.delete('http://localhost:5000/api/user/eliminarPendiente', { data: { email, movieId } });
console.log(response)
    return response.data.movies;

  }
);

// Función que realiza una solicitud HTTP GET a la ruta creada por nuestra API REST para obtener el nombre del usuario por su email
export const getUserByEmail = async (email) => {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await axios.get(`http://localhost:5000/api/user/getUserByEmail/${encodedEmail}`);

    if (response.data && response.data.username) {
      return response.data.username;
    } else {
      throw new Error('Respuesta inválida del servidor');
    }
  } catch (error) {
    console.error('Error al obtener el nombre de usuario por correo electrónico:', error);
    throw error;
  }
};

// Función que realiza una solicitud HTTP PUT a la ruta creada por nuestra API REST para editar el username
export const cambiarUsername = createAsyncThunk(
  'cinestories/cambiarUsername',
  async ({ email, newUserName }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/changeUserName/${email}`, { newUserName });
      return response.data.user;
    } catch (error) {
      throw new Error('Error al cambiar el nombre de usuario.');
    }
  }
);

// Función que realiza una solicitud HTTP PUT a la ruta creada por nuestra API REST para editar el avatar
export const cambiarUserImagen= createAsyncThunk(
  'cinestories/cambiarUserImagen',
  async ({ email, newProfileImage }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/changeProfileImage/${email}`, { newProfileImage });
      return response.data.user;
    } catch (error) {
      throw new Error('Error al cambiar la imagen de usuario.');
    }
  }
);

/////////// SLICE
// Configuración del slice
const cineStoriesSlice = createSlice({
  name: "cinestories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.moviesLoaded = true;
      console.log(action.payload);
    });
    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.resultados = action.payload;
      state.resultadosLoaded = true;
    });
    builder.addCase(getUserFavoritas.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserPendientes.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchMovieByRated.fulfilled, (state, action) => {
      state.moviesByRated = action.payload;
    });
    builder.addCase(fetchTvByRated.fulfilled, (state, action) => {
      state.tvByRated = action.payload;
    });
    builder.addCase(fetchUpcoming.fulfilled, (state, action) => {
      state.upcoming = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromToWatch.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },

});

export const store = configureStore({
  reducer: {
    cinestories: cineStoriesSlice.reducer,
  },
});

