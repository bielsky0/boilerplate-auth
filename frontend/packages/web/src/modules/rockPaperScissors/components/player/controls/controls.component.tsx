import { FC } from "react";
import { useSocket } from "../../../hooks";
import { HandlerType } from "../../../store";

export type ControlsProps = {
  socketId: string;
};

export const Controls: FC<ControlsProps> = ({ socketId }) => {
  const { socket, room } = useSocket();
  const currentPlayer = room?.players.find(({ id }) => id === socketId);

  if (!currentPlayer) return null;
  if (!room) return null;

  if (currentPlayer.isOptionPicked)
    return <div>you picked {currentPlayer.option}</div>;

  return (
    <div>
      <div>
        <button
          disabled={socketId !== socket.id}
          onClick={() => {
            const currentPlayer = room?.players.find(
              ({ id }) => id === socket.id
            );

            if (currentPlayer) {
              currentPlayer.option = "rock";
              currentPlayer.isOptionPicked = true;

              const newPlayersArray = room?.players.filter(
                ({ id }) => id !== currentPlayer.id
              );

              newPlayersArray?.push(currentPlayer);
              socket.emit("rockPaperSicssors", {
                type: HandlerType.UPDATE_ROOM,
                payload: {
                  roomId: room?.id,
                  room: {
                    id: room?.id,
                    players: newPlayersArray,
                    vacant: room?.vacant,
                    isPrivate: room?.isPrivate,
                  },
                },
              });
            }
          }}
        >
          rock
        </button>
        <button
          disabled={socketId !== socket.id}
          onClick={() => {
            const currentPlayer = room?.players.find(
              ({ id }) => id === socket.id
            );

            if (currentPlayer) {
              currentPlayer.option = "paper";
              currentPlayer.isOptionPicked = true;

              const newPlayersArray = room?.players.filter(
                ({ id }) => id !== currentPlayer.id
              );

              newPlayersArray?.push(currentPlayer);
              socket.emit("rockPaperSicssors", {
                type: HandlerType.UPDATE_ROOM,
                payload: {
                  roomId: room?.id,
                  room: {
                    id: room?.id,
                    players: newPlayersArray,
                    vacant: room?.vacant,
                    isPrivate: room?.isPrivate,
                  },
                },
              });
            }
          }}
        >
          paper
        </button>
        <button
          disabled={socketId !== socket.id}
          onClick={() => {
            const currentPlayer = room?.players.find(
              ({ id }) => id === socket.id
            );

            if (currentPlayer) {
              currentPlayer.option = "scissors";
              currentPlayer.isOptionPicked = true;

              const newPlayersArray = room?.players.filter(
                ({ id }) => id !== currentPlayer.id
              );

              newPlayersArray?.push(currentPlayer);
              socket.emit("rockPaperSicssors", {
                type: HandlerType.UPDATE_ROOM,
                payload: {
                  roomId: room?.id,
                  room: {
                    id: room?.id,
                    players: newPlayersArray,
                    vacant: room?.vacant,
                    isPrivate: room?.isPrivate,
                  },
                },
              });
            }
          }}
        >
          scissors
        </button>
      </div>
      <h4>TAKE YOUR PICK</h4>
    </div>
  );
};
