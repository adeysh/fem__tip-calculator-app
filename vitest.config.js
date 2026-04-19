import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // simulate browser
    globals: true,
    setupFiles: "./tests/setup.js",
  },
});
