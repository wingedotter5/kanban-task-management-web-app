import { useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

import { useAppContext } from '../AppContext';
import IconBoard from './icons/IconBoard';
import Modal from './Modal';
import AddNewBoard from './AddNewBoard';
import { useDisclosure } from '../hooks';

const Sidebar = () => {
  const { boards, selectBoard, selectedBoardId } = useAppContext();
  const {
    isOpen,
    onOpen: showCreateBoardModal,
    onClose: closeCreateBoardModal,
  } = useDisclosure();

  return (
    <StyledSidebar>
      <CreateNewBoardButton onClick={showCreateBoardModal}>
        <IconBoard />
        +Create New Board
      </CreateNewBoardButton>
      <BoardList>
        {boards.map((board) => (
          <BoardListItem
            active={board.id === selectedBoardId}
            key={board.name}
            onClick={() => selectBoard(board.id)}
            board={board}
          />
        ))}
      </BoardList>
      {isOpen &&
        createPortal(
          <Modal onClose={closeCreateBoardModal}>
            <AddNewBoard onClose={closeCreateBoardModal} />
          </Modal>,
          document.getElementById('portal'),
        )}
    </StyledSidebar>
  );
};

const BoardListItem = ({ board, active, onClick }) => {
  return (
    <StyledBoardListItem onClick={onClick} $active={active}>
      <IconBoard />
      <span>{board.name}</span>
    </StyledBoardListItem>
  );
};

const StyledSidebar = styled.aside`
  background-color: #2b2c37;
  min-height: 100vh;
  width: 16rem;
`;

const CreateNewBoardButton = styled.button`
  background-color: transparent;
  border: none;
  color: #635fc7;
  cursor: pointer;
  padding: 1rem;
  font-weight: bolder;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  border-top-right-radius: 1e3px;
  border-bottom-right-radius: 1e3px;

  &:hover {
    background-color: white;
  }
`;

const BoardList = styled.ul`
  list-style-type: none;
`;

const StyledBoardListItem = styled.li`
  background-color: ${(props) => (props.$active ? '#635fc7' : '')};
  color: ${(props) => (props.$active ? 'white' : '#828fa3')};
  font-weight: bolder;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  border-top-right-radius: 1e3px;
  border-bottom-right-radius: 1e3px;

  &:hover {
    color: #635fc7;
    background-color: white;
  }
`;

export default Sidebar;
