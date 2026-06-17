import { experience } from "~/data";

function Experience() {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-gold-400/80">
        Experience
      </p>
      <h1 className="mt-6 font-display text-4xl font-medium text-cream sm:text-5xl">
        16 years of growth
      </h1>

      <ol className="mt-16 space-y-14 border-l border-night-600/50 pl-8">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[37px] top-2 h-2 w-2 rounded-full bg-gold-400 shadow-[0_0_10px_3px_rgba(244,211,94,0.35)]"
            />
            <p className="text-sm tracking-wide text-gold-400/80">
              {job.period}
            </p>
            <h2 className="mt-2 font-display text-2xl text-cream">
              {job.role}
            </h2>
            <p className="mt-1 text-moonlight/50">{job.company}</p>
            <p className="mt-4 leading-7 text-moonlight/80">{job.summary}</p>
            <ul className="mt-4 space-y-2">
              {job.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex gap-3 leading-7 text-moonlight/70"
                >
                  <span aria-hidden className="text-gold-400/70">
                    ✦
                  </span>
                  {achievement}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Experience;
