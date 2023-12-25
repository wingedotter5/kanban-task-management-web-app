import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-x: auto;
`;

const ModalBody = styled.div`
  width: 100%;
  max-width: 500px;

  @media screen and (max-width: 375px) {
    width: 90%;
  }
`;

const Modal = ({ children, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalBody
        onClick={(ev) => {
          ev.stopPropagation();
        }}
      >
        {children}
      </ModalBody>
    </Overlay>
  );
};

export default Modal;
