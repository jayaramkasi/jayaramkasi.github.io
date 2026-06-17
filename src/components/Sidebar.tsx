import { NavLink } from "react-router-dom";
import { profile } from "~/data";
import ThemeToggle from "~/components/ThemeToggle";

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
      <div className="flex h-full flex-col border-b border-night-900/10 px-5 py-5 dark:border-night-600/40 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
        <div>
          <p className="mt-3 font-display text-xl text-night-950 dark:text-cream">
            Browse
          </p>
        </div>
        <nav className="mt-5 flex flex-row flex-wrap gap-x-5 gap-y-2.5 lg:mt-8 lg:flex-col lg:gap-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 text-sm tracking-wide transition ${
                  isActive
                    ? "text-gold-700 dark:text-gold-300"
                    : "text-night-900/60 hover:text-night-900 dark:text-moonlight/60 dark:hover:text-moonlight"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      isActive
                        ? "bg-gold-500 shadow-[0_0_8px_2px_rgba(244,211,94,0.45)] dark:bg-gold-300"
                        : "bg-night-900/25 group-hover:bg-night-900/50 dark:bg-moonlight/25 dark:group-hover:bg-moonlight/50"
                    }`}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="mt-5 lg:mt-auto">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
