import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useMutation } from '@apollo/client';

import Form from './Form';
import FormControl from './FormControl';
import IconButton from './IconButton';
import IconCross from './icons/IconCross';
import Button from './Button';
import { EDIT_BOARD, GET_BOARD } from '../queries';

const EditBoard = ({ currentBoard, closeEditBoardModal }) => {
  const [name, setName] = useState(currentBoard.name);
  const [columns, setColumns] = useState(currentBoard.columns);
  const [deletedColumnIds, setDeletedColumnsIds] = useState([]);
  const [editBoardMutation, { loading }] = useMutation(EDIT_BOARD, {
    refetchQueries: [{ query: GET_BOARD, variables: { id: currentBoard.id } }],
  });

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
        _new: true,
      }),
    );

  const removeColumn = (id) =>
    setColumns((prevColumns) =>
      prevColumns.filter((column) => {
        if (column.id === id) {
          if (column._new === undefined) {
            setDeletedColumnsIds((value) => value.concat(column.id));
          }
          return false;
        }
        return true;
      }),
    );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    editBoardMutation({
      variables: {
        id: currentBoard.id,
        name,
        deletedColumnIds,
        modifiedColumns: columns
          .filter((column) => !column._new)
          .map((column) => ({ id: column.id, name: column.name })),
        newColumns: columns
          .filter((column) => column._new)
          .map((column) => column.name),
      },
      onCompleted() {
        closeEditBoardModal();
      },
    });
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Title>Edit Board</Form.Title>
      <FormControl>
        <FormControl.Label htmlFor="name">Board Name</FormControl.Label>
        <FormControl.Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
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
        <Button onClick={addNewColumn}>+Add New Column</Button>
        <Button $primary loading={loading} type="submit">
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default EditBoard;
