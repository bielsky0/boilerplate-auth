import { ReactNode } from "react";
import { NativeRouter } from "react-router-native";

export const RouterProvider = ({ children }: { children: ReactNode }) => (
  <NativeRouter>{children}</NativeRouter>
);
