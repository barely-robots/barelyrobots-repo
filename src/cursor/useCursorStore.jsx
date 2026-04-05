import { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext({
  state: 'default',
  setCursorState: () => {},
});

export function CursorProvider({ children }) {
  const [state, setState] = useState('default');

  const setCursorState = useCallback((newState) => {
    setState(newState);
  }, []);

  return (
    <CursorContext.Provider value={{ state, setCursorState }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorState() {
  return useContext(CursorContext);
}
