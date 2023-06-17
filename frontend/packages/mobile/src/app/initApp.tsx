import { registerRootComponent } from "expo";
import { RouterProvider } from "./providers/router";
import { App } from "./app.component";
import { LocalesProvider } from "./providers/localesProvider";

export const initApp = () => {
  registerRootComponent(render);
};
export const render = () => {
  return (
    <LocalesProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </LocalesProvider>
  );
};
