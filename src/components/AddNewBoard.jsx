import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useMutation } from '@apollo/client';

import Form from './Form';
import FormControl from './FormControl';
import IconButton from './IconButton';
import IconCross from './icons/IconCross';
import Button from './Button';
import { CREATE_BOARD, GET_BOARDS } from '../queries';
import { useAppContext } from '../appContext';

const AddNewBoard = ({ closeAddNewBoardModal }) => {
  const [name, setName] = useState('');
  const [columns, setColumns] = useState([
    {
      id: uuid(),
      name: 'Todo',
    },
  ]);
  const [createBoardMutation, { loading }] = useMutation(CREATE_BOARD, {
    refetchQueries: [{ query: GET_BOARDS }],
  });
  const { setCurrentBoardId } = useAppContext();

  const columnChangeHandler = (event, id) => {
    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === id) {
          return {
            ...column,
            name: event.target.value,
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
        id: uuid(),
        name: '',
      }),
    );

  const removeColumn = (id) =>
    setColumns((prevColumns) =>
      prevColumns.filter((column) => column.id !== id),
    );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    createBoardMutation({
      variables: {
        name,
        columns: columns.map((column) => column.name),
      },
      onCompleted({ createBoard }) {
        setCurrentBoardId(createBoard.id);
        closeAddNewBoardModal();
      },
    });
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Title>Add new Board</Form.Title>
      <FormControl>
        <FormControl.Label htmlFor="name">Board Name</FormControl.Label>
        <FormControl.Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Web Design"
          required
        />
      </FormControl>
      {columns.length > 0 && (
        <FormControl>
          <FormControl.Label>Board Columns</FormControl.Label>
          <div className="flex flex-col gap-4">
            {columns.map((column) => (
              <div key={column.id} className="flex items-center gap-4">
                <FormControl.Input
                  value={column.name}
                  onChange={(event) => columnChangeHandler(event, column.id)}
                  required
                />
                <IconButton onClick={() => removeColumn(column.id)}>
                  <IconCross />
                </IconButton>
              </div>
            ))}
          </div>
        </FormControl>
      )}
      <div className="flex flex-col gap-4">
        <Button $full onClick={addNewColumn}>
          +Add New Column
        </Button>
        <Button type="submit" $full $primary loading={loading}>
          Create New Board
        </Button>
      </div>
    </Form>
  );
};

export default AddNewBoard;
