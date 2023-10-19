import { Layout } from '../../shared/components/layout';
import { HalfPage } from '../../shared/components/halfPage/halfPage.component';

export const Waiting = () => {
  return (
    <Layout>
      <HalfPage>
        <div className="flex h-full w-full justify-center items-center">
          <h1 className="text-4xl font-bold">Waiting for player</h1>
        </div>
      </HalfPage>
    </Layout>
  );
};
