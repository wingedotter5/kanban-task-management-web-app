import styled from 'styled-components';
import { createPortal } from 'react-dom';

import Topbar from './Topbar';
import { useAppContext } from '../AppContext';
import Column from './Column';
import EditBoard from './EditBoard';
import Modal from './Modal';
import { useDisclosure } from '../hooks';

const Panel = () => {
  const { selectedBoardId, boards } = useAppContext();
  const columns = boards.find((b) => b.id === selectedBoardId).columns;
  const {
    isOpen: isEditBoardModalOpen,
    onOpen: showEditBoardModal,
    onClose: closeEditBoardModal,
  } = useDisclosure();

  return (
    <StyledPanel>
      <Topbar />
      <GridContainer>
        {columns.map((column) => (
          <Column column={column} key={column.id} />
        ))}
        <NewColumnButton onClick={showEditBoardModal}>
          + New Column
        </NewColumnButton>
      </GridContainer>
      {isEditBoardModalOpen &&
        createPortal(
          <Modal onClose={closeEditBoardModal}>
            <EditBoard closeEditBoardModal={closeEditBoardModal} />
          </Modal>,
          document.getElementById('portal'),
        )}
    </StyledPanel>
  );
};

const StyledPanel = styled.div`
  overflow: hidden;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px;
  grid-auto-columns: 300px;
  grid-auto-flow: column;
  gap: 1rem;
  padding: 1rem;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
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
