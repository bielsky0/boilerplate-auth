import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Routes, Route, useLocation, Navigate } from "react-router-native";
import { RoutesConfig, LANG_PREFIX } from "./config/routes";
import { ValidRoutesProviders } from "./providers/validRoutesProviders/validRoutesProviders";
import { DEFAULT_LOCALE } from "./config/i18n";

import { io } from "socket.io-client";

const socket = io("ws://localhost:5000");

export const App = () => {
  const { pathname, search } = useLocation();
  console.log("xddd");
  socket.emit("new_game_handler", "new_game_handler");

  socket.on("message", (d) => {
    console.log(d);
  });

  return (
    <Routes>
      <Route element={<ValidRoutesProviders />}>
        <Route path={LANG_PREFIX}>
          <Route path={RoutesConfig.home} element={<XD />} />
          <Route
            path="*"
            element={
              <View style={styles.container}>
                <Text>Not found</Text>
              </View>
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

const XD = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
