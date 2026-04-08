import { expect, test } from "@playwright/test";
import { createUserViaApi } from "./utils/api";
import { loginViaUi } from "./utils/auth";
import { createTestUser } from "./utils/test-data";

test("an authenticated user can browse the users directory and open a profile", async ({ page, request }) => {
    const user = createTestUser("directory");

    await createUserViaApi(request, user);
    await loginViaUi(page, user);

    await page.goto("/users");

    await expect(page.getByRole("heading", { name: "Users", level: 1 })).toBeVisible();

    const userLink = page.getByRole("link", { name: user.username }).first();
    await expect(userLink).toBeVisible();

    await userLink.click();

    await expect(page).toHaveURL(new RegExp(`/users/${user.username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
    await expect(page.getByRole("heading", { name: user.username, level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Records", level: 2 })).toBeVisible();
});
