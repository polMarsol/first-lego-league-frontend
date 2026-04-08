import { expect, Page } from "@playwright/test";
import { TestUser } from "./test-data";

export async function registerUserViaUi(page: Page, user: TestUser) {
    await page.goto("/users/register");

    await page.getByLabel("Username").fill(user.username);
    await page.getByLabel("Email").fill(user.email);
    await page.getByLabel("Password").fill(user.password);
    await page.getByRole("button", { name: "Register" }).click();

    await expect(page).toHaveURL(/\/login$/);
}

export async function loginViaUi(page: Page, user: TestUser) {
    await page.goto("/login");

    await page.getByLabel("Username").fill(user.username);
    await page.getByLabel("Password").fill(user.password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(new RegExp(`/users/${user.username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
}
