import { defineConfig } from "@playwright/test";

const PORT = 3000;
const HOST = "localhost";

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    reporter: [
        ["list"],
        ["html", { open: "never" }],
    ],
    use: {
        baseURL: `http://${HOST}:${PORT}`,
        trace: "on-first-retry",
    },
    webServer: {
        command: "npm run start:e2e",
        url: `http://${HOST}:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 180000,
    },
    projects: [
        {
            name: "chromium",
            use: {
                browserName: "chromium",
            },
        },
    ],
});
