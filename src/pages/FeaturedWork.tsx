import { projects } from "~/data";

function FeaturedWork() {
  return (
    <div>
      <h1 className="mt-6 font-display text-xl font-medium text-cream sm:text-5xl">
        Projects that demonstrate impact
      </h1>

      <div className="mt-16 divide-y divide-night-600/40">
        {projects.map((project) => (
          <article key={project.title} className="py-12 first:pt-0">
            <p className="text-sm uppercase tracking-[0.3em] text-moonlight/50">
              {project.category}
            </p>
            <h2 className="mt-3 font-display text-2xl text-cream">
              {project.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-moonlight/80">
              {project.description}
            </p>
            <p className="mt-5 text-sm tracking-wide text-gold-400/80">
              {project.tags.join("  ·  ")}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FeaturedWork;
