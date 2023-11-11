import { PropsWithChildren, Dispatch, createContext } from 'react';

import { useInGameReducer } from './inGame.reducer';
import { InGameActions, InGameState } from './inGame.types';

export interface InGameContextProviderProps {
  initialState?: InGameState;
}

type ContextState = {
  state: InGameState;
  dispatch: Dispatch<InGameActions>;
};

export const InGameContext = createContext<ContextState | undefined>(undefined);

export const InGameContextProvider = ({
  children,
  initialState,
}: PropsWithChildren<InGameContextProviderProps>) => {
  const { state, dispatch } = useInGameReducer(initialState);

  return (
    <InGameContext.Provider value={{ state, dispatch }}>
      {children}
    </InGameContext.Provider>
  );
};
