import { test, expect } from "@playwright/test";

test.describe("Introduction (home)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the name as the page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Jayaram Kasi Visweswaran",
      }),
    ).toBeVisible();
  });

  test("shows the tagline and a call to action", async ({ page }) => {
    await expect(page.getByText(/Data & Engineering Leader/)).toBeVisible();
    await expect(page.getByRole("link", { name: "Email me" })).toBeVisible();
  });

  test("exposes the primary social links", async ({ page }) => {
    await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      /linkedin\.com/,
    );
    await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      /github\.com/,
    );
  });
});
