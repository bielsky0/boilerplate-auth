import { SocketContextProvider } from '../store';
import { Home } from './home';
import { Route, Routes } from 'react-router-dom';
import { RoutesConfig } from '../config/routes';
import { Room } from './room';
import { Layout } from '../components';
import { RoomRedirect } from '../components/roomRedirect';

export const RockPaperScissors = () => {
  return (
    <SocketContextProvider url="ws://localhost:5000">
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={RoutesConfig.rockPaperSicssors.getRelativeUrl('home')}
            element={<Home />}
          />
          <Route
            path={RoutesConfig.rockPaperSicssors.getRelativeUrl('room')}
            element={<RoomRedirect />}
          />
          <Route
            path={RoutesConfig.rockPaperSicssors.getRelativeUrl('roomId')}
            element={<Room />}
          />
        </Route>
      </Routes>
    </SocketContextProvider>
  );
};
