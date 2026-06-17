import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "~/hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex items-center gap-2 rounded-full border border-night-900/15 px-4 py-2 text-sm text-night-900/70 transition hover:border-gold-600/50 hover:text-gold-700 dark:border-night-600/50 dark:text-moonlight/70 dark:hover:border-gold-300/50 dark:hover:text-gold-300"
    >
      {isDark ? (
        <FiMoon className="h-4 w-4" />
      ) : (
        <FiSun className="h-4 w-4" />
      )}
      {isDark ? "Dark" : "Light"}
    </button>
  );
}

export default ThemeToggle;
