import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import FormControl from './FormControl';
import Flex from './Flex';
import IconButton from './IconButton';
import IconCross from './icons/IconCross';
import { uuidv4 } from '../utils';
import Button from './Button';
import { emptyBoard, emptyColumn } from '../data';
import { insertBoard } from '../redux/boardSlice';

const AddNewBoard = ({ onClose }) => {
  const [boardTitle, setBoardTitle] = useState('');
  const [columns, setColumns] = useState([
    {
      id: uuidv4(),
      title: 'Todo',
      error: '',
    },
  ]);

  const dispatch = useDispatch();

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

  const onCreateNewBoard = () => {
    dispatch(
      insertBoard({
        board: {
          ...emptyBoard,
          id: uuidv4(),
          name: boardTitle,
          columns: columns.map((c) => ({
            ...emptyColumn,
            name: c.title,
            id: c.id,
          })),
        },
      }),
    );
    onClose();
  };

  return (
    <StyledAddNewBoard>
      <Title>Add new Board</Title>
      <FormControl>
        <FormControl.Label>Board Name</FormControl.Label>
        <FormControl.Input
          value={boardTitle}
          onChange={(ev) => setBoardTitle(ev.target.value)}
          placeholder="e.g. Web Design"
        />
      </FormControl>
      {columns.length > 0 && (
        <FormControl>
          <FormControl.Label>Board Columns</FormControl.Label>
          <Flex $dir="column" $gap="1rem">
            {columns.map((column) => (
              <Flex $items="center" $gap="1rem" key={column.id}>
                <FormControl.Input
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
      )}

      <Flex $dir="column" $gap="1rem">
        <Button $full onClick={addNewColumn}>
          +Add New Column
        </Button>
        <Button $full $primary onClick={onCreateNewBoard}>
          Create New Board
        </Button>
      </Flex>
    </StyledAddNewBoard>
  );
};

const StyledAddNewBoard = styled.div`
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

export default AddNewBoard;
