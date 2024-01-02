import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Button from './Button';
import Flex from './Flex';
import { deleteBoard, selectedBoard } from '../redux/boardSlice';

const DeleteBoard = ({ closeDeleteBoardModal }) => {
  const dispatch = useDispatch();

  const board = useSelector(selectedBoard);

  return (
    <StyledDeleteBoard>
      <h3>Delete this board?</h3>
      <p>
        Are you sure you want to delete the "{board.name}" board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <Flex $gap="1rem">
        <DeleteButton
          $full
          onClick={() => {
            dispatch(deleteBoard({ id: board.id }));
            closeDeleteBoardModal();
          }}
        >
          Delete
        </DeleteButton>
        <Button $full onClick={closeDeleteBoardModal}>
          Cancel
        </Button>
      </Flex>
    </StyledDeleteBoard>
  );
};

const StyledDeleteBoard = styled.div`
  padding: 2rem;
  @media screen and (max-width: 425px) {
    padding: 1rem;
  }
  background-color: #2b2c37;
  border-radius: 0.5rem;

  > h3 {
    color: #ea5555;
  }

  > p {
    color: #828fa3;
    margin: 1rem 0;
    font-size: 14px;
    font-weight: bolder;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ea5555;
  color: white;
`;

export default DeleteBoard;
