import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { RoutesConfig, LANG_PREFIX } from "./config/routes";
import { ValidRoutesProviders } from "./providers/validRoutesProviders/validRoutesProviders";
import { DEFAULT_LOCALE } from "./config/i18n";

import { Home } from "../routes/home";
import { RockPaperScissors } from "../routes/rockPaperScissors";

export const App = () => {
  const { pathname, search } = useLocation();

  return (
    <Routes>
      <Route element={<ValidRoutesProviders />}>
        <Route path={LANG_PREFIX}>
          <Route path={RoutesConfig.home} element={<Home />} />
          <Route
            path={RoutesConfig.rockPaperSicssors.index}
            element={<RockPaperScissors />}
          />

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
