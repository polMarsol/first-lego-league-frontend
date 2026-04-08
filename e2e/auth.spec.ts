import { expect, test } from "@playwright/test";
import { loginViaUi, registerUserViaUi } from "./utils/auth";
import { createTestUser } from "./utils/test-data";

test("registration and login work for a new user", async ({ page }) => {
    const user = createTestUser("register");

    await registerUserViaUi(page, user);
    await loginViaUi(page, user);

    await expect(page.getByRole("heading", { name: user.username, level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test("invalid credentials show the current authentication error", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Username").fill("not-a-real-user");
    await page.getByLabel("Password").fill("wrongpass123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid username or password. Please try again.")).toBeVisible();
});
