import { useParams } from "react-router-dom";
import { useSocket } from "../../hooks";
import { useEffect } from "react";
import { EmiterType } from "../../store";
import { Player } from "../../components/player";

export const Room = () => {
  const { id } = useParams<{ id: string }>();
  const { socket, room } = useSocket();

  useEffect(() => {
    socket.emit("rockPaperSicssors", {
      type: EmiterType.ADD_TO_ROOM,
      payload: {
        roomId: id,
      },
    });
  }, [socket]);
  useEffect(() => {
    let timeout: number;

    if (room && room.roundIsOver) {
      timeout = setTimeout(() => {
        socket.emit("rockPaperSicssors", {
          type: EmiterType.FINISH_ROUND,
          payload: {
            roomId: room?.id,
          },
        });
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [room]);

  if (!room) return null;

  if (room.roomIsAvaible) return <>Send link to friend</>;

  if (room.roomIsFull) return <>room is full</>;

  if (room.roundIsOver)
    return (
      <div>
        <div
          style={{
            marginBottom: "32px",
          }}
        >
          {JSON.stringify(room)}
        </div>

        <h3>Round Over</h3>
        {JSON.stringify(room.roundResults)}
      </div>
    );

  if (room.isGameOver)
    return (
      <div>
        <div
          style={{
            marginBottom: "32px",
          }}
        >
          {JSON.stringify(room)}
        </div>

        <button
          onClick={() => {
            socket.emit("rockPaperSicssors", {
              type: EmiterType.ADD_TO_ROOM,
              payload: {
                roomId: id,
              },
            });
          }}
        >
          PLAY AGAIN
        </button>
      </div>
    );

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

      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <Player socketId={room.players[0].id} />
        <Player socketId={room.players[1].id} />
      </div>
    </div>
  );
};
