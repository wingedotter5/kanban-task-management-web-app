import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import Button from './Button';
import { DELETE_BOARD, GET_BOARDS } from '../queries';
import { useAppContext } from '../appContext';

const DeleteBoard = ({ closeDeleteBoardModal, currentBoard }) => {
  const { setCurrentBoardId } = useAppContext();
  const [deleteBoardMutation, { loading }] = useMutation(DELETE_BOARD, {
    refetchQueries: [{ query: GET_BOARDS }],
  });

  const deleteBoardHandler = () => {
    deleteBoardMutation({
      variables: {
        id: currentBoard.id,
      },
      onCompleted() {
        setCurrentBoardId(null);
        closeDeleteBoardModal();
      },
    });
  };

  return (
    <StyledDeleteBoard>
      <h3 className="text-[#ea5555]">Delete this board?</h3>
      <p className="font-bolder my-2 text-[#828fa3]">
        Are you sure you want to delete the &quot;{currentBoard.name}&quot;
        board? This action will remove all columns and tasks and cannot be
        reversed.
      </p>
      <div className="flex gap-4">
        <DeleteButton
          className="flex-1"
          $full
          onClick={deleteBoardHandler}
          loading={loading}
        >
          Delete
        </DeleteButton>
        <Button className="flex-1" $full onClick={closeDeleteBoardModal}>
          Cancel
        </Button>
      </div>
    </StyledDeleteBoard>
  );
};

const StyledDeleteBoard = styled.div`
  padding: 2rem;
  background-color: #2b2c37;
  border-radius: 0.5rem;

  @media screen and (max-width: 640px) {
    padding: 1rem;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ea5555;
  color: white;
`;

export default DeleteBoard;
