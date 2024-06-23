import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useQuery } from '@apollo/client';

import Topbar from './Topbar';
import Column from './Column';
import EditBoard from './EditBoard';
import Modal from './Modal';
import { useDisclosure } from '../hooks';
import { useAppContext } from '../appContext';
import { GET_BOARD } from '../queries';
import Loader from './Loader';

const Panel = () => {
  const {
    isOpen: isEditBoardModalOpen,
    onOpen: showEditBoardModal,
    onClose: closeEditBoardModal,
  } = useDisclosure();
  const { currentBoardId } = useAppContext();
  const { data, loading } = useQuery(GET_BOARD, {
    variables: {
      id: currentBoardId,
    },
    skip: !currentBoardId,
  });

  return (
    <StyledPanel>
      <Topbar currentBoard={data?.getBoard} />
      {loading && (
        <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center sm:h-[calc(100vh-5rem)]">
          <Loader $size="40px" />
        </div>
      )}
      {!loading && currentBoardId ? (
        <GridContainer>
          {data.getBoard.columns.map((column) => (
            <Column
              key={column.id}
              currentBoard={data.getBoard}
              column={column}
            />
          ))}
          <NewColumnButton onClick={showEditBoardModal}>
            + New Column
          </NewColumnButton>
        </GridContainer>
      ) : null}
      {createPortal(
        <Modal onClose={closeEditBoardModal} isOpen={isEditBoardModalOpen}>
          <EditBoard
            currentBoard={data?.getBoard}
            closeEditBoardModal={closeEditBoardModal}
          />
        </Modal>,
        document.getElementById('portal'),
      )}
    </StyledPanel>
  );
};

const StyledPanel = styled.div`
  overflow-x: hidden;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px;
  grid-auto-columns: 300px;
  grid-auto-flow: column;
  gap: 1rem;
  padding: 1rem;
  overflow-x: auto;
  min-height: calc(100vh - 5rem);

  @media screen and (max-width: 640px) {
    min-height: calc(100vh - 4rem);
  }
`;

const NewColumnButton = styled.button`
  color: #828fa3;
  font-weight: bolder;
  background: linear-gradient(
    180deg,
    rgba(43, 44, 55, 0.25),
    rgba(43, 44, 55, 0.125)
  );
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    color: #635fc7;
  }
`;

export default Panel;
