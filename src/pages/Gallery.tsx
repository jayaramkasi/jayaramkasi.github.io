import { FiArrowUpRight } from "react-icons/fi";
import { gallery, galleryPlatforms } from "~/gallery";

function Gallery() {
  return (
    <div>
      <h1 className="mt-3 font-display text-xl font-medium text-night-950 dark:text-cream sm:text-5xl">
        Work in public
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-night-900/80 dark:text-moonlight/80">
        Live, interactive pieces — notebooks, dashboards, and visualizations —
        embedded straight from where they're published.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {gallery.map((item) => {
          const platform = galleryPlatforms[item.platform];
          return (
            <figure
              key={item.title}
              className="overflow-hidden rounded-xl border border-night-900/10 bg-white/40 shadow-sm dark:border-night-600/40 dark:bg-night-900/40"
            >
              <figcaption className="flex flex-wrap items-start justify-between gap-3 border-b border-night-900/10 px-5 py-4 dark:border-night-600/40">
                <div>
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-[0.2em] text-white"
                    style={{ backgroundColor: platform.accent }}
                  >
                    {platform.label}
                  </span>
                  <h2 className="mt-2 font-display text-2xl text-night-950 dark:text-cream">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-night-900/70 dark:text-moonlight/70">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-sm tracking-wide text-gold-700 transition hover:text-gold-600 dark:text-gold-400/90 dark:hover:text-gold-300"
                  >
                    Open original
                    <FiArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </figcaption>

              <iframe
                src={item.embedSrc}
                title={item.title}
                loading="lazy"
                width="100%"
                height={item.height ?? 600}
                frameBorder={0}
                className="block w-full bg-white"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
