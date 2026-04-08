import { expect, test } from "@playwright/test";

test("editions page links to an edition detail page", async ({ page }) => {
    await page.goto("/editions");

    await expect(page.getByRole("heading", { name: "Editions", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Season overview", level: 2 })).toBeVisible();

    const firstEditionLink = page.locator('a[href^="/editions/"]').first();
    await expect(firstEditionLink).toBeVisible();

    await firstEditionLink.click();

    await expect(page).toHaveURL(/\/editions\/.+$/);
    await expect(page.getByRole("heading", { name: "Participating Teams", level: 2 })).toBeVisible();
});
