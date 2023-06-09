import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, searchMovies } from "../store";
import Modal from "./Modal";
import styled from "styled-components";
import GridResultados from "./CarouselYGrid/GridResultados";
import RiseLoader from "react-spinners/RiseLoader";

const Buscador = (props) => {

    // Se declara funciones propias de react
    const dispatch = useDispatch();

    // Se utiliza useState para declarar múltiples variables de estado
    const [searchQuery, setSearchQuery] = useState("");
    const searchResults = useSelector((state) => state.cinestories.resultados);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // useEffect se ejecuta una vez, al montar el componente, para enviar getGenres() utilizando dispatch para obtener los géneros de películas
    useEffect(() => {
        dispatch(getGenres());
    }, []);

    // useEffect para establecer el estado que simula un tiempo de carga de 2 seg y muestra el spinner
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    // Maneja la búsqueda
    const handleSearch = () => {
        if (searchQuery) {
            setModalOpen(true);
            // Establece isLoading a true cuando se inicia la búsqueda
            setLoading(true);
            // se le pasa las props de type
            dispatch(searchMovies({ searchQuery, type: props.type }))
                .then((response) => {
                    // Al completar la búsqueda se actualiza el estado de loading
                    setLoading(false);
                })
                .catch((error) => {
                    // Si se produce un error, se actualiza a false
                    setLoading(false);
                    console.error(error);
                });
        }
    };

    // Para el cierre del modal
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <Contenedor>
            {/* Formulario  */}
            <input
                type="text"
                placeholder="Buscador"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>

            {/* Modal con distintas props: open (abierto o cerrado), onClose (cerrará el Modal) y loading (si se está cargando el contendo dentro del Modal) */}
            <Modal open={modalOpen} onClose={closeModal} loading={loading}>
                <div className="modal-contenido">
                    {/* Si loading es true, muestra el Spinner. Si loading es false y la longitud de searchResults es 0, se muestra "No se encontraron resultados". Si loading es false y la longitud de searchResults no es 0, se muestra el componente GridResultados con los resultados de la búsqueda. */}

                    {loading ? (
                        <SpinnerContainer>
                            {/* Spinner  */}
                            <RiseLoader color="lime" />
                        </SpinnerContainer>
                    ) : searchResults.length === 0 ? (
                        <p>No se encontraron resultados</p>
                    ) : (
                        <>
                            <GridResultados searchResults={searchResults} />
                        </>
                    )}
                </div>
            </Modal>
        </Contenedor>
    );
};

// Estilos
export default Buscador;

const Contenedor = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 1rem;

  h1 {
    margin-right: 5px;
  }

  input {
    padding: 4px;
    margin-right: 5px;
    background-color: #1a1d29;
    color: whitesmoke;
    border: 2px solid whitesmoke;
    ::placeholder {
      color: rgb(128, 134, 167);
    }
  }

  select {
    padding: 5px;
    margin-right: 5px;
    background-color: #1a1d29;
    border: 2px solid whitesmoke;
    color: whitesmoke;
  }

  button {
    padding: 5px;
    background-color: #1a1d29;
    border: 2px solid whitesmoke;
    color: whitesmoke;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
