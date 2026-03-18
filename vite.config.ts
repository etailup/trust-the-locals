import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const defaultTarget =
    "https://automation.smarteer.it/webhook/5b125308-0ae6-4192-92eb-02947b761400";

  const webhookTarget = env.AUTOMATION_WEBHOOK_URL || defaultTarget;
  const applyWebhookTarget = env.AUTOMATION_WEBHOOK_URL_APPLY || defaultTarget;

  const toProxyTarget = (rawUrl: string) => {
    try {
      const url = new URL(rawUrl);
      const pathname = url.pathname.startsWith("/") ? url.pathname : `/${url.pathname}`;
      return { origin: url.origin, pathname };
    } catch {
      const url = new URL(defaultTarget);
      return { origin: url.origin, pathname: url.pathname };
    }
  };

  const webhookProxy = toProxyTarget(webhookTarget);
  const applyWebhookProxy = toProxyTarget(applyWebhookTarget);

  return {
    server: {
      host: "::",
      port: 8080,
      allowedHosts: ["cherish-subacid-malcontentedly.ngrok-free.dev", "localhost", "127.0.0.1"],
      proxy: {
        "/api/webhook": {
          target: webhookProxy.origin,
          changeOrigin: true,
          secure: true,
          // Forward to the configured webhook path.
          rewrite: () => webhookProxy.pathname,
        },
        "/api/webhook-apply": {
          target: applyWebhookProxy.origin,
          changeOrigin: true,
          secure: true,
          // Forward to the configured webhook path.
          rewrite: () => applyWebhookProxy.pathname,
        },
        "/api/submit-application": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
        "/api/approve": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
        "/api/reject": {
          target: "http://localhost:3000",
          changeOrigin: true,
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
