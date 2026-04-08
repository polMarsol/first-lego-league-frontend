import { expect, test } from "@playwright/test";

test("teams page renders the roster section without failing", async ({ page }) => {
    await page.goto("/teams");

    await expect(page.getByRole("heading", { name: "Teams", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Competition roster", level: 2 })).toBeVisible();

    const emptyState = page.getByText("No teams found");
    const teamCards = page.locator("ul.list-grid > li");

    await expect(emptyState.or(teamCards.first())).toBeVisible();
});
