import { community } from "~/data";

function Community() {
  return (
    <div>
      <h1 className="mt-3 font-display text-xl font-medium text-night-950 dark:text-cream sm:text-5xl">
        Sharing knowledge with the community
      </h1>

      <div className="mt-8 divide-y divide-night-900/10 dark:divide-night-600/40">
        {community.map((item) => (
          <article key={item.title} className="py-6 first:pt-0">
            <p className="text-sm uppercase tracking-[0.3em] text-night-900/50 dark:text-moonlight/50">
              {item.type}
            </p>
            <h2 className="mt-3 font-display text-2xl text-night-950 dark:text-cream">
              {item.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-night-900/80 dark:text-moonlight/80">
              {item.description}
            </p>
            <p className="mt-5 text-sm tracking-wide text-gold-700 dark:text-gold-400/80">
              {item.venue}  ·  {item.period}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Community;
