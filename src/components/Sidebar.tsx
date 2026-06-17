import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
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
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the drawer after navigating to a new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While the drawer is open on mobile, lock body scroll and allow Escape to
  // close it. The lock is released whenever `open` flips back to false.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Reset to the closed state when the layout switches to the desktop sidebar
  // so a left-over scroll lock can't strand the page.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* Mobile top bar — hidden once the static sidebar takes over at lg. */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-night-900/10 bg-cream/95 px-5 backdrop-blur dark:border-night-600/40 dark:bg-night-950/95 lg:hidden">
        {/* Theme-matched portrait stands in for the name on the mobile top bar. */}
        <img
          src="/profile-light.png"
          alt={profile.name}
          width={512}
          height={512}
          className="h-10 w-10 rounded-full object-cover ring-1 ring-night-900/10 dark:hidden"
        />
        <img
          src="/profile-dark.png"
          alt={profile.name}
          width={512}
          height={512}
          className="hidden h-10 w-10 rounded-full object-cover ring-1 ring-moonlight/15 dark:block"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="sidebar-nav"
          className="inline-flex items-center justify-center rounded-md p-2 text-night-900/70 transition hover:text-gold-700 dark:text-moonlight/70 dark:hover:text-gold-300"
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </header>

      {/* Backdrop behind the open drawer (mobile only). */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-night-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        id="sidebar-nav"
        className={`fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto bg-cream transition-transform duration-300 ease-in-out dark:bg-night-950 lg:z-30 lg:w-64 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col border-night-900/10 px-5 py-5 dark:border-night-600/40 lg:border-r lg:px-8 lg:py-10">
          <div className="flex items-center justify-between">
            <p className="mt-3 font-display text-xl text-night-950 dark:text-cream">
              Browse
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-night-900/70 transition hover:text-gold-700 dark:text-moonlight/70 dark:hover:text-gold-300 lg:hidden"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-5 flex flex-col gap-y-3 lg:mt-8">
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
          <div className="mt-auto pt-8">
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
