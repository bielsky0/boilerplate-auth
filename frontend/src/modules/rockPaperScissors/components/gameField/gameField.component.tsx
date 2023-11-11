import { useSocket } from '../../hooks';
import { MainPlayerGameField } from '../mainPlayerGameField';
import { OpponentField } from '../opponentField/opponentField.component';

export const GameField = () => {
  const {
    data: { room },
  } = useSocket();

  if (!room) return null;

  return (
    <div className="h-full w-full flex items-center justify-center">
      <MainPlayerGameField />
      <OpponentField />
    </div>
  );
};
