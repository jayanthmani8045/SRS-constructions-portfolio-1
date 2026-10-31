import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("SRS Constructions - Accessibility", () => {
  test("homepage passes automated WCAG A and AA checks", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("keyboard navigation reaches an interactive element", async ({ page }, testInfo) => {
    const keyboardProfiles = ["desktop-chromium", "tv-chromium", "desktop-firefox"];

    test.skip(
      !keyboardProfiles.includes(testInfo.project.name),
      "Keyboard navigation check applies to desktop/TV profiles",
    );

    await page.goto("/");

    let reachedElement = false;

    for (let attempt = 0; attempt < 15; attempt++) {
      await page.keyboard.press("Tab");

      reachedElement = await page.evaluate(() => {
        const element = document.activeElement;

        return (
          element instanceof HTMLElement &&
          element.matches(
            "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
          )
        );
      });

      if (reachedElement) break;
    }

    expect(reachedElement).toBe(true);
  });
});
