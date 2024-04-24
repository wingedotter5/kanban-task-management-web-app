import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useMutation } from '@apollo/client';

import Form from './Form';
import FormControl from './FormControl';
import Button from './Button';
import IconButton from './IconButton';
import IconCross from './icons/IconCross';
import { EDIT_TASK, GET_BOARD } from '../queries';

const EditTask = ({ task, currentBoard, closeEditTaskModal }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(
    currentBoard.columns.find((c) => c.id === task.columnId).name,
  );
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [deletedSubtaskIds, setDeletedSubtasksIds] = useState([]);
  const [editTask, { loading }] = useMutation(EDIT_TASK, {
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
        _new: true,
      }),
    );

  const removeSubtask = (id) =>
    setSubtasks((prevSubtasks) =>
      prevSubtasks.filter((subtask) => {
        if (subtask.id === id) {
          if (subtask._new === undefined) {
            setDeletedSubtasksIds((value) => value.concat(id));
          }
          return false;
        }
        return true;
      }),
    );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const columnId = currentBoard.columns.find((c) => c.name === status).id;
    editTask({
      variables: {
        id: task.id,
        title,
        description,
        columnId,
        deletedSubtaskIds,
        modifiedSubtasks: subtasks
          .filter((subtask) => !subtask._new)
          .map((subtask) => ({ id: subtask.id, title: subtask.title })),
        newSubtasks: subtasks
          .filter((subtask) => subtask._new)
          .map((subtask) => subtask.title),
      },
      onCompleted() {
        closeEditTaskModal();
      },
    });
  };

  const statuses = currentBoard.columns.map((column) => column.name);

  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Title>Edit Task</Form.Title>
      <FormControl>
        <FormControl.Label htmlFor="title">Task Name</FormControl.Label>
        <FormControl.Input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Take coffee break"
          required
        />
      </FormControl>
      <FormControl>
        <FormControl.Label htmlFor="description">Description</FormControl.Label>
        <FormControl.Textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows="5"
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
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
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default EditTask;
