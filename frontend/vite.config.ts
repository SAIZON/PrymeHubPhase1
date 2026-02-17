import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    server: {
        host: "::",
        port: 5173, // CHANGED: 8080 -> 5173 to avoid conflict with Java Backend
        hmr: {
            overlay: false,
        },
        // Optional: Add proxy to simplify API calls during development
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
}));