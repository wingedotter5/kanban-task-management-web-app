import { useState, useEffect } from 'react';

import appContext from './appContext';

const AppContextProvider = ({ children }) => {
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
  }, []);

  return (
    <appContext.Provider
      value={{ currentBoardId, setCurrentBoardId, currentUser, setCurrentUser }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
