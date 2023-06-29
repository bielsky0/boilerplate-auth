import { useState } from "react";
import { useSocket } from "../hooks";
import { HandlerType, SocketProvider } from "../store";

export const RockPaperScissors = () => {
  return (
    <SocketProvider>
      <Test />
    </SocketProvider>
  );
};

const Test = () => {
  const { room, socket } = useSocket();
  const [roomId, setRoomId] = useState("");
  const [data, setData] = useState("");

  return (
    <div>
      <p>{JSON.stringify(room)}</p>
      <br />
      <br />
      <br />
      <br />

      <div>
        <button
          onClick={() => {
            socket.emit("rockPaperSicssors", {
              type: HandlerType.CREATE_ROOM,
              payload: {
                room: {},
                data: "dasdasdadadasd",
              },
            });
          }}
        >
          create room
        </button>
        <br />
        <br />
        <br />

        <div>
          <input
            value={roomId}
            onChange={(e) => {
              setRoomId(e.currentTarget.value);
            }}
          />
          <button
            onClick={() => {
              socket.emit("rockPaperSicssors", {
                type: HandlerType.JOIN_ROOM,
                payload: {
                  room: {},
                  roomId: roomId,
                },
              });
            }}
          >
            join room
          </button>
        </div>
        <br />
        <br />
        <br />
        <div>
          <input
            value={data}
            onChange={(e) => {
              setData(e.currentTarget.value);
            }}
          />
          <button
            onClick={() => {
              socket.emit("rockPaperSicssors", {
                type: HandlerType.UPDATE_ROOM,
                payload: {
                  room: { ...room, data: data },
                  roomId: room.roomId,
                },
              });
            }}
          >
            update room
          </button>
        </div>
      </div>
    </div>
  );
};
