import { useSocket } from '../../hooks';

export const GameOver = () => {
  const {
    data: { gameOver },
    socket: { id: socketId },
  } = useSocket();

  const currentPlayer = gameOver.players.find(({ id }) => socketId === id);
  const currentOpponent = gameOver.players.find(({ id }) => socketId !== id);
  console.log(gameOver);

  if (!currentOpponent) return null;
  if (!currentPlayer) return null;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center h-full w-full">
        <span className="text-orange-400 text-8xl font-medium uppercase">
          game over
        </span>
      </div>

      <span className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="flex items-center justify-center h-full w-full">
            <span className="text-orange-400 text-8xl font-medium">
              {currentPlayer.score}
            </span>
          </div>
          <div className="flex items-start justify-center h-full w-full">
            <span className="text-orange-400 text-2xl font-medium">(YOU)</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-orange-400 text-2xl font-medium">vs</span>
        </div>
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="flex items-center justify-center h-full w-full">
            <span className="text-orange-400 text-8xl font-medium">
              {currentOpponent.score}
            </span>
          </div>
          <div className="flex items-start justify-center h-full w-full">
            <span className="text-orange-400 text-2xl font-medium">
              (OPPONENT)
            </span>
          </div>
        </div>
      </span>
    </div>
  );
};
