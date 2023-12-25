import { useState } from 'react';
import styled from 'styled-components';

import FormControl from './FormControl';
import Label from './Label';
import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';
import Flex from './Flex';
import { uuidv4 } from '../utils';
import IconButton from './IconButton';
import IconCross from './icons/IconCross';
import { useAppContext } from '../AppContext';
import { emptyTask } from '../data';
import Select from './Select';

const EditTask = ({ task, closeEditTaskModal }) => {
  const { selectedBoardId, boards, updateTask } = useAppContext();
  const statuses = boards
    .find((b) => b.id === selectedBoardId)
    .columns.map((c) => c.name);
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
    updateTask(
      {
        ...task,
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
        subtasks: subtasks.map((s) => {
          const mod = { ...s };
          delete mod.error;
          return mod;
        }),
      },
      task.status,
    );
    closeEditTaskModal();
  };

  return (
    <StyledAddNewTask>
      <Title>Edit Task</Title>
      <FormControl>
        <Label>Task Name</Label>
        <Input
          value={taskTitle}
          onChange={(ev) => setTaskTitle(ev.target.value)}
          placeholder="e.g. Take coffee break"
        />
      </FormControl>
      <FormControl>
        <Label>Description</Label>
        <Textarea
          value={taskDescription}
          onChange={(ev) => setTaskDescription(ev.target.value)}
          rows="5"
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
        ></Textarea>
      </FormControl>
      <FormControl>
        <Label>Subtasks</Label>
        <Flex $dir="column" $gap="1rem">
          {subtasks.map((subtask) => (
            <Flex $items="center" $gap="1rem" key={subtask.id}>
              <Input
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
          <Label>Current Status</Label>
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
  @media screen and (max-width: 375px) {
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