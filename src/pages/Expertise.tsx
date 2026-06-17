import { LollipopHChart } from "@headless-charts/react";
import { skillGroups, toolGroups } from "~/data";

function Expertise() {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-gold-400/80">
        Expertise
      </p>
      <h1 className="mt-6 font-display text-4xl font-medium text-cream sm:text-5xl">
        Skills & proficiency
      </h1>
      <p className="mt-6 max-w-2xl leading-7 text-moonlight/70">
        A self-assessment of the tools and disciplines I reach for most, rated
        out of ten.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-8">
        {skillGroups.map((group, index) => (
          <section key={group.title}>
            <p className="text-sm uppercase tracking-[0.3em] text-moonlight/50">
              {group.title}
            </p>
            <div className="mt-3 h-px w-10 bg-gold-400/60" />
            <LollipopHChart
              id={`skills-lollipop-${index}`}
              data={group.items}
              shape="circle"
              className="mt-6 h-72 w-full bg-transparent text-moonlight/60 text-xs"
              classNames={{
                lines: "stroke-2 stroke-gold-400/40",
                symbols: "fill-gold-400 stroke-gold-400",
              }}
              margin={{ left: 130, right: 40, top: 10, bottom: 40 }}
              x={{
                key: "level",
                start: 0,
                end: 10,
                axis: { location: "bottom", ticks: 5 },
              }}
              y={{ key: "name", axis: { location: "left" } }}
              tooltip={{
                html: (d: { name: string; level: number }) =>
                  `<div class="rounded-md border border-night-600/60 bg-night-800 px-3 py-2 text-sm text-cream shadow-lg">${d.name}: <span class="text-gold-300">${d.level}/10</span></div>`,
              }}
            />
          </section>
        ))}
      </div>

      <section className="mt-20 border-t border-night-600/40 pt-12">
        <p className="text-sm uppercase tracking-[0.3em] text-gold-400/80">
          Tools & Frameworks
        </p>
        <h2 className="mt-4 font-display text-3xl text-cream">
          What I work with
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-moonlight/70">
          The platforms, libraries, and frameworks I reach for to ship data and
          AI systems end to end.
        </p>

        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:gap-8">
          {toolGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm uppercase tracking-[0.3em] text-moonlight/50">
                {group.title}
              </p>
              <div className="mt-3 h-px w-10 bg-gold-400/60" />
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-night-600/60 bg-night-800/40 px-4 py-1.5 text-sm text-moonlight/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Expertise;
