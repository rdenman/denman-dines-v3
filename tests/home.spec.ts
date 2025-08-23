import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://localhost:3000/");

  await expect(page).toHaveTitle(/Denman Dines/);
});
