import { PageLayout } from "../../../shared/components/pageLayout/pageLayout.component";
import { Games } from "../components";

export const Home = () => {
  return (
    <PageLayout>
      <h1 className="pt-6 text-4xl font-bold tracking-[1rem]">GAMES</h1>

      <div className="flex items-center w-full bg-slate-900 mt-4">
        <h3 className="text-slate-50  py-1 pl-8">
          online games, play online games with friends
        </h3>
      </div>

      <Games />
    </PageLayout>
  );
};
