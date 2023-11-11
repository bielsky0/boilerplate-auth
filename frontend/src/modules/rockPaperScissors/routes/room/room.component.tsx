import { useParams } from 'react-router-dom';
import { useSocket } from '../../hooks';
import { useEffect } from 'react';
import { EmiterType } from '../../store';
import { RoomIsFull, Waiting } from '../../components';
import { Score } from '../../components/score/score.component';
import { Controls } from '../../components/controls';
import { GameField } from '../../components/gameField';
import { GameOver } from '../../components/gameOver';

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

  const { roomIsAvaible, roomIsFull, isGameOver } = room;

  if (isGameOver) return <GameOver />;

  if (roomIsAvaible) return <Waiting />;

  if (roomIsFull) return <RoomIsFull />;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-col h-[20%]">
        <Score />
      </div>

      <div className="flex flex-col h-[60%]">
        <GameField />
      </div>

      <div className="flex flex-col h-[20%]">
        <Controls />
      </div>
    </div>
  );
};
