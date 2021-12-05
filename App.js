import React from "react";
import Navigator from "./routes/homeStack";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/mainTheme";
import * as SQLite from "expo-sqlite";
import { ThemeContext } from "./context";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

export default function App() {
  return (
    <ThemeContext.Provider value={{ db }}>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
