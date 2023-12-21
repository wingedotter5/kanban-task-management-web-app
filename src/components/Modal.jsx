import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  margin: 1rem auto;
  max-width: 500px;

  @media screen and (max-width: 375px) {
    width: 85%;
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
