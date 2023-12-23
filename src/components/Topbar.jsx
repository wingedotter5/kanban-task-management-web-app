import { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import Flex from './Flex';
import IconEllipsis from './icons/IconEllipsis';
import { useAppContext } from '../AppContext';
import Modal from './Modal';
import AddNewTask from './AddNewTask';
import { useDisclosure } from '../hooks';
import EditBoard from './EditBoard';
import Button from './Button';
import IconButton from './IconButton';
import FlyOut from './FlyOut';
import DeleteBoard from './DeleteBoard';

const Topbar = () => {
  const { selectedBoardId, boards } = useAppContext();
  const selectedBoard = boards.find((b) => b.id === selectedBoardId);
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

  return (
    <StyledTopbar>
      <h2>{selectedBoard.name}</h2>
      <Flex $gap="1rem" $items="center">
        <AddNewTaskButton onClick={showAddNewTaskModal}>
          +Add New Task
        </AddNewTaskButton>
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
