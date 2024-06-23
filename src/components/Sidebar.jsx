import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import IconBoard from './icons/IconBoard';
import Modal from './Modal';
import AddNewBoard from './AddNewBoard';
import { useDisclosure } from '../hooks';
import IconLogoLight from './icons/IconLogoLight';
import BoardListItem from './BoardListItem';
import BoardList from './BoardList';
import { useAppContext } from '../appContext';
import { GET_BOARDS } from '../queries';
import Loader from './Loader';

const Sidebar = () => {
  const navigate = useNavigate();
  const {
    isOpen,
    onOpen: showAddNewBoardModal,
    onClose: closeAddNewBoardModal,
  } = useDisclosure();
  const { currentBoardId, setCurrentBoardId, currentUser, setCurrentUser } =
    useAppContext();
  const { client, data, loading, error } = useQuery(GET_BOARDS, {
    onCompleted({ getBoards }) {
      if (getBoards.length > 0) {
        setCurrentBoardId(getBoards[0].id);
      }
    },
  });

  if (error) return <h1>Error</h1>;

  const switchBoard = (id) => {
    setCurrentBoardId(id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currenUser');
    setCurrentBoardId(null);
    setCurrentUser(null);
    client.clearStore();
    navigate('/login', { replace: true });
  };

  return (
    <StyledSidebar>
      <header>
        <div className="flex h-20 items-center p-4">
          <IconLogoLight />
        </div>
        <Info>All Boards ({data?.getBoards?.length || 0})</Info>
        <CreateNewBoardButton onClick={showAddNewBoardModal}>
          <IconBoard />
          +Create New Board
        </CreateNewBoardButton>
      </header>
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader $size="40px" />
        </div>
      ) : (
        <>
          <BoardList>
            {data.getBoards.map((board) => (
              <BoardListItem
                active={board.id === currentBoardId}
                key={board.id}
                onClick={() => switchBoard(board.id)}
                board={board}
              />
            ))}
          </BoardList>
        </>
      )}
      <footer className="p-4">
        <button onClick={logout} className="text-white">
          {`Logout (${currentUser?.username})`}
        </button>
      </footer>
      {createPortal(
        <Modal onClose={closeAddNewBoardModal} isOpen={isOpen}>
          <AddNewBoard closeAddNewBoardModal={closeAddNewBoardModal} />
        </Modal>,
        document.getElementById('portal'),
      )}
    </StyledSidebar>
  );
};

const StyledSidebar = styled.aside`
  background-color: #2b2c37;
  border-right: 1px solid #444;
  min-width: 20rem;
  height: 100vh;
  position: sticky;
  top: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;

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
