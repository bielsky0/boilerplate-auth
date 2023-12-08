import { motion, useAnimate } from 'framer-motion';
import { useSocket } from '../../hooks';
import { useEffect } from 'react';

export const Verdict = () => {
  const {
    data: { room },
  } = useSocket();

  const [ref, animate] = useAnimate();

  if (!room) return null;

  const { roundIsOver, roundResults } = room;

  useEffect(() => {
    if (roundIsOver) {
      animate(
        ref.current,
        {
          opacity: 1,
        },
        {
          duration: 0.1,
        }
      );
    }

    if (!roundIsOver) {
      animate(
        ref.current,
        {
          opacity: 0,
        },
        {
          duration: 0.1,
        }
      );
    }
  }, [roundIsOver]);

  return (
    <motion.div ref={ref} className="absolute bottom-1/4">
      <span className="text-orange-400 text-8xl font-medium">
        it's a {roundResults?.verdict}
      </span>
    </motion.div>
  );
};
