import { useSocket } from '../../hooks';

import arm from '../../../../assets/rockPaperScissors/arm-human-trimmed.png';
import rockHuman from '../../../../assets/rockPaperScissors/rock-human-trimmed.png';
import paperHuman from '../../../../assets/rockPaperScissors/paper-human-trimmed.png';
import sicssorsHuman from '../../../../assets/rockPaperScissors/sicssors-human-trimmed.png';

import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Pick } from '../../store';
import { useAnimations } from '../../hooks/useAnimations';

export const OpponentField = () => {
  const {
    opponents,
    data: { room },
  } = useSocket();
  const [src, setSrc] = useState(rockHuman);

  const { idleAnimation, shakeAnimation, handRef, armRef } = useAnimations();

  useEffect(() => {
    if (room?.roundIsOver) {
      shakeAnimation().then(() => {
        if (currentOponentPick) {
          switch (currentOponentPick.pick) {
            case Pick.PAPER:
              setSrc(paperHuman);
              return;
            case Pick.ROCK:
              setSrc(rockHuman);
              return;
            case Pick.SCISSORS:
              setSrc(sicssorsHuman);
              return;
            default:
              return;
          }
        }
      });
    }

    if (!room?.roundIsOver) {
      idleAnimation();
      setSrc(rockHuman);
    }
  }, [room?.roundIsOver, room]);

  if (!room) return null;

  if (!opponents || opponents.length < 1) return null;

  const currentOpponent = opponents[0];

  const currentOponentPick = room.roundResults?.opponentsPick.find(
    (s) => s.id === currentOpponent.id
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center transform scale-x-[-1]">
      <motion.div
        ref={armRef}
        style={{
          translateX: '-60%',
          translateY: '-20%',
          rotate: '60deg',
          originX: 0.5,
          originY: 1,
        }}
        className="aboslute h-full w-full  flex justify-center items-center"
      >
        <img className="h-full aboslute w-full object-scale-down" src={arm} />
        <motion.img
          ref={handRef}
          src={src}
          style={{
            translateY: src === rockHuman ? '-55%' : '-60%',
            translateX: src === rockHuman ? '-1.5%' : '12.5%',
            originX: 0.5,
            originY: 0.9,
          }}
          className={classNames('object-scale-down absolute top-0', {
            'h-[27%] w-[27%]': src === rockHuman,
            'h-[38%] w-[38%]': src !== rockHuman,
          })}
        />
      </motion.div>
    </div>
  );
};
