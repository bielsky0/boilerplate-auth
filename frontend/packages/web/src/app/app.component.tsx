import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { RoutesConfig, LANG_PREFIX } from "./config/routes";
import { ValidRoutesProviders } from "./providers/validRoutesProviders/validRoutesProviders";
import { DEFAULT_LOCALE } from "./config/i18n";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("ws://localhost:5000");

export const App = () => {
  const { pathname, search } = useLocation();

  return (
    <Routes>
      <Route element={<ValidRoutesProviders />}>
        <Route path={LANG_PREFIX}>
          <Route path={RoutesConfig.home} element={<XD />} />
          <Route
            path="*"
            element={
              <div>
                <h1>Not found</h1>
              </div>
            }
          />
        </Route>
      </Route>

      <Route
        path="/"
        element={<Navigate to={`/${DEFAULT_LOCALE}${pathname}${search}`} />}
      />
    </Routes>
  );
};

const XD = () => {
  const [id, setId] = useState("");
  const [room, setRoom] = useState<any>({});
  const [roomData, setRoomData] = useState("");

  useEffect(() => {
    const callback = (d: any) => {
      setRoom(d.payload.room);
      console.log(d);
    };
    socket.on("message", callback);

    return () => {
      socket.off("message", callback);
    };
  });

  return (
    <div>
      {JSON.stringify(room)}
      <button
        title="Create new room"
        onClick={() => {
          console.log("xd");

          socket.emit("message", {
            type: "createRoom",
            payload: {
              test: "test",
            },
          });
        }}
      >
        Create room
      </button>
      <input
        value={id}
        onChange={(e) => {
          setId(e.currentTarget.value);
        }}
      />
      <button
        title="Join room"
        onClick={() => {
          socket.emit("message", {
            type: "joinRoom",
            payload: {
              roomId: id,
            },
          });
        }}
      >
        Join room
      </button>

      <input
        value={roomData}
        onChange={(e) => {
          setRoomData(e.currentTarget.value);
        }}
      />

      <button
        title="Join room"
        onClick={() => {
          const newRoom = {
            ...room,
            data: roomData,
          };
          socket.emit("message", {
            type: "updateRoom",
            payload: {
              room: newRoom,
              roomId: room.roomId,
            },
          });
        }}
      >
        change room data
      </button>
    </div>
  );
};
