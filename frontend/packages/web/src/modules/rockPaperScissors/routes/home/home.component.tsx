import { useNavigate } from 'react-router';
import { useGenerateLocalePath } from '../../../../shared/hooks/useGenerateLocalePath';
import { RoutesConfig } from '../../config/routes';
import { EmiterType } from '../../store';
import { useSocket } from '../../hooks';

export const Home = () => {
  const generateLocalePath = useGenerateLocalePath();
  const navigate = useNavigate();

  const { sentEvent } = useSocket();

  return (
    <div className="flex flex-col h-screen items-center justify-around">
      <div className="flex flex-col items-center justify-center w-[30%] font-black text-4xl uppercase">
        <h1 className="text-orange-400">Rock</h1>
        <h1 className="text-orange-400 pl-64 pt-10 pb-10">Paper</h1>
        <h1 className="text-orange-400">Scissors</h1>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button
          className="bg-orange-400 uppercase hover:bg-orange-300 text-gray-800 font-semibold py-3 px-5 rounded shadow"
          onClick={() => {
            sentEvent({ type: EmiterType.CREATE_ROOM, payload: null });
            navigate(generateLocalePath(RoutesConfig.rockPaperSicssors.room));
          }}
        >
          get started
        </button>
      </div>
    </div>
  );
};
