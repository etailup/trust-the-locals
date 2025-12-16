import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const webhookTarget =
    env.AUTOMATION_WEBHOOK_URL ||
    "https://webhook.site/30d9b223-4693-4366-acf0-df46b48bdff8";

  return {
    server: {
      host: "::",
      port: 8080,
      allowedHosts: ["cherish-subacid-malcontentedly.ngrok-free.dev"],
      proxy: {
        "/api/webhook": {
          target: webhookTarget,
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/api\/webhook$/, ""),
        },
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
