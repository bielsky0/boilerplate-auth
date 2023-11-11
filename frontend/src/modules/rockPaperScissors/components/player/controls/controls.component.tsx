import { FC } from 'react';
import { useSocket } from '../../../hooks';
import { EmiterType, Pick } from '../../../store';

export type ControlsProps = {
  socketId: string;
};

export const Controls: FC<ControlsProps> = ({ socketId }) => {
  const {
    socket,
    data: { room },
    sentEvent,
  } = useSocket();

  const currentPlayer = room?.players.find(({ id }) => id === socketId);

  if (!currentPlayer) return null;

  if (currentPlayer.isOptionPicked) return <div>picked</div>;

  if (!room) return null;

  if (room.roomIsAvaible) return null;

  return (
    <div>
      <button
        disabled={socketId !== socket.id}
        onClick={() => {
          sentEvent({
            type: EmiterType.MAKE_PICK,
            payload: {
              pick: Pick.ROCK,
              roomId: room?.id,
            },
          });
        }}
      >
        rock
      </button>
      <button
        disabled={socketId !== socket.id}
        onClick={() => {
          sentEvent({
            type: EmiterType.MAKE_PICK,
            payload: {
              pick: Pick.PAPER,
              roomId: room?.id,
            },
          });
        }}
      >
        paper
      </button>
      <button
        disabled={socketId !== socket.id}
        onClick={() => {
          sentEvent({
            type: EmiterType.MAKE_PICK,
            payload: {
              pick: Pick.SCISSORS,
              roomId: room?.id,
            },
          });
        }}
      >
        scissors
      </button>
    </div>
  );
};
