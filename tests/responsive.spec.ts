import { test, expect } from "@playwright/test";

test.describe("SRS Constructions - Responsive Layout", () => {
  test("main content renders at the configured viewport", async ({ page }) => {
    await page.goto("/");

    const main = page.locator("main");
    await expect(main).toBeVisible();

    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
  });

  test("page has no horizontal overflow", async ({ page }) => {
    await page.goto("/");

    const widths = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));

    expect(
      widths.document,
      `Horizontal overflow at viewport width ${widths.viewport}`,
    ).toBeLessThanOrEqual(widths.viewport + 2);
  });
});
