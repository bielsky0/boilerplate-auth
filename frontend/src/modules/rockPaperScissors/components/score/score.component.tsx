import { useSocket } from '../../hooks';

export const Score = () => {
  const {
    socket: { id: currentId },
    data: { room },
    currentPlayer,
  } = useSocket();

  const enemyPlayer = room?.players.filter(({ id }) => id !== currentId)[0];

  const sortedPlayers = room?.players.sort(({ id }, { id: id2 }) => {
    return id == currentId ? -1 : id2 == currentId ? 1 : 0;
  });

  if (!currentPlayer || !enemyPlayer) return null;

  return (
    <div className="h-full w-full flex items-center justify-center">
      {sortedPlayers?.map(({ score }) => {
        return (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-orange-400 text-8xl font-medium">
              {score}
            </span>
          </div>
        );
      })}
    </div>
  );
};
