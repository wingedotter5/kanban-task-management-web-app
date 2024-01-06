import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import BoardList from './BoardList';
import BoardListItem from './BoardListItem';
import IconBoard from './icons/IconBoard';
import AddNewBoard from './AddNewBoard';
import { useDisclosure } from '../hooks';
import Modal from './Modal';
import { selectBoard } from '../redux/boardSlice';

const MobileBoardSwitcher = ({ closeMobileBoardSwitcher }) => {
  const dispatch = useDispatch();

  const boards = useSelector((s) => s.board.boards);
  const selectedBoardId = useSelector((s) => s.board.selectedBoardId);

  const {
    isOpen: isAddNewBoardModalOpen,
    onOpen: showAddNewBoardModal,
    onClose: closeAddNewBoardModal,
  } = useDisclosure();

  return (
    <>
      <StyledMobileBoardSwitcher>
        <Header>ALL BOARDS ({boards.length})</Header>
        <CreateNewBoardButton
          onClick={() => {
            showAddNewBoardModal();
          }}
        >
          <IconBoard />
          +Create New Board
        </CreateNewBoardButton>
        <BoardList>
          {boards.map((b) => (
            <BoardListItem
              key={b.id}
              onClick={() => {
                dispatch(
                  selectBoard({
                    id: b.id,
                  }),
                );
                closeMobileBoardSwitcher();
              }}
              board={b}
              active={b.id === selectedBoardId}
            />
          ))}
        </BoardList>
      </StyledMobileBoardSwitcher>
      {createPortal(
        <Modal onClose={closeAddNewBoardModal} isOpen={isAddNewBoardModalOpen}>
          <AddNewBoard onClose={closeAddNewBoardModal} />
        </Modal>,
        document.getElementById('portal'),
      )}
    </>
  );
};

const StyledMobileBoardSwitcher = styled.div`
  padding: 2rem;
  @media screen and (max-width: 640px) {
    padding: 1rem;
  }
  background-color: #2b2c37;
  border-radius: 0.5rem;
`;

const Header = styled.header`
  color: #828fa3;
  letter-spacing: 0.25em;
  margin-bottom: 1rem;
  font-size: 12px;
  font-weight: bolder;
  padding: 0 1rem;
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

export default MobileBoardSwitcher;
