import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import FormControl from './FormControl';
import Button from './Button';
import Flex from './Flex';
import { uuidv4 } from '../utils';
import IconButton from './IconButton';
import IconCross from './icons/IconCross';
import { emptyTask } from '../data';
import Select from './Select';
import { selectedBoard, updateTask } from '../redux/boardSlice';

const EditTask = ({ task, closeEditTaskModal }) => {
  const dispatch = useDispatch();

  const board = useSelector(selectedBoard);
  const statuses = board.columns.map((c) => c.name);

  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [subtasks, setSubtasks] = useState(
    task.subtasks.map((st) => ({ ...st, error: '' })),
  );

  const onSubtaskChangeHandler = (ev, id) => {
    setSubtasks((prevSubtasks) => {
      return prevSubtasks.map((subtask) => {
        if (subtask.id === id) {
          return {
            ...subtask,
            title: ev.target.value,
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
        id: uuidv4(),
        title: '',
        error: '',
        isCompleted: false,
      }),
    );

  const removeSubtask = (id) =>
    setSubtasks((prevSubtasks) => prevSubtasks.filter((s) => s.id !== id));

  const saveTaskHandler = () => {
    dispatch(
      updateTask({
        boardId: board.id,
        oldColumnId: board.columns.find((c) => c.name === task.status).id,
        newColumnId: board.columns.find((c) => c.name === taskStatus).id,
        taskId: task.id,
        values: {
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
          subtasks: subtasks.map((s) => {
            const mod = { ...s };
            delete mod.error;
            return mod;
          }),
        },
      }),
    );
    closeEditTaskModal();
  };

  return (
    <StyledAddNewTask>
      <Title>Edit Task</Title>
      <FormControl>
        <FormControl.Label>Task Name</FormControl.Label>
        <FormControl.Input
          value={taskTitle}
          onChange={(ev) => setTaskTitle(ev.target.value)}
          placeholder="e.g. Take coffee break"
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Description</FormControl.Label>
        <FormControl.Textarea
          value={taskDescription}
          onChange={(ev) => setTaskDescription(ev.target.value)}
          rows="5"
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
        ></FormControl.Textarea>
      </FormControl>
      <FormControl>
        <FormControl.Label>Subtasks</FormControl.Label>
        <Flex $dir="column" $gap="1rem">
          {subtasks.map((subtask) => (
            <Flex $items="center" $gap="1rem" key={subtask.id}>
              <FormControl.Input
                value={subtask.title}
                onChange={(ev) => onSubtaskChangeHandler(ev, subtask.id)}
              />
              <IconButton onClick={() => removeSubtask(subtask.id)}>
                <IconCross />
              </IconButton>
            </Flex>
          ))}
        </Flex>
      </FormControl>
      <Flex $dir="column" $gap="1rem">
        <Button $full onClick={addNewSubtask}>
          +Add New Subtask
        </Button>
        <FormControl style={{ marginBottom: 0 }}>
          <FormControl.Label>Current Status</FormControl.Label>
          <Select
            $full
            value={taskStatus}
            onChange={(ev) => setTaskStatus(ev.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button $primary $full onClick={saveTaskHandler}>
          Save Changes
        </Button>
      </Flex>
    </StyledAddNewTask>
  );
};

const StyledAddNewTask = styled.div`
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

export default EditTask;
