import { profile, highlights, expertise } from "~/data";
import LocationIcon from "~/assets/LocationIcon";

function Introduction() {
  return (
    <div className="space-y-20">
      <header>
        <h1 className="mt-4 font-display text-5xl font-medium tracking-tight text-cream sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-moonlight/80">
          {profile.tagline}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href={profile.linkedIn}
            target="_blank"
            className="inline-flex rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-night-950 transition hover:bg-gold-300"
          >
            LinkedIn
          </a>
          <a
            className="text-sm text-gold-400/80 transition hover:text-gold-300"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
          <span className="inline-flex items-center gap-1.5 text-sm text-moonlight/50">
            <LocationIcon className="h-4 w-4" />
            {profile.location}
          </span>
        </div>
      </header>

      <section className="border-t border-night-600/40 pt-12">
        <ul className="space-y-5">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-4">
              <span aria-hidden className="mt-2 text-gold-400">
                ✦
              </span>
              <p className="text-lg leading-8 text-moonlight/80">{highlight}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-night-600/40 pt-12">
        <p className="text-sm uppercase tracking-[0.3em] text-gold-400/80">
          Expertise
        </p>
        <h2 className="mt-4 font-display text-3xl text-cream">What I build</h2>
        <p className="mt-4 max-w-xl leading-7 text-moonlight/70">
          A blend of data strategy, engineering execution, and product-minded
          delivery. I focus on systems that are observable, extensible, and
          aligned to business outcomes.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {expertise.map((item) => (
            <div key={item.title}>
              <p className="text-sm uppercase tracking-[0.3em] text-moonlight/50">
                {item.title}
              </p>
              <div className="mt-3 h-px w-10 bg-gold-400/60" />
              <p className="mt-4 leading-7 text-moonlight/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-night-600/40 pt-12">
        <p className="text-sm uppercase tracking-[0.3em] text-gold-400/80">
          Let's connect
        </p>
        <h2 className="mt-4 font-display text-3xl text-cream">
          Open to new opportunities
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-moonlight/70">
          If you want someone who can translate data into product decisions,
          build resilient systems, and collaborate across engineering and
          analytics teams, let's talk.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-night-950 transition hover:bg-gold-300"
        >
          Email me
        </a>
      </section>
    </div>
  );
}

export default Introduction;
