import { useState } from 'react';
import styled from 'styled-components';

import FormControl from './FormControl';
import Label from './Label';
import Input from './Input';
import Flex from './Flex';
import IconButton from './IconButton';
import IconCross from './icons/IconCross';
import Button from './Button';
import { emptyColumn } from '../data';
import { useAppContext } from '../AppContext';

const EditBoard = ({ board, closeEditBoardModal }) => {
  const { updateBoard, selectedBoardId, boards } = useAppContext();
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
    const selectedBoard = boards.find((b) => b.id === selectedBoardId);
    updateBoard({
      ...selectedBoard,
      name: boardName,
      columns,
    });
    closeEditBoardModal();
  };

  return (
    <StyledEditBoard>
      <Title>Edit Board</Title>
      <FormControl>
        <Label>Board Name</Label>
        <Input value={boardName} onChange={onBoardNameChangeHandler} />
      </FormControl>
      <FormControl>
        <Label>Board Columns</Label>
        <Flex $gap="1rem" $dir="column">
          {columns.map((column) => (
            <Flex key={column.id} $gap="1rem" $items="center">
              <Input
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
  background-color: #2b2c37;
  border-radius: 0.5rem;
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 2rem;
`;

export default EditBoard;
