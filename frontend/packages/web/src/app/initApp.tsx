import { RouterProvider } from "./providers/router";
import { App } from "./app.component";
import { LocalesProvider } from "./providers/localesProvider";
import { createRoot } from "react-dom/client";

export const initApp = () => {
  const container = document.getElementById("root");
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = createRoot(container!);

  root.render(render());
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
