import { useAnimate, motion } from 'framer-motion';
import { useSocket } from '../../hooks';
import { Paper } from './paper';
import { Rock } from './rock';
import { Scissors } from './scissors';
import { useEffect } from 'react';

export const Controls = () => {
  const {
    data: { room, yourPick },
  } = useSocket();

  const [controlsRef, animateControls] = useAnimate();

  const [ref, animate] = useAnimate();

  if (!room) return null;

  useEffect(() => {
    if (yourPick) {
      animateControls(controlsRef.current, {
        y: 200,
      });
      animate(ref.current, { opacity: 1 });
    }

    if (!yourPick) {
      animate(ref.current, { opacity: 0 });
      animateControls(controlsRef.current, {
        y: 0,
      });
    }
  }, [yourPick]);

  return (
    <div className="relative flex w-full h-full items-center justify-center">
      <motion.div ref={ref} className="absolute">
        <span className="text-orange-400 text-5xl font-medium uppercase">
          you picked
        </span>
      </motion.div>
      <motion.div
        ref={controlsRef}
        className="flex w-full h-full items-center justify-center gap-10"
      >
        <Rock />
        <Paper />
        <Scissors />
      </motion.div>
    </div>
  );
};
