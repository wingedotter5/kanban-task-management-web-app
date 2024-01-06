import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
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

const ModalBody = styled(motion.div)`
  width: 100%;
  max-width: 500px;

  @media screen and (max-width: 640px) {
    width: 90%;
  }
`;

const zoomIn = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

const Modal = ({ children, onClose, isOpen }) => {
  return (
    <AnimatePresence
      initial={false}
      mode="wait"
      // onExitComplete={() => null}
    >
      {isOpen ? (
        <Overlay onClick={onClose}>
          <ModalBody
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            variants={zoomIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </ModalBody>
        </Overlay>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
