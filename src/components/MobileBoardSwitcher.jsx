import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import BoardList from './BoardList';
import BoardListItem from './BoardListItem';
import IconBoard from './icons/IconBoard';
import AddNewBoard from './AddNewBoard';
import { useDisclosure } from '../hooks';
import Modal from './Modal';
import { useAppContext } from '../AppContext';

const GET_BOARDS = gql`
  query GetBoards {
    getBoards {
      id
      name
    }
  }
`;

const MobileBoardSwitcher = ({ closeMobileBoardSwitcher }) => {
  const navigate = useNavigate();
  const {
    isOpen: isAddNewBoardModalOpen,
    onOpen: showAddNewBoardModal,
    onClose: closeAddNewBoardModal,
  } = useDisclosure();
  const { currentBoardId, setCurrentBoardId, currentUser, setCurrentUser } =
    useAppContext();
  const { client, data, loading, error } = useQuery(GET_BOARDS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  const switchBoard = (id) => {
    setCurrentBoardId(id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCurrentBoardId(null);
    client.clearStore();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <StyledMobileBoardSwitcher>
        <header>
          <Heading>ALL BOARDS ({data.getBoards.length})</Heading>
          <CreateNewBoardButton
            onClick={() => {
              showAddNewBoardModal();
            }}
          >
            <IconBoard />
            +Create New Board
          </CreateNewBoardButton>
        </header>
        <BoardList>
          {data.getBoards.map((board) => (
            <BoardListItem
              key={board.id}
              onClick={() => {
                switchBoard(board.id);
                closeMobileBoardSwitcher();
              }}
              board={board}
              active={board.id === currentBoardId}
            />
          ))}
        </BoardList>
        <footer className="p-4">
          <button onClick={logout} className="text-white">
            {`Logout (${currentUser.username})`}
          </button>
        </footer>
      </StyledMobileBoardSwitcher>
      {createPortal(
        <Modal onClose={closeAddNewBoardModal} isOpen={isAddNewBoardModalOpen}>
          <AddNewBoard closeAddNewBoardModal={closeAddNewBoardModal} />
        </Modal>,
        document.getElementById('portal'),
      )}
    </>
  );
};

const StyledMobileBoardSwitcher = styled.div`
  padding: 2rem;
  background-color: #2b2c37;
  border-radius: 0.5rem;
  display: grid;
  grid-template-rows: auto 1fr auto;

  @media screen and (max-width: 640px) {
    padding: 1rem;
  }
`;

const Heading = styled.h2`
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
