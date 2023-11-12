import { FC } from 'react';
import { Controls } from './controls';
import { useSocket } from '../../hooks';

export type PlayerProps = {
  socketId: string;
};

export const Player: FC<PlayerProps> = ({ socketId }) => {
  const {
    data: { room },
  } = useSocket();

  const currentPlayer = room?.players.find(({ id }) => id === socketId);

  if (!currentPlayer) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      player
      {/* <h1>Player: {socketId}</h1>

      <div>
        <h2>
          YOUR SCORE: <span>{currentPlayer.score}</span>
        </h2>
      </div>

      <Controls socketId={socketId} /> */}
    </div>
  );
};
