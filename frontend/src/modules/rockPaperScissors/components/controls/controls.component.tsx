import { useInGame, useSocket } from '../../hooks';
import { EmiterType, Pick } from '../../store';
import { Paper } from './paper';
import { Rock } from './rock';
import { Scissors } from './scissors';

export const Controls = () => {
  const {
    data: { room },
    sentEvent,
  } = useSocket();

  const { makePrePick } = useInGame();

  if (!room) return null;

  return (
    <div className="flex w-full h-full items-center justify-center gap-10">
      {/* <button
        className="p-6 rounded-full bg-orange-400"
        onMouseOver={() => {
          makePrePick(Pick.ROCK);
        }}
        onMouseOut={() => {
          makePrePick(null);
        }}
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
      </button> */}
      <Rock />
      <Paper />
      {/* <button
        className="p-6 rounded-full bg-orange-400"
        onMouseOver={() => {
          makePrePick(Pick.SCISSORS);
        }}
        onMouseOut={() => {
          makePrePick(null);
        }}
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
      </button> */}
      <Scissors />
      {/* <button
        onMouseOver={() => {
          makePrePick(Pick.PAPER);
        }}
        onMouseOut={() => {
          makePrePick(null);
        }}
        className="p-6 rounded-full bg-orange-400"
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
      </button> */}
    </div>
  );
};
