import React from 'react';

const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [currentBoardId, setCurrentBoardId] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
  }, []);

  return (
    <AppContext.Provider
      value={{ currentBoardId, setCurrentBoardId, currentUser, setCurrentUser }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => React.useContext(AppContext);
