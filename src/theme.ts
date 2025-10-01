import { defineConfig, defineTokens } from "@chakra-ui/react";

export const tokens = defineTokens({
  colors: {
    primary: { value: "#3182ce" },
    secondary: { value: "#2c5282" },
  },
});

export const config = defineConfig({
  theme: {
    tokens,
  },
});
