import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import FormControl from './FormControl';
import Label from './Label';
import Input from './Input';
import Flex from './Flex';
import IconButton from './IconButton';
import IconCross from './icons/IconCross';
import Button from './Button';
import { emptyColumn } from '../data';
import { selectedBoard, updateBoard } from '../redux/boardSlice';

const EditBoard = ({ closeEditBoardModal }) => {
  const dispatch = useDispatch();
  const board = useSelector(selectedBoard);

  const [boardName, setBoardName] = useState(board.name);
  const [columns, setColumns] = useState(board.columns);

  const onBoardNameChangeHandler = (ev) => {
    setBoardName(ev.target.value);
  };

  const onColumnChangeHandler = (ev, id) => {
    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === id) {
          return {
            ...column,
            name: ev.target.value,
          };
        } else {
          return column;
        }
      });
    });
  };

  const addNewColumn = () =>
    setColumns((prevColumns) => prevColumns.concat(emptyColumn));

  const removeColumn = (id) =>
    setColumns((prevColumns) => prevColumns.filter((c) => c.id !== id));

  const onSaveChanges = () => {
    dispatch(
      updateBoard({
        id: board.id,
        values: {
          name: boardName,
          columns,
        },
      }),
    );
    closeEditBoardModal();
  };

  return (
    <StyledEditBoard>
      <Title>Edit Board</Title>
      <FormControl>
        <Label>Board Name</Label>
        <FormControl.Input value={boardName} onChange={onBoardNameChangeHandler} />
      </FormControl>
      {columns.length > 0 && (
        <FormControl>
          <Label>Board Columns</Label>
          <Flex $gap="1rem" $dir="column">
            {columns.map((column) => (
              <Flex key={column.id} $gap="1rem" $items="center">
                <FormControl.Input
                  value={column.name}
                  onChange={(ev) => onColumnChangeHandler(ev, column.id)}
                />
                <IconButton onClick={() => removeColumn(column.id)}>
                  <IconCross />
                </IconButton>
              </Flex>
            ))}
          </Flex>
        </FormControl>
      )}
      <Flex $gap="1rem" $dir="column">
        <Button onClick={addNewColumn}>+Add New Column</Button>
        <Button $primary onClick={onSaveChanges}>
          Save Changes
        </Button>
      </Flex>
    </StyledEditBoard>
  );
};

const StyledEditBoard = styled.div`
  padding: 2rem;
  @media screen and (max-width: 640px) {
    padding: 1rem;
  }
  background-color: #2b2c37;
  border-radius: 0.5rem;
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 2rem;
`;

export default EditBoard;
