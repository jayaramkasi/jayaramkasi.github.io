import { test, expect } from "@playwright/test";

// Below lg (1024px) the sidebar collapses into a drawer opened from a hamburger.
test.use({ viewport: { width: 390, height: 844 } });

test.describe("Mobile navigation drawer", () => {
  test("opens, navigates, and closes on selection", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");
    await expect(nav).not.toBeInViewport();

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(nav).toBeInViewport();

    await nav.getByRole("link", { name: "Gallery", exact: true }).click();
    await expect(page).toHaveURL(/\/gallery$/);
    // Navigating closes the drawer again.
    await expect(nav).not.toBeInViewport();
  });

  test("closes on Escape and via the close button", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");
    const open = page.getByRole("button", { name: "Open navigation menu" });

    await open.click();
    await expect(nav).toBeInViewport();
    await page.keyboard.press("Escape");
    await expect(nav).not.toBeInViewport();

    await open.click();
    await expect(nav).toBeInViewport();
    await page.getByRole("button", { name: "Close navigation menu" }).click();
    await expect(nav).not.toBeInViewport();
  });
});
