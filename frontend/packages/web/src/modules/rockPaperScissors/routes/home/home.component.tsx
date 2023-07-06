import { useNavigate } from "react-router";
import { useGenerateLocalePath } from "../../../../shared/hooks/useGenerateLocalePath";
import { RoutesConfig } from "../../config/routes";

export const Home = () => {
  const generateLocalePath = useGenerateLocalePath();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Rock paper scissors</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={() => {
            navigate(
              generateLocalePath(RoutesConfig.rockPaperSicssors.room, {
                id: crypto.randomUUID(),
              })
            );
          }}
        >
          get started
        </button>
        <p>... or play with</p>
        <button>random starnger</button>
      </div>
    </div>
  );
};
