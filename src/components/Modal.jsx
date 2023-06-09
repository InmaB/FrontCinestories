import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { AiFillCloseCircle } from 'react-icons/ai'
import RiseLoader from 'react-spinners/RiseLoader';

// Estilos
const ModalOverlay = styled.div`
  position: fixed;
  margin: auto;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  color: black;
  padding: 20px;
  border-radius: 4px;
  z-index: 99999;
  max-height: 80%;
  overflow-y: auto;
  .close-icon {
  color: lime;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 50px;
  cursor: pointer;
}
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Se le pasa varios props como argumentos
const Modal = ({ open, onClose, loading, children }) => {
    if (!open) {
        return null;
    }

    // Se utiliza ReactDOM.createPortal para renderizar el contenido del modal en un portal. Documentación de Modal para react"
    return ReactDOM.createPortal(
        <ModalOverlay>
            <ModalContent>
                {/* Icono para cerrar */}
                <AiFillCloseCircle className="close-icon" onClick={onClose} />
                {/* Si loading es true se muestra el spinner, si loading es false, se muestra el contenido proporcionado como children */}
                {loading ? (
                    <SpinnerContainer>
                        <RiseLoader color="lime" />
                    </SpinnerContainer>
                ) : (
                    children
                )}
            </ModalContent>
        </ModalOverlay>,
        document.getElementById("modal-root")
    );
};
export default Modal;
