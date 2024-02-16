import { createSlice } from '@reduxjs/toolkit';
import { initialBoards, emptyBoard } from '../data';
import { uuidv4 } from '../utils';

const initialState = {
  boards: initialBoards,
  selectedBoardId: initialBoards[0].id,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    selectBoard: (state, action) => {
      state.selectedBoardId = action.payload.id;
    },
    insertBoard: (state, action) => {
      state.boards.push(action.payload.board);
      state.selectedBoardId = action.payload.board.id;
    },
    updateBoard: (state, action) => {
      const thatBoardIndex = state.boards.findIndex(
        (b) => b.id === action.payload.id,
      );
      const thatBoard = state.boards[thatBoardIndex];
      const updatedBoard = {
        ...thatBoard,
        ...action.payload.values,
      };
      state.boards.splice(thatBoardIndex, 1, updatedBoard);
    },
    deleteBoard: (state, action) => {
      const thatBoardIndex = state.boards.findIndex(
        (b) => b.id === action.payload.id,
      );
      state.boards.splice(thatBoardIndex, 1);

      if (state.boards.length < 1) {
        const newBoard = {
          ...emptyBoard,
          id: uuidv4(),
          name: 'Untitled',
        };
        state.boards.push(newBoard);
      }
      state.selectedBoardId = state.boards[0].id;
    },
    insertTask: (state, action) => {
      const { boardId, columnId, task } = action.payload;
      const thatColumn = state.boards
        .find((b) => b.id === boardId)
        .columns.find((c) => c.id === columnId);
      thatColumn.tasks.push(task);
    },
    updateTask: (state, action) => {
      const { boardId, oldColumnId, newColumnId, taskId, values } =
        action.payload;

      const thoseTasks = state.boards
        .find((b) => b.id === boardId)
        .columns.find((c) => c.id === oldColumnId).tasks;
      const thatTaskIndex = thoseTasks.findIndex((t) => t.id === taskId);
      const updatedTask = {
        ...thoseTasks[thatTaskIndex],
        ...values,
      };

      // If different columns, remove from the old column and append to the new column.
      if (oldColumnId !== newColumnId) {
        thoseTasks.splice(thatTaskIndex, 1);
        state.boards
          .find((b) => b.id === boardId)
          .columns.find((c) => c.id === newColumnId)
          .tasks.push(updatedTask);
      } else {
        // If same column, replace the updated task with the old one.
        thoseTasks.splice(thatTaskIndex, 1, updatedTask);
      }
    },
    deleteTask: (state, action) => {
      const { boardId, columnId, taskId } = action.payload;
      const thoseTasks = state.boards
        .find((b) => b.id === boardId)
        .columns.find((c) => c.id === columnId).tasks;
      const thatTaskIndex = thoseTasks.findIndex((t) => t.id === taskId);
      thoseTasks.splice(thatTaskIndex, 1);
    },
  },
});

export default boardSlice.reducer;
export const {
  selectBoard,
  insertBoard,
  deleteBoard,
  updateBoard,
  updateTask,
  insertTask,
  deleteTask,
} = boardSlice.actions;
export const selectedBoard = (state) =>
  state.board.boards.find((b) => b.id === state.board.selectedBoardId);
