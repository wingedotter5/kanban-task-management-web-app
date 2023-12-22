import { createContext, useState, useContext } from 'react';

import { initialBoards } from './data';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [boards, setBoards] = useState(initialBoards);
  const [selectedBoardId, setSelectedBoardId] = useState(initialBoards[0].id);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
export const useAppContext = () => useContext(AppContext);
