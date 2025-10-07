import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path"; // safer to import from "node:path" in ESM

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.js"),
      name: "GomokuComponents",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      // don't bundle peer deps
      external: ["react", "react-dom"],
    },
  },
});
