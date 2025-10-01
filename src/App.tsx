import { useEffect, useState } from "react";
import Router from "@/router";
import { ChakraProvider, createSystem, defaultConfig, Float } from "@chakra-ui/react";
import { config } from "./theme";
import { version } from "../package.json";
// i18next
import "./i18next";
import { changeLanguage } from "i18next";
// Components
import { Toaster } from "./components/ui/toaster";

const system = createSystem(defaultConfig, config);

function App() {
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    // helper: set default only if the key doesn't exist
    const setDefault = (key: string, value: string) => {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, value);
      }
    };

    // defaults
    setDefault("language", "en");
    setDefault("debug", "false");

    // apply language
    const lng = localStorage.getItem("language") || "en";
    changeLanguage(lng);

    // read debug to decide whether to show the badge
    setIsDebug(localStorage.getItem("debug") === "true");
  }, []);

  return (
    <ChakraProvider value={system}>
      <Toaster />
      <Router />
      {isDebug && (
        <Float top="20px" right="60px" zIndex={9999}>
          Version {version}
        </Float>
      )}
    </ChakraProvider>
  );
}

export default App;
