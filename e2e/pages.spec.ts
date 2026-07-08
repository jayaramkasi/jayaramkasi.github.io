import { test, expect } from "@playwright/test";

// Every route should mount under the shared layout and render its own H1.
const routes = [
  { path: "/", heading: "Jayaram Kasi Visweswaran" },
  { path: "/experience", heading: "16 years of growth" },
  { path: "/expertise", heading: "Skills & proficiency" },
  { path: "/education", heading: "Academic background" },
  { path: "/featured-work", heading: "Projects that demonstrate impact" },
  { path: "/community", heading: "Sharing knowledge with the community" },
  { path: "/gallery", heading: "Work in public" },
];

for (const { path, heading } of routes) {
  test(`renders the page heading for ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  });
}

test("serves the 404 page for an unknown route", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  // The 404 offers a way back home that actually navigates there.
  await page.getByRole("link", { name: /Back to introduction/ }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Jayaram Kasi Visweswaran" }),
  ).toBeVisible();
});
