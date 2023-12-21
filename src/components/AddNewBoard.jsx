import { useState } from 'react';
import styled from 'styled-components';

import FormControl from './FormControl';
import Label from './Label';
import Input from './Input';
import Flex from './Flex';
import IconButton from './IconButton';
import IconCross from './icons/IconCross';
import { uuidv4 } from '../utils';
import { useAppContext } from '../AppContext';
import Button from './Button';
import { emptyBoard, emptyColumn } from '../data';

const AddNewBoard = ({ onClose }) => {
  const { createNewBoard } = useAppContext();
  const [boardTitle, setBoardTitle] = useState('');
  const [columns, setColumns] = useState([
    {
      id: uuidv4(),
      title: 'Todo',
      error: '',
    },
  ]);

  const onColumnChangeHandler = (ev, id) => {
    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === id) {
          return {
            ...column,
            title: ev.target.value,
          };
        } else {
          return column;
        }
      });
    });
  };

  const addNewColumn = () =>
    setColumns((prevColumns) =>
      prevColumns.concat({
        id: Math.random().toString(),
        title: '',
        error: '',
      }),
    );

  const removeColumn = (id) =>
    setColumns((prevColumns) => prevColumns.filter((c) => c.id !== id));

  return (
    <StyledAddNewBoard>
      <Title>Add new Board</Title>
      <FormControl>
        <Label>Board Name</Label>
        <Input
          value={boardTitle}
          onChange={(ev) => setBoardTitle(ev.target.value)}
          placeholder="e.g. Web Design"
        />
      </FormControl>
      <FormControl>
        <Label>Board Columns</Label>
        <Flex $dir="column" $gap="1rem">
          {columns.map((column) => (
            <Flex $items="center" $gap="1rem" key={column.id}>
              <Input
                value={column.title}
                onChange={(ev) => onColumnChangeHandler(ev, column.id)}
              />
              <IconButton onClick={() => removeColumn(column.id)}>
                <IconCross />
              </IconButton>
            </Flex>
          ))}
        </Flex>
      </FormControl>

      <Flex $dir="column" $gap="1rem">
        <Button $full onClick={addNewColumn}>
          +Add New Column
        </Button>
        <Button
          $full
          $primary
          onClick={() => {
            createNewBoard({
              ...emptyBoard,
              id: uuidv4(),
              name: boardTitle,
              columns: columns.map((c) => ({
                ...emptyColumn,
                name: c.title,
                id: c.id,
              })),
            });
            onClose();
          }}
        >
          Create New Board
        </Button>
      </Flex>
    </StyledAddNewBoard>
  );
};

const StyledAddNewBoard = styled.div`
  padding: 2rem;
  background-color: #2b2c37;
  border-radius: 0.5rem;
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 2rem;
`;

export default AddNewBoard;
