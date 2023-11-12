import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import { useSocket } from '../../hooks';

import arm from '../../../../assets/rockPaperScissors/arm-human-trimmed.png';
import rockHuman from '../../../../assets/rockPaperScissors/rock-human-trimmed.png';
import paperHuman from '../../../../assets/rockPaperScissors/paper-human-trimmed.png';
import sicssorsHuman from '../../../../assets/rockPaperScissors/sicssors-human-trimmed.png';

import { Pick } from '../../store';
import { useAnimations } from '../../hooks/useAnimations';

export const MainPlayerGameField = () => {
  const {
    currentPlayer,
    data: { room, yourPick },
  } = useSocket();

  const [src, setSrc] = useState(rockHuman);
  const { idleAnimation, shakeAnimation, handRef, armRef } = useAnimations();

  if (!currentPlayer) return null;

  if (!room) return null;

  const { roundIsOver } = room;

  useEffect(() => {
    if (roundIsOver) {
      shakeAnimation().then(() => {
        if (yourPick) {
          switch (yourPick) {
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

    if (!roundIsOver) {
      idleAnimation();
      setSrc(rockHuman);
    }
  }, [roundIsOver]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
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
