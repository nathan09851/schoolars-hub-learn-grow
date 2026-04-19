import { defineConfig, devices } from "@playwright/test";

// In CI, vite preview runs on 4173 by default
const DEV_PORT = 5173;
const PREVIEW_PORT = 4173;
const PORT = process.env.CI ? PREVIEW_PORT : DEV_PORT;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: process.env.CI
      ? "npm run build && npx vite preview --port 4173 --strictPort"
      : "npm run dev",
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 240000,
    env: {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL ?? "https://placeholder.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "placeholder-key",
    },
  },
});
