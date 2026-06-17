import { NavLink } from "react-router-dom";
import { profile } from "~/data";

const navItems = [
  { to: "/", label: "Introduction" },
  { to: "/experience", label: "Experience" },
  { to: "/expertise", label: "Expertise" },
  { to: "/education", label: "Education" },
  { to: "/featured-work", label: "Featured work" },
  { to: "/community", label: "Community" },
];

function Sidebar() {
  return (
    <aside className="lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:overflow-y-auto">
      <div className="flex h-full flex-col border-b border-night-600/40 px-6 py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-400/80">
            Portfolio
          </p>
          <p className="mt-3 font-display text-xl text-cream">
            {profile.name}
          </p>
        </div>
        <nav className="mt-8 flex flex-row flex-wrap gap-x-6 gap-y-3 lg:mt-14 lg:flex-col lg:gap-y-5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 text-sm tracking-wide transition ${
                  isActive
                    ? "text-gold-300"
                    : "text-moonlight/60 hover:text-moonlight"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      isActive
                        ? "bg-gold-300 shadow-[0_0_8px_2px_rgba(244,211,94,0.45)]"
                        : "bg-moonlight/25 group-hover:bg-moonlight/50"
                    }`}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 hidden lg:mt-auto lg:block">
          <a
            className="text-sm text-gold-400/80 transition hover:text-gold-300"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
