import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // simulate browser
    globals: true,
    setupFiles: "./tests/setup.js",

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      exclude: ["tests/", "node_modules/"],
    },
  },
});
