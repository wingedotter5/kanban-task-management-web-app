import { createContext, useContext } from 'react';

const appContext = createContext();

export const useAppContext = () => useContext(appContext);

export default appContext;
