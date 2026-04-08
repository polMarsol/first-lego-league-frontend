import { expect, test } from "@playwright/test";

test("scientific projects page renders published content or the empty state", async ({ page }) => {
    await page.goto("/scientific-projects");

    await expect(page.getByRole("heading", { name: "Scientific Projects", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Season projects overview", level: 2 })).toBeVisible();

    const emptyState = page.getByText("No scientific projects found");
    const projectCards = page.locator("ul.list-grid > li");

    await expect(emptyState.or(projectCards.first())).toBeVisible();
});
