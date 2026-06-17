import { profile, highlights, expertise } from "~/data";
import { FiLinkedin, FiGithub, FiMail, FiMapPin } from "react-icons/fi";

function Introduction() {
  return (
    <div className="space-y-9">
      <header>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <div className="relative hidden shrink-0 lg:block">
            <span
              aria-hidden
              className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold-300/50 to-gold-600/30 blur-md dark:from-gold-300/30 dark:to-gold-600/20"
            />
            {/* Two theme-matched portraits: the light shot (sky backdrop) shows in
                light mode, the dark shot (black backdrop) shows in dark mode. */}
            <img
              src="/profile-light.png"
              alt={profile.name}
              width={512}
              height={512}
              className="relative h-32 w-32 rounded-full object-cover ring-1 ring-night-900/10 dark:hidden sm:h-36 sm:w-36"
            />
            <img
              src="/profile-dark.png"
              alt={profile.name}
              width={512}
              height={512}
              className="relative hidden h-32 w-32 rounded-full object-cover ring-1 ring-moonlight/15 dark:block sm:h-36 sm:w-36"
            />
          </div>
          <h1 className="text-center font-display text-4xl font-medium tracking-tight text-night-950 dark:text-cream sm:text-left sm:text-6xl">
            {profile.name}
          </h1>
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-night-900/80 dark:text-moonlight/80">
          {profile.tagline}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={profile.linkedIn}
            target="_blank"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-night-950 transition hover:bg-gold-300"
          >
            <FiLinkedin className="h-4 w-4" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-night-950 transition hover:bg-gold-300"
          >
            <FiGithub className="h-4 w-4" />
          </a>
          <a
            className="inline-flex items-center gap-1.5 text-sm text-gold-700 dark:text-gold-400/80 transition hover:text-gold-600 dark:hover:text-gold-300"
            href={`mailto:${profile.email}`}
          >
            <FiMail className="h-4 w-4" />
            {profile.email}
          </a>
          <span className="inline-flex items-center gap-1.5 text-sm text-night-900/50 dark:text-moonlight/50">
            <FiMapPin className="h-4 w-4" />
            {profile.location}
          </span>
        </div>
      </header>

      <section className="border-t border-night-900/10 dark:border-night-600/40 pt-6">
        <ul className="space-y-4">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-4">
              <span aria-hidden className="mt-2 text-gold-600 dark:text-gold-400">
                ✦
              </span>
              <p className="text-lg leading-8 text-night-900/80 dark:text-moonlight/80">{highlight}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-night-900/10 dark:border-night-600/40 pt-6">
        <p className="text-sm uppercase tracking-[0.3em] text-gold-700 dark:text-gold-400/80">
          Expertise
        </p>
        <h2 className="mt-4 font-display text-3xl text-night-950 dark:text-cream">What I build</h2>
        <p className="mt-4 max-w-xl leading-7 text-night-900/70 dark:text-moonlight/70">
          A blend of data strategy, engineering execution, and product-minded
          delivery. I focus on systems that are observable, extensible, and
          aligned to business outcomes.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3 md:gap-6">
          {expertise.map((item) => (
            <div key={item.title}>
              <p className="text-sm uppercase tracking-[0.3em] text-night-900/50 dark:text-moonlight/50">
                {item.title}
              </p>
              <div className="mt-3 h-px w-10 bg-gold-500/70 dark:bg-gold-400/60" />
              <p className="mt-4 leading-7 text-night-900/80 dark:text-moonlight/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-night-900/10 dark:border-night-600/40 pt-6">
        <p className="text-sm uppercase tracking-[0.3em] text-gold-700 dark:text-gold-400/80">
          Let's connect
        </p>
        <h2 className="mt-4 font-display text-3xl text-night-950 dark:text-cream">
          Open to new opportunities
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-night-900/70 dark:text-moonlight/70">
          If you want someone who can translate data into product decisions,
          build resilient systems, and collaborate across engineering and
          analytics teams, let's talk.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-6 inline-flex rounded-full bg-gold-400 px-7 py-3 text-sm font-semibold text-night-950 transition hover:bg-gold-300"
        >
          Email me
        </a>
      </section>
    </div>
  );
}

export default Introduction;
