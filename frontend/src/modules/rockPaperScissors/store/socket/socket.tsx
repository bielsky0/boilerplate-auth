import { useEffect, useMemo, useReducer, useRef } from 'react';
import SocketService from '../../services/socketService';
import { Emiter, socketReducer } from '.';
import { SocketContext } from './socket.context';

export function SocketContextProvider({
  url,
  children,
}: {
  [key: string]: any;
}) {
  const [state, dispatch] = useReducer(socketReducer, {});

  const { current } = useRef(new SocketService({ url }));

  useEffect(() => {
    return () => {
      current.socket.disconnect();
    };
  }, []);

  useMemo(() => {
    current.onEventResponse((message) => {
      dispatch(message);
    });
  }, []);

  const sent = (data: Emiter) => {
    current.sentEvent(data);
    dispatch(data);
  };

  return (
    <SocketContext.Provider
      value={{
        data: state,
        socket: current.getSocket(),
        sentEvent: sent,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
