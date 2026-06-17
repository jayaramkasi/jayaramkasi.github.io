import { education } from "~/data";

function Education() {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-gold-700 dark:text-gold-400/80">
        Education
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium text-night-950 dark:text-cream sm:text-5xl">
        Academic background
      </h1>

      <ol className="mt-8 space-y-8 border-l border-night-900/10 dark:border-night-600/50 pl-8">
        {education.map((entry) => (
          <li key={`${entry.institution}-${entry.period}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[37px] top-2 h-2 w-2 rounded-full bg-gold-600 dark:bg-gold-400 shadow-[0_0_10px_3px_rgba(244,211,94,0.35)]"
            />
            <p className="text-sm tracking-wide text-gold-700 dark:text-gold-400/80">
              {entry.period}
            </p>
            <h2 className="mt-2 font-display text-2xl text-night-950 dark:text-cream">
              {entry.institution}
            </h2>
            <p className="mt-1 text-night-900/70 dark:text-moonlight/70">{entry.degree}</p>
            {entry.activities && (
              <ul className="mt-4 space-y-2">
                {entry.activities.map((activity, index) => (
                  <li key={index} className="text-night-900/70 dark:text-moonlight/70">
                    {activity}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Education;
