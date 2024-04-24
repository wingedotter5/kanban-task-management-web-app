import { createPortal } from 'react-dom';
import styled from 'styled-components';

import Modal from './Modal';
import AddNewTask from './AddNewTask';
import { useDisclosure } from '../hooks';
import EditBoard from './EditBoard';
import Button from './Button';
import IconButton from './IconButton';
import FlyOut from './FlyOut';
import DeleteBoard from './DeleteBoard';
import IconAdd from './icons/IconAdd';
import IconLogo from './icons/IconLogo';
import IconChevronDown from './icons/IconChevronDown';
import MobileBoardSwitcher from './MobileBoardSwitcher';

const Topbar = ({ currentBoard }) => {
  const {
    isOpen: isAddNewTaskModalOpen,
    onOpen: showAddNewTaskModal,
    onClose: closeAddNewTaskModal,
  } = useDisclosure();
  const {
    isOpen: isEditBoardModalOpen,
    onOpen: showEditBoardModal,
    onClose: closeEditBoardModal,
  } = useDisclosure();
  const {
    isOpen: isDeleteBoardModalOpen,
    onOpen: showDeleteBoardModal,
    onClose: closeDeleteBoardModal,
  } = useDisclosure();
  const {
    isOpen: isMobileBoardSwitcherOpen,
    onOpen: showMobileBoardSwitcher,
    onClose: closeMobileBoardSwitcher,
  } = useDisclosure();

  return (
    <StyledTopbar>
      <div className="flex items-center gap-2">
        <IconLogo className="sm:hidden" />
        <h2 className="text-2xl font-bold text-white">{currentBoard?.name}</h2>
        <IconButton className="sm:hidden" onClick={showMobileBoardSwitcher}>
          <IconChevronDown />
        </IconButton>
      </div>
      {currentBoard ? (
        <div className="flex items-center gap-4">
          <AddNewTaskButton
            className="hidden sm:block"
            onClick={showAddNewTaskModal}
          >
            +Add New Task
          </AddNewTaskButton>
          <div className="sm:hidden">
            <Button
              $primary
              onClick={showAddNewTaskModal}
              className="px-4 py-2"
            >
              <IconAdd />
            </Button>
          </div>
          <FlyOut>
            <FlyOut.Toggle />
            <FlyOut.List>
              <FlyOut.Item onClick={showEditBoardModal}>Edit board</FlyOut.Item>
              <FlyOut.Item onClick={showDeleteBoardModal}>
                Delete board
              </FlyOut.Item>
            </FlyOut.List>
          </FlyOut>
        </div>
      ) : null}
      {createPortal(
        <Modal onClose={closeAddNewTaskModal} isOpen={isAddNewTaskModalOpen}>
          <AddNewTask
            closeAddNewTaskModal={closeAddNewTaskModal}
            currentBoard={currentBoard}
          />
        </Modal>,
        document.getElementById('portal'),
      )}
      {createPortal(
        <Modal onClose={closeEditBoardModal} isOpen={isEditBoardModalOpen}>
          <EditBoard
            closeEditBoardModal={closeEditBoardModal}
            currentBoard={currentBoard}
          />
        </Modal>,
        document.getElementById('portal'),
      )}
      {createPortal(
        <Modal onClose={closeDeleteBoardModal} isOpen={isDeleteBoardModalOpen}>
          <DeleteBoard
            closeDeleteBoardModal={closeDeleteBoardModal}
            currentBoard={currentBoard}
          />
        </Modal>,
        document.getElementById('portal'),
      )}
      {createPortal(
        <Modal
          onClose={closeMobileBoardSwitcher}
          isOpen={isMobileBoardSwitcherOpen}
        >
          <MobileBoardSwitcher
            closeMobileBoardSwitcher={closeMobileBoardSwitcher}
          />
        </Modal>,
        document.getElementById('portal'),
      )}
    </StyledTopbar>
  );
};

const StyledTopbar = styled.div`
  color: white;
  background-color: #2b2c37;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  border-bottom: 1px solid #444;

  @media screen and (max-width: 640px) {
    height: 4rem;
  }
`;

const AddNewTaskButton = styled.button`
  color: white;
  font-weight: bolder;
  background-color: #635fc7;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 1e3px;
  cursor: pointer;
`;

export default Topbar;
