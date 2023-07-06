import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { Routes, Route, useLocation, Navigate } from "react-router-native";
import { RoutesConfig, LANG_PREFIX } from "./config/routes";
import { ValidRoutesProviders } from "./providers/validRoutesProviders/validRoutesProviders";
import { DEFAULT_LOCALE } from "./config/i18n";

import { io } from "socket.io-client";
import { useState } from "react";

const socket = io("ws://localhost:5000");

export const App = () => {
  const { pathname, search } = useLocation();

  socket.on("message", (d) => {
    console.log(d.payload.room);
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
  const [id, setId] = useState("");

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Create new room"
        onPress={() => {
          socket.emit("message", {
            type: "new_game_handler",
            payload: {
              test: "test",
            },
          });
        }}
      ></Button>
      <TextInput style={styles.input} value={id} onChangeText={setId} />
      <Button
        title="Join room"
        onPress={() => {
          socket.emit("message", {
            type: "join_room_handler",
            payload: {
              roomId: id,
            },
          });
        }}
      ></Button>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
