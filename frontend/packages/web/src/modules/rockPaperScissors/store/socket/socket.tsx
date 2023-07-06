import { useMemo, useReducer } from "react";
import {
  SocketContext,
  SocketProviderProps,
  initialState,
  socketReducer,
} from ".";

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socketState, dispatch] = useReducer(socketReducer, initialState);
  const value = useMemo(
    () => ({ socketState, dispatch }),
    [socketState, dispatch]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
