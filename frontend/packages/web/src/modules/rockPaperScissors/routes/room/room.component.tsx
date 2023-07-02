import { useParams } from "react-router-dom";
import { useSocket } from "../../hooks";
import { useEffect, useState } from "react";
import { HandlerType, Player as PlayerType } from "../../store";
import { Player } from "../../components/player";

const checkResults = (player1: PlayerType, player2: PlayerType): PlayerType => {
  return player1;
};

export const Room = () => {
  const { id } = useParams<{ id: string }>();
  const { socket, room } = useSocket();

  const [results, setResults] = useState<{
    text: string;
    score: [number, number];
  }>();

  console.log(room);

  useEffect(() => {
    socket.emit("rockPaperSicssors", {
      type: HandlerType.CREATE_ROOM,
      payload: {
        room: {
          roomId: id,
        },
      },
    });
  }, [socket, id]);

  useEffect(() => {
    const players = room?.players;
    if (players) {
      const currentPlayer = players.find(({ id }) => id === socket.id);

      if (players.length >= 2) {
        if (currentPlayer) {
          const isPicked1 = players[0].isOptionPicked;
          const isPicked2 = players[1].isOptionPicked;

          if (isPicked1 && isPicked2) {
            const winner = checkResults(players[0], players[1]);

            const newPlayersArray: PlayerType[] = room?.players.map((p) => {
              if (p.id === winner.id)
                return {
                  ...p,
                  score: p.score + 1,
                  option: null,
                  isOptionPicked: false,
                };

              return { ...p, option: null, isOptionPicked: false };
            });
            console.log(newPlayersArray);
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
        }
      }
    }
  }, [room]);

  if (!room) return null;

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <div
        style={{
          marginBottom: "32px",
        }}
      >
        {JSON.stringify(room)}
      </div>

      {room.players.length < 2 ? (
        <div>send link to your friend</div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <Player socketId={room.players[0].id} />
          <Player socketId={room.players[1].id} />
        </div>
      )}
    </div>
  );
};
