import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useMutation } from '@apollo/client';

import Form from './Form';
import FormControl from './FormControl';
import Button from './Button';
import IconButton from './IconButton';
import IconCross from './icons/IconCross';
import { CREATE_TASK, GET_BOARD } from '../queries';

const AddNewTask = ({ closeAddNewTaskModal, currentBoard }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(currentBoard.columns[0].name);
  const [subtasks, setSubtasks] = useState([
    {
      id: uuid(),
      title: '',
    },
  ]);
  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: {
          id: currentBoard.id,
        },
      },
    ],
  });

  const subtaskChangeHandler = (event, id) => {
    setSubtasks((prevSubtasks) => {
      return prevSubtasks.map((subtask) => {
        if (subtask.id === id) {
          return {
            ...subtask,
            title: event.target.value,
          };
        } else {
          return subtask;
        }
      });
    });
  };

  const addNewSubtask = () =>
    setSubtasks((prevSubtasks) =>
      prevSubtasks.concat({
        id: uuid(),
        title: '',
      }),
    );

  const removeSubtask = (id) =>
    setSubtasks((prevSubtasks) =>
      prevSubtasks.filter((subtask) => subtask.id !== id),
    );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let columnId = currentBoard.columns.find(
      (column) => column.name === status,
    ).id;
    createTask({
      variables: {
        title,
        description,
        columnId,
        subtasks: subtasks.map((subtask) => subtask.title),
      },
      onCompleted() {
        closeAddNewTaskModal();
      },
    });
  };

  const statuses = currentBoard.columns.map((column) => column.name);

  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Title>Add New Task</Form.Title>
      <FormControl>
        <FormControl.Label htmlFor="title">Task Name</FormControl.Label>
        <FormControl.Input
          id="title"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Take coffee break"
          value={title}
          required
        />
      </FormControl>
      <FormControl>
        <FormControl.Label htmlFor="description">Description</FormControl.Label>
        <FormControl.Textarea
          id="description"
          onChange={(event) => setDescription(event.target.value)}
          rows="5"
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          value={description}
        ></FormControl.Textarea>
      </FormControl>
      <FormControl>
        <FormControl.Label>Subtasks</FormControl.Label>
        <div className="flex flex-col gap-4">
          {subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-4">
              <FormControl.Input
                value={subtask.title}
                onChange={(event) => subtaskChangeHandler(event, subtask.id)}
                required
              />
              <IconButton onClick={() => removeSubtask(subtask.id)}>
                <IconCross />
              </IconButton>
            </div>
          ))}
        </div>
      </FormControl>
      <div className="flex flex-col gap-4">
        <Button $full onClick={addNewSubtask}>
          +Add New Subtask
        </Button>
        <FormControl style={{ marginBottom: 0 }}>
          <FormControl.Label htmlFor="status">Current Status</FormControl.Label>
          <FormControl.Select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </FormControl.Select>
        </FormControl>
        <Button $primary $full loading={loading} type="submit">
          Create Task
        </Button>
      </div>
    </Form>
  );
};

export default AddNewTask;
