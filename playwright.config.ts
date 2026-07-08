import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

// The site's dev server binds to this port (see vite.config.ts). Playwright
// starts it and waits for it below, reusing an already-running instance locally.
const PORT = 4173;
const HOST = `http://localhost:${PORT}`;

// Some sandboxes ship a pre-installed Chromium under /opt/pw-browsers and block
// the egress Playwright would use to download its own build. When that binary is
// present, launch it directly; otherwise (CI, a laptop with `playwright install`
// already run) fall back to Playwright's managed browser. Force a specific binary
// with PLAYWRIGHT_CHROMIUM_PATH.
const candidateChromium =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ?? "/opt/pw-browsers/chromium";
const chromiumPath = existsSync(candidateChromium) ? candidateChromium : "";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  // Fail the build if a test.only was committed by mistake.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : "list",
  use: {
    baseURL: HOST,
    trace: "on-first-retry",
    ...(chromiumPath
      ? { launchOptions: { executablePath: chromiumPath } }
      : {}),
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `yarn dev --port ${PORT} --strictPort`,
    url: HOST,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
