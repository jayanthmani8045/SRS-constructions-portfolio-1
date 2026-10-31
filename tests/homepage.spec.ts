import { test, expect } from "@playwright/test";

test.describe("SRS Constructions - Homepage", () => {
  test("homepage loads successfully", async ({ page }) => {
    const response = await page.goto("/");

    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
  });

  test("homepage has a title and heading", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator("h1").first()).toBeVisible();
  });
});
