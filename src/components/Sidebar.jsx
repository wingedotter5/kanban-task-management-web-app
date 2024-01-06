import { useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import IconBoard from './icons/IconBoard';
import Modal from './Modal';
import AddNewBoard from './AddNewBoard';
import { useDisclosure } from '../hooks';
import IconLogoLight from './icons/IconLogoLight';
import Flex from './Flex';
import BoardListItem from './BoardListItem';
import BoardList from './BoardList';
import { selectBoard } from '../redux/boardSlice';

const Sidebar = () => {
  const {
    isOpen,
    onOpen: showCreateBoardModal,
    onClose: closeCreateBoardModal,
  } = useDisclosure();

  const dispatch = useDispatch();

  const boards = useSelector((s) => s.board.boards);
  const selectedBoardId = useSelector((s) => s.board.selectedBoardId);

  const switchBoard = (id) => {
    dispatch(selectBoard({ id }));
  };

  return (
    <StyledSidebar>
      <Flex $items="center" style={{ height: '5rem', padding: '1rem' }}>
        <IconLogoLight />
      </Flex>
      <Info>All Boards ({boards.length})</Info>
      <CreateNewBoardButton onClick={showCreateBoardModal}>
        <IconBoard />
        +Create New Board
      </CreateNewBoardButton>
      <BoardList>
        {boards.map((board) => (
          <BoardListItem
            active={board.id === selectedBoardId}
            key={board.name}
            onClick={() => switchBoard(board.id)}
            board={board}
          />
        ))}
      </BoardList>
      {createPortal(
        <Modal onClose={closeCreateBoardModal} isOpen={isOpen}>
          <AddNewBoard onClose={closeCreateBoardModal} />
        </Modal>,
        document.getElementById('portal'),
      )}
    </StyledSidebar>
  );
};

const StyledSidebar = styled.aside`
  background-color: #2b2c37;
  width: 16rem;

  @media screen and (max-width: 640px) {
    display: none;
  }
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

const Info = styled.span`
  color: #828fa3;
  letter-spacing: 0.25em;
  margin-bottom: 1rem;
  font-size: 14px;
  font-weight: bolder;
  padding: 0 1rem;
  display: block;
`;

export default Sidebar;
