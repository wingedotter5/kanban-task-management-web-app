import { createContext, useState, useContext } from 'react';

import { initialBoards, emptyBoard } from './data';
import { uuidv4 } from './utils';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [boards, setBoards] = useState(initialBoards);
  const [selectedBoardId, setSelectedBoardId] = useState(boards[0].id);

  const addNewBoard = (board) => {
    setBoards((prevBoards) => prevBoards.concat(board));
  };

  const updateBoard = (board) => {
    setBoards((prevBoards) => {
      return prevBoards.map((b) => {
        if (b.id === selectedBoardId) {
          return board;
        } else {
          return b;
        }
      });
    });
  };

  const selectBoard = (id) => setSelectedBoardId(id);

  const deleteSelectedBoard = () => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.filter((b) => b.id !== selectedBoardId);
      if (updatedBoards.length > 0) {
        setSelectedBoardId(updatedBoards[0].id);
        return updatedBoards;
      } else {
        const untitledId = uuidv4();
        setSelectedBoardId(untitledId);
        return [
          {
            ...emptyBoard,
            id: untitledId,
            name: 'Untitled',
          },
        ];
      }
    });
  };

  const addNewTask = (task) => {
    setBoards((prevBoards) => {
      return prevBoards.map((b) => {
        if (b.id === selectedBoardId) {
          return {
            ...b,
            columns: b.columns.map((c) => {
              if (c.name === task.status) {
                return {
                  ...c,
                  tasks: c.tasks.concat(task),
                };
              } else {
                return c;
              }
            }),
          };
        } else {
          return b;
        }
      });
    });
  };

  return (
    <AppContext.Provider
      value={{
        boards,
        selectedBoardId,
        selectBoard,
        addNewBoard,
        addNewTask,
        updateBoard,
        deleteSelectedBoard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
export const useAppContext = () => useContext(AppContext);
