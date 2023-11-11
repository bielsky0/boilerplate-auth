import { Navigate } from 'react-router-dom';
import { useGenerateLocalePath } from '../../../../shared/hooks/useGenerateLocalePath';
import { RoutesConfig } from '../../config/routes';
import { WaitingRoom } from '../waitingRoom';
import { useSocket } from '../../hooks';

export const RoomRedirect = () => {
  const generateLocalePath = useGenerateLocalePath();
  const { data } = useSocket();

  if (data.room?.id)
    return (
      <Navigate
        to={generateLocalePath(RoutesConfig.rockPaperSicssors.roomId, {
          id: data.room?.id,
        })}
        replace
      />
    );

  return <WaitingRoom />;
};
