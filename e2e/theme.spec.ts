import { test, expect } from "@playwright/test";

// Force a known starting point so the toggle's first click is deterministic
// regardless of the runner's OS colour-scheme preference.
test.use({ colorScheme: "light" });

test.describe("Theme toggle", () => {
  test("switches between light and dark and persists the choice", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: /Switch to (dark|light) theme/ });

    await expect(html).not.toHaveClass(/\bdark\b/);

    await toggle.click();
    await expect(html).toHaveClass(/\bdark\b/);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await toggle.click();
    await expect(html).not.toHaveClass(/\bdark\b/);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
  });

  test("restores the saved theme on reload", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem("theme", "dark"));
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  });
});
