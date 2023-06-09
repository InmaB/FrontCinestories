import React from 'react';
import styled from 'styled-components';
import PosterGeneral from './PosterGeneral';

export default function Grid({ movies, visibleMovies }) {

  return (
    <Contenedor>
      {/* Se realiza un mapeo sobre el arreglo de películas movies utilizando el método slice para obtener solo las primeras "visibleMovies" definidas en las páginas "Pelis" y "SeriesyTv". Se muestran las películas mediante el componente PosterGeneral */}
      <div className="grid flex">
        {movies.slice(0, visibleMovies).map((movie, index) => {

          return <PosterGeneral movieData={movie} index={index} key={movie.id}> </PosterGeneral>
        })}
      </div>

    </Contenedor>
  )
}
// Estilos
const Contenedor = styled.div`
.grid {
  margin-top:2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Mostrar 5 elementos por fila */
  gap: 20px; /* Espacio entre los elementos del grid */
}
`;
