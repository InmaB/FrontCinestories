import React, { useState } from 'react';
import styled from 'styled-components';
import PosterResultados from '../CarouselYGrid/PosterResultados';

// Se le pasa como props searchResults que representa los resultados de búsqueda.
export default function GridResultados({ searchResults }) {
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula el índice de los elementos a mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Mostrará el número de pelis en la página actual
  const moviesToDisplay = searchResults.slice(startIndex, endIndex);

  // Función para manejar el cambio de pag
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calcula el nª total de pág dividiendo la longitud de los resultados de búsqueda por el número de elementos por página y redondeando hacia arriba
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <Contenedor>
      {/* Se mapea moviesToDisplay y se muestra en el componente PosterResultados */}
      <div className="grid flex">
        {moviesToDisplay.map((movie, index) => (
          <div key={movie.id}>
            <PosterResultados movieData={movie} index={index} />
          </div>
        ))}
      </div>

      <Pagination>
        {/* Se crea un arreglo con la longitud igual al número total de páginas, y se realiza un mapeo para generar los botones de las pags */}
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            active={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Contenedor>
  );
}

// Estilos
const Contenedor = styled.div`
  .grid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(8, 1fr); /* Mostrar 8 elementos por fila */
    gap: 20px; /* Espacio entre los elementos del grid */
  }
`;

const Pagination = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem;
  background-color: ${({ active }) => (active ? 'gray' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border: 1px solid gray;
  cursor: pointer;
`;
