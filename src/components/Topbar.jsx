import { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Flex from './Flex';
import IconEllipsis from './icons/IconEllipsis';
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
import { selectedBoard } from '../redux/boardSlice';

const Topbar = () => {
  const board = useSelector(selectedBoard);

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
      <Flex $items="center" $gap="0.5rem">
        <IconLogo className="mobile-only" />
        <h2>{board.name}</h2>
        <IconButton className="mobile-only" onClick={showMobileBoardSwitcher}>
          <IconChevronDown />
        </IconButton>
      </Flex>
      <Flex $gap="1rem" $items="center">
        <AddNewTaskButton onClick={showAddNewTaskModal}>
          +Add New Task
        </AddNewTaskButton>
        <Button
          onClick={showAddNewTaskModal}
          $primary
          style={{ padding: '0.5rem 1rem' }}
          className="mobile-only"
        >
          <IconAdd />
        </Button>
        <FlyOut>
          <FlyOut.Toggle />
          <FlyOut.List>
            <FlyOut.Item onClick={showEditBoardModal}>Edit board</FlyOut.Item>
            <FlyOut.Item onClick={showDeleteBoardModal}>
              Delete board
            </FlyOut.Item>
          </FlyOut.List>
        </FlyOut>
      </Flex>
      {isAddNewTaskModalOpen &&
        createPortal(
          <Modal onClose={closeAddNewTaskModal}>
            <AddNewTask onClose={closeAddNewTaskModal} />
          </Modal>,
          document.getElementById('portal'),
        )}
      {isEditBoardModalOpen &&
        createPortal(
          <Modal onClose={closeEditBoardModal}>
            <EditBoard closeEditBoardModal={closeEditBoardModal} />
          </Modal>,
          document.getElementById('portal'),
        )}
      {isDeleteBoardModalOpen &&
        createPortal(
          <Modal onClose={closeDeleteBoardModal}>
            <DeleteBoard closeDeleteBoardModal={closeDeleteBoardModal} />
          </Modal>,
          document.getElementById('portal'),
        )}
      {isMobileBoardSwitcherOpen &&
        createPortal(
          <Modal onClose={closeMobileBoardSwitcher}>
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

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

export default Topbar;
