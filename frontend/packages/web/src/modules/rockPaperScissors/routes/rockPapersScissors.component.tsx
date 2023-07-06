import { SocketProvider } from "../store";
import { Home } from "./home";
import { Route, Routes } from "react-router-dom";
import { RoutesConfig } from "../config/routes";
import { Room } from "./room";

export const RockPaperScissors = () => {
  return (
    <SocketProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path={RoutesConfig.rockPaperSicssors.getRelativeUrl("room")}
          element={<Room />}
        />
      </Routes>
    </SocketProvider>
  );
};
