import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/__FOLDER_NAME__/",
  server: {
    port: parseInt("__PORT__", 10) || 5173,
  },
});
