import { useParams } from 'react-router-dom';
import { useSocket } from '../../hooks';
import { useEffect } from 'react';
import { EmiterType } from '../../store';
import { Player, RoomIsFull, Waiting } from '../../components';
import { Score } from '../../components/score/score.component';
import { Controls } from '../../components/controls';
import { GameField } from '../../components/gameField';

export const Room = () => {
  const { id } = useParams() as { id: string };

  const {
    data: { room },
    sentEvent,
  } = useSocket();

  useEffect(() => {
    if (!room) {
      sentEvent({
        type: EmiterType.JOIN_ROOM,
        payload: {
          roomId: id,
        },
      });
    }
  }, []);

  if (!room) return null;

  if (room.roomIsAvaible) return <Waiting />;

  if (room.roomIsFull) return <RoomIsFull />;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col h-[10%]">
        <Score />
      </div>

      <div className="flex flex-col h-[70%]">
        <GameField />
      </div>

      <div className="flex flex-col h-[20%]">
        <Controls />
      </div>
    </div>
  );
};
