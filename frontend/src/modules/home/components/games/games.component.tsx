import { Game } from '../game';
import { useGenerateLocalePath } from '../../../../shared/hooks/useGenerateLocalePath';
import { RoutesConfig } from '../../../../app/config/routes';

export const Games = () => {
  const generateLocalePath = useGenerateLocalePath();

  return (
    <div className="grid mt-6 grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-4">
      <Game
        to={generateLocalePath(RoutesConfig.rockPaperSicssors.home)}
        name="Rock Paper Sicssors"
      />
      <Game name="Battleships" disableReason="comming soon" disabled />
    </div>
  );
};
