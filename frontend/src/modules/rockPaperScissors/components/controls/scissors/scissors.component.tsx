import scissors from '../../../../../assets/rockPaperScissors/sicssors-human-trimmed.png';
import { useSocket } from '../../../hooks';
import { EmiterType, Pick } from '../../../store';

import { motion } from 'framer-motion';

export const Scissors = () => {
  const {
    data: { room },
    sentEvent,
  } = useSocket();

  if (!room) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.1, boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)' }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      style={{
        boxShadow: '5px 5px 0 rgba(0, 0, 0, 0.2)',
      }}
      onClick={() => {
        sentEvent({
          type: EmiterType.MAKE_PICK,
          payload: {
            pick: Pick.SCISSORS,
            roomId: room?.id,
          },
        });
      }}
      className="p-2 w-28 h-28 border-b-8 rounded-full bg-white flex items-center justify-center"
    >
      <motion.img
        whileHover={{ scale: 1.1, rotate: '12deg' }}
        whileTap={{ scale: 0.9 }}
        className="max-w-full max-h-full object-cover"
        src={scissors}
      />
    </motion.button>
  );
};
