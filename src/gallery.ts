// Public, interactive work shown as live embeds (Observable notebooks, Tableau
// Public dashboards, etc.). Kept in its own file — separate from data.ts — so it
// never leaks into the generated CV.

// Metadata per source platform. `label` is the badge text; `accent` tints the
// badge so each platform reads at a glance.
export const galleryPlatforms = {
  observable: { label: "Observable", accent: "#1b1e23" },
  tableau: { label: "Tableau Public", accent: "#1f77b4" },
  github: { label: "GitHub", accent: "#24292f" },
  other: { label: "Elsewhere", accent: "#a87b2a" },
} as const;

export type GalleryPlatform = keyof typeof galleryPlatforms;

export type GalleryItem = {
  title: string;
  platform: GalleryPlatform;
  description?: string;
  // The iframe `src` for the live embed.
  embedSrc: string;
  // Optional link to the original artifact (opens in a new tab).
  url?: string;
  // Embed height in px. Defaults to 600 if omitted.
  height?: number;
};

export const gallery: GalleryItem[] = [
  {
    title: "Interactive pass map",
    platform: "observable",
    description:
      "A live, interactive football pass map built in an Observable notebook.",
    embedSrc:
      "https://observablehq.com/embed/@jayaramkasi/interactive-passmap?cells=passMap%2Cstyle",
    url: "https://observablehq.com/@jayaramkasi/interactive-passmap",
    height: 730,
  },
  {
    title: "Kerala elections 2021",
    platform: "tableau",
    description:
      "A Tableau Public story visualizing the 2021 Kerala assembly election results.",
    embedSrc:
      "https://public.tableau.com/views/Keralaelections2021/Story1?:embed=y&:showVizHome=no&:toolbar=no&:display_count=no",
    url: "https://public.tableau.com/views/Keralaelections2021/Story1",
    height: 900,
  },
  {
    title: "Multi-track event timeline",
    platform: "observable",
    description:
      "An interactive multi-track event timeline chart built in an Observable notebook.",
    embedSrc:
      "https://observablehq.com/embed/@jayaramkasi/multi-track-event-timeline-chart@73?cells=multiTrackEventTimeline",
    url: "https://observablehq.com/@jayaramkasi/multi-track-event-timeline-chart",
    height: 284,
  },
];
