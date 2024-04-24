import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useMutation } from '@apollo/client';

import FlyOut from './FlyOut';
import FormControl from './FormControl';
import Button from './Button';
import { useDisclosure } from '../hooks';
import Modal from './Modal';
import EditTask from './EditTask';
import { DELETE_TASK, GET_BOARD, EDIT_TASK } from '../queries';

const TaskInfo = ({ task, currentBoard, closeTaskInfoModal }) => {
  const [status, setStatus] = useState(
    currentBoard.columns.find((c) => c.id === task.columnId).name,
  );
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const {
    isOpen: isEditTaskModalOpen,
    onOpen: showEditTaskModal,
    onClose: closeEditTaskModal,
  } = useDisclosure();
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: {
          id: currentBoard.id,
        },
      },
    ],
  });
  const [editTaskMutation, { loading }] = useMutation(EDIT_TASK, {
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: {
          id: currentBoard.id,
        },
      },
    ],
  });

  useEffect(() => {
    setSubtasks(task.subtasks);
  }, [task]);

  const statusChangeHandler = (event, id) => {
    setSubtasks((prevSubtasks) => {
      return prevSubtasks.map((subtask) => {
        if (subtask.id === id) {
          return {
            ...subtask,
            isCompleted: event.target.checked,
          };
        } else {
          return subtask;
        }
      });
    });
  };

  const saveChanges = () => {
    let columnId = currentBoard.columns.find((c) => c.name === status).id;
    editTaskMutation({
      variables: {
        id: task.id,
        columnId,
        modifiedSubtasks: subtasks.map((subtask) => ({
          id: subtask.id,
          isCompleted: subtask.isCompleted,
        })),
      },
      onCompleted() {
        closeTaskInfoModal();
      },
    });
  };

  const deleteTaskHandler = () => {
    deleteTask({
      variables: {
        id: task.id,
      },
      onCompleted() {
        closeTaskInfoModal();
      },
    });
  };

  const completedSubtasksCount = subtasks.reduce(
    (count, subtask) => (subtask.isCompleted ? count + 1 : count),
    0,
  );

  return (
    <>
      <StyledTaskInfo>
        <div className="flex items-center justify-between">
          <h3 className="text-white">{task.title}</h3>
          <FlyOut>
            <FlyOut.Toggle />
            <FlyOut.List>
              <FlyOut.Item onClick={showEditTaskModal}>Edit Task</FlyOut.Item>
              <FlyOut.Item onClick={deleteTaskHandler}>Delete Task</FlyOut.Item>
            </FlyOut.List>
          </FlyOut>
        </div>
        <Small>
          Subtasks ({completedSubtasksCount} of {subtasks.length})
        </Small>
        {subtasks.map((subtask) => (
          <Subtask key={subtask.id}>
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              onChange={(event) => statusChangeHandler(event, subtask.id)}
            />
            {subtask.title}
          </Subtask>
        ))}
        <FormControl>
          <FormControl.Label>Current Status</FormControl.Label>
          <FormControl.Select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {currentBoard.columns.map(({ name: status }) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </FormControl.Select>
        </FormControl>
        <Button $primary $full onClick={saveChanges} loading={loading}>
          Save Changes
        </Button>
      </StyledTaskInfo>
      {createPortal(
        <Modal onClose={closeEditTaskModal} isOpen={isEditTaskModalOpen}>
          <EditTask
            task={task}
            currentBoard={currentBoard}
            closeEditTaskModal={closeEditTaskModal}
          />
        </Modal>,
        document.getElementById('portal'),
      )}
    </>
  );
};

const StyledTaskInfo = styled.div`
  padding: 2rem;
  background-color: #2b2c37;
  border-radius: 0.5rem;

  @media screen and (max-width: 640px) {
    padding: 1rem;
  }
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
