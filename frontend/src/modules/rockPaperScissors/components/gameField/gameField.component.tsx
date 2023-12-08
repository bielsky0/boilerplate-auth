import { useSocket } from '../../hooks';
import { MainPlayerGameField } from '../mainPlayerGameField';
import { OpponentField } from '../opponentField/opponentField.component';
import { motion } from 'framer-motion';
import { Verdict } from '../verdict';
export const GameField = () => {
  const {
    data: { room },
  } = useSocket();

  if (!room) return null;

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <MainPlayerGameField />
      <OpponentField />
      <Verdict />
    </div>
  );
};
