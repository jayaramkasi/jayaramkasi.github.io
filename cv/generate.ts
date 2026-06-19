// CV generator — converts src/data.ts into a print-ready CV (HTML + PDF).
//
// Usage:
//   node --experimental-strip-types cv/generate.ts        # writes cv/cv.html
//   node --experimental-strip-types cv/generate.ts --pdf  # also renders cv/cv.pdf
//
// Edit src/data.ts, then re-run to regenerate. All content below is derived
// from that single source of truth — no CV copy lives in this file.

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeFileSync } from "fs";

import {
  profile,
  highlights,
  expertise,
  skillGroups,
  toolGroups,
  projects,
  experience,
  community,
  education,
  certifications,
} from "../src/data.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- helpers ----------------------------------------------------------------

const esc = (s: unknown): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// strip a leading protocol so links read cleanly on paper
const pretty = (url: string): string => esc(url.replace(/^https?:\/\//, ""));

const chips = (tags: string[]): string =>
  `<div class="chips">${tags
    .map((t) => `<span class="chip">${esc(t)}</span>`)
    .join("")}</div>`;

const bullets = (items?: string[]): string =>
  items?.length
    ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`
    : "";

// 0–10 skill level -> bar width %
const pct = (level: number): number => Math.round((level / 10) * 100);

// --- section renderers ------------------------------------------------------

const renderHeader = (): string => `
  <header>
    <h1>${esc(profile.name)}</h1>
    <div class="tagline">${esc(profile.tagline)}</div>
    <div class="contact">
      <span>📍 ${esc(profile.location)}</span>
      <span>✉ <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></span>
      <span>🔗 <a href="${esc(profile.linkedIn)}">${pretty(profile.linkedIn)}</a></span>
      <span>💻 <a href="${esc(profile.github)}">${pretty(profile.github)}</a></span>
    </div>
  </header>`;

const renderProfile = (): string => `
  <section class="avoid-break">
    <h2>Profile</h2>
    <ul class="highlights">
      ${highlights.map((h) => `<li>${esc(h)}</li>`).join("\n      ")}
    </ul>
  </section>`;

const renderExpertise = (): string => `
  <section class="avoid-break">
    <h2>Areas of Expertise</h2>
    <div class="cols-3">
      ${expertise
        .map(
          (e) =>
            `<div class="expertise-item"><b>${esc(e.title)}</b><br/><span>${esc(
              e.description.trim()
            )}</span></div>`
        )
        .join("\n      ")}
    </div>
  </section>`;

const renderExperience = (): string => `
  <section>
    <h2>Experience</h2>
    ${experience
      .map(
        (job) => `
    <div class="job">
      <div class="job-head">
        <div><span class="job-role">${esc(job.role)}</span>, <span class="job-company">${esc(
          job.company.trim()
        )}</span></div>
        <div class="job-period">${esc(job.period)}</div>
      </div>
      ${job.summary?.trim() ? `<div class="job-summary">${esc(job.summary.trim())}</div>` : ""}
      ${bullets(job.achievements)}
    </div>`
      )
      .join("")}
  </section>`;

const renderProjects = (): string => `
  <section class="avoid-break">
    <h2>Featured Work</h2>
    <div class="cols">
      ${projects
        .map(
          (p) => `
      <div class="proj">
        <div class="proj-title">${esc(p.title)}</div>
        <div class="proj-cat">${esc(p.category)}</div>
        <div class="proj-desc">${esc(p.description)}</div>
        ${chips(p.tags)}
      </div>`
        )
        .join("")}
    </div>
  </section>`;

const renderSkills = (): string => {
  const group = (g: (typeof skillGroups)[number]): string => `
      <div>
        <div class="grp-title">${esc(g.title)}</div>
        ${g.items
          .map(
            (s) =>
              `<div class="skill-row"><span class="skill-name">${esc(
                s.name
              )}</span><span class="bar"><span style="width:${pct(
                s.level
              )}%"></span></span></div>`
          )
          .join("\n        ")}
      </div>`;

  const tools = toolGroups
    .map(
      (t) =>
        `<div><span class="grp-title" style="display:inline">${esc(
          t.title
        )}: </span><span style="color:var(--muted)">${esc(
          t.items.join(", ")
        )}</span></div>`
    )
    .join("\n      ");

  return `
  <section class="avoid-break">
    <h2>Skills &amp; Tools</h2>
    <div class="cols">
      ${skillGroups.map(group).join("\n")}
    </div>
    <div class="tool-groups">
      ${tools}
    </div>
  </section>`;
};

const renderEducation = (): string => `
  <section class="avoid-break">
    <h2>Education</h2>
    ${education
      .map(
        (e) => `
    <div class="entry">
      <div class="entry-head">
        <div class="entry-title">${esc(
          e.institution.trim()
        )} <span style="font-weight:400;color:var(--muted)">— ${esc(
          e.degree
        )}</span></div>
        <div class="entry-meta">${esc(e.period)}</div>
      </div>
      ${bullets(e.activities)}
    </div>`
      )
      .join("")}
  </section>`;

const renderCertifications = (): string => `
  <section class="avoid-break">
    <h2>Certifications</h2>
    ${certifications
      .map(
        (c) => `
    <div class="entry">
      <div class="entry-head">
        <div class="entry-title">${esc(c.title)} <span style="font-weight:400;color:var(--muted)">— ${esc(
          c.issuer
        )}</span></div>
        <div class="entry-meta">${esc(c.period)}</div>
      </div>
      ${
        "credentialUrl" in c && c.credentialUrl
          ? `<div class="entry-desc"><a href="${esc(
              c.credentialUrl
            )}" style="color:var(--accent);text-decoration:none">${pretty(
              c.credentialUrl
            )}</a></div>`
          : ""
      }
    </div>`
      )
      .join("")}
  </section>`;

const renderCommunity = (): string => `
  <section class="avoid-break">
    <h2>Community &amp; Beyond</h2>
    <div class="cols">
      ${community
        .map(
          (c) => `
      <div class="entry">
        <div class="entry-type">${esc(c.type)}</div>
        <div class="entry-head"><div class="entry-title">${esc(
          c.title
        )}</div><div class="entry-meta">${esc(c.venue.trim())} · ${esc(
          c.period
        )}</div></div>
        <div class="entry-desc">${esc(c.description.trim())}</div>
      </div>`
        )
        .join("")}
    </div>
  </section>`;

// --- document ---------------------------------------------------------------

const STYLES = `
  :root {
    --ink: #1a1d24; --muted: #5b6470; --faint: #8a929e;
    --accent: #2f6f7e; --line: #d9dee4; --chip: #eef2f4;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: var(--ink); font-size: 10.2px; line-height: 1.45; }
  @page { size: A4; margin: 13mm 14mm; }
  .page { max-width: 182mm; margin: 0 auto; }
  header { border-bottom: 2px solid var(--accent); padding-bottom: 10px; margin-bottom: 14px; }
  h1 { font-size: 23px; letter-spacing: 0.2px; font-weight: 700; }
  .tagline { color: var(--muted); font-size: 11px; margin-top: 4px; max-width: 150mm; }
  .contact { margin-top: 8px; font-size: 9.6px; color: var(--muted); display: flex; flex-wrap: wrap; gap: 4px 14px; }
  .contact span { white-space: nowrap; }
  .contact a { color: var(--accent); text-decoration: none; }
  section { margin-bottom: 13px; }
  h2 { font-size: 10.5px; text-transform: uppercase; letter-spacing: 1.3px; color: var(--accent); font-weight: 700; margin-bottom: 7px; border-bottom: 1px solid var(--line); padding-bottom: 3px; }
  .highlights { list-style: none; display: grid; gap: 3px; }
  .highlights li { position: relative; padding-left: 13px; }
  .highlights li::before { content: "▸"; position: absolute; left: 0; color: var(--accent); }
  .job { margin-bottom: 10px; page-break-inside: avoid; }
  .job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
  .job-role { font-weight: 700; font-size: 11px; }
  .job-company { color: var(--accent); font-weight: 600; }
  .job-period { color: var(--faint); font-size: 9.4px; white-space: nowrap; }
  .job-summary { color: var(--muted); font-style: italic; margin: 2px 0 3px; }
  .job ul { list-style: none; margin-top: 2px; }
  .job ul li { position: relative; padding-left: 12px; margin-bottom: 2px; }
  .job ul li::before { content: "–"; position: absolute; left: 2px; color: var(--faint); }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 22px; }
  .cols-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px 18px; }
  .skill-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 3px; }
  .skill-name { font-size: 9.8px; }
  .bar { flex: 1; height: 5px; background: var(--chip); border-radius: 3px; overflow: hidden; max-width: 90px; }
  .bar > span { display: block; height: 100%; background: var(--accent); }
  .grp-title { font-weight: 700; font-size: 9.6px; margin-bottom: 4px; color: var(--ink); }
  .tool-groups { margin-top: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 5px 22px; }
  .chips { display: flex; flex-wrap: wrap; gap: 4px; }
  .chip { background: var(--chip); color: var(--muted); border-radius: 3px; padding: 1.5px 6px; font-size: 8.8px; }
  .expertise-item { margin-bottom: 5px; }
  .expertise-item b { color: var(--ink); }
  .expertise-item span { color: var(--muted); }
  .proj { margin-bottom: 7px; page-break-inside: avoid; }
  .proj-title { font-weight: 700; font-size: 10px; }
  .proj-cat { color: var(--faint); font-size: 8.8px; text-transform: uppercase; letter-spacing: 0.5px; }
  .proj-desc { color: var(--muted); margin: 1px 0 3px; }
  .entry { margin-bottom: 7px; page-break-inside: avoid; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
  .entry-title { font-weight: 700; font-size: 10px; }
  .entry-meta { color: var(--faint); font-size: 9px; white-space: nowrap; }
  .entry-type { color: var(--accent); font-size: 8.6px; text-transform: uppercase; letter-spacing: 0.6px; font-weight: 600; }
  .entry-desc { color: var(--muted); margin-top: 1px; }
  .entry ul { list-style: none; margin-top: 2px; }
  .entry ul li { position: relative; padding-left: 12px; color: var(--muted); }
  .entry ul li::before { content: "·"; position: absolute; left: 4px; color: var(--faint); }
  .avoid-break { page-break-inside: avoid; }`;

function buildHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${esc(profile.name)} — CV</title>
<style>${STYLES}
</style>
</head>
<body>
<div class="page">
${renderHeader()}
${renderProfile()}
${renderExpertise()}
${renderExperience()}
${renderProjects()}
${renderSkills()}
${renderEducation()}
${renderCertifications()}
${renderCommunity()}
</div>
</body>
</html>
`;
}

// --- main -------------------------------------------------------------------

const htmlPath = join(__dirname, "cv.html");
const pdfPath = join(__dirname, "cv.pdf");

writeFileSync(htmlPath, buildHtml());
console.log(`✓ Wrote ${htmlPath}`);

if (process.argv.includes("--pdf")) {
  // Render the generated HTML to PDF with Puppeteer's bundled Chromium.
  const { default: puppeteer } = await import("puppeteer");
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }
  console.log(`✓ Wrote ${pdfPath}`);
}
