import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import Flex from './Flex';
import FlyOut from './FlyOut';
import FormControl from './FormControl';
import Label from './Label';
import Select from './Select';
import Button from './Button';
import { useDisclosure } from '../hooks';
import Modal from './Modal';
import EditTask from './EditTask';
import { selectedBoard, updateTask, deleteTask } from '../redux/boardSlice';

const TaskInfo = ({ task, closeTaskInfoModal }) => {
  const [status, setStatus] = useState(task.status);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const {
    isOpen: isEditTaskModalOpen,
    onOpen: showEditTaskModal,
    onClose: closeEditTaskModal,
  } = useDisclosure();

  const dispatch = useDispatch();

  const board = useSelector(selectedBoard);

  const subtasksRemaining = subtasks.filter((st) => st.isCompleted).length;

  useEffect(() => {
    setSubtasks(task.subtasks);
  }, [task]);

  const onStatusChangeHandler = (ev, id) => {
    setSubtasks((prevSubtasks) => {
      return prevSubtasks.map((st) => {
        if (st.id === id) {
          return {
            ...st,
            isCompleted: ev.target.checked,
          };
        } else {
          return st;
        }
      });
    });
  };

  const onSaveChanges = () => {
    dispatch(
      updateTask({
        boardId: board.id,
        oldColumnId: board.columns.find((c) => c.name === task.status).id,
        newColumnId: board.columns.find((c) => c.name === status).id,
        taskId: task.id,
        values: {
          status,
          subtasks,
        },
      }),
    );
    closeTaskInfoModal();
  };

  const onDeleteTask = () => {
    dispatch(
      deleteTask({
        boardId: board.id,
        columnId: board.columns.find((c) => c.name === task.status).id,
        taskId: task.id,
      }),
    );
  };

  return (
    <>
      <StyledTaskInfo>
        <Flex $justify="space-between" $items="center">
          <Title>{task.title}</Title>
          <FlyOut>
            <FlyOut.Toggle />
            <FlyOut.List>
              <FlyOut.Item onClick={showEditTaskModal}>Edit Task</FlyOut.Item>
              <FlyOut.Item onClick={onDeleteTask}>Delete Task</FlyOut.Item>
            </FlyOut.List>
          </FlyOut>
        </Flex>
        <Small>
          Subtasks ({subtasksRemaining} of {subtasks.length})
        </Small>
        {subtasks.map((st) => (
          <Subtask key={st.id}>
            <input
              type="checkbox"
              checked={st.isCompleted}
              onChange={(ev) => onStatusChangeHandler(ev, st.id)}
            />
            {st.title}
          </Subtask>
        ))}
        <FormControl>
          <Label>Current Status</Label>
          <Select
            value={status}
            $full
            onChange={(ev) => setStatus(ev.target.value)}
          >
            {board.columns
              .map((c) => c.name)
              .map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </Select>
        </FormControl>
        <Button $primary $full onClick={onSaveChanges}>
          Save Changes
        </Button>
      </StyledTaskInfo>
      {isEditTaskModalOpen &&
        createPortal(
          <Modal onClose={closeEditTaskModal}>
            <EditTask task={task} closeEditTaskModal={closeEditTaskModal} />
          </Modal>,
          document.getElementById('portal'),
        )}
    </>
  );
};

const StyledTaskInfo = styled.div`
  padding: 2rem;
  @media screen and (max-width: 425px) {
    padding: 1rem;
  }
  background-color: #2b2c37;
  border-radius: 0.5rem;
`;

const Title = styled.h3`
  color: white;
`;

const Small = styled.small`
  color: #828fa3;
  letter-spacing: 0.25em;
  font-size: 12px;
  font-weight: bolder;
  display: block;
  margin: 1rem 0;
`;

const Subtask = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #828fa3;
  font-size: 14px;
  font-weight: bolder;
  margin-bottom: 0.5rem;
  background-color: #20212c;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export default TaskInfo;
