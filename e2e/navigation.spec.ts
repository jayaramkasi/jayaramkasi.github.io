import { test, expect } from "@playwright/test";

// The desktop sidebar is always visible at >= lg (1024px). Desktop Chrome's
// default 1280px viewport puts us there.
const navFlow = [
  { link: "Experience", url: /\/experience$/, heading: "16 years of growth" },
  { link: "Expertise", url: /\/expertise$/, heading: "Skills & proficiency" },
  { link: "Education", url: /\/education$/, heading: "Academic background" },
  { link: "Featured work", url: /\/featured-work$/, heading: "Projects that demonstrate impact" },
  { link: "Community", url: /\/community$/, heading: "Sharing knowledge with the community" },
  { link: "Gallery", url: /\/gallery$/, heading: "Work in public" },
  { link: "Introduction", url: /\/$/, heading: "Jayaram Kasi Visweswaran" },
];

test("navigates through every section from the sidebar", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation");

  for (const step of navFlow) {
    await nav.getByRole("link", { name: step.link, exact: true }).click();
    await expect(page).toHaveURL(step.url);
    await expect(page.getByRole("heading", { level: 1, name: step.heading })).toBeVisible();
  }
});

test("marks the current section as active", async ({ page }) => {
  await page.goto("/experience");
  const nav = page.getByRole("navigation");
  // react-router's NavLink sets aria-current="page" on the active link.
  await expect(nav.getByRole("link", { name: "Experience", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(nav.getByRole("link", { name: "Gallery", exact: true })).not.toHaveAttribute(
    "aria-current",
    "page",
  );
});
