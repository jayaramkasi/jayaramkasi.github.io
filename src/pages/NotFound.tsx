import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-gold-700 dark:text-gold-400/80">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium text-night-950 dark:text-cream sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-prose text-night-900/70 dark:text-moonlight/70">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block text-sm uppercase tracking-[0.3em] text-gold-700 dark:text-gold-400/80 transition-colors hover:text-gold-600 dark:hover:text-gold-400"
      >
        ← Back to introduction
      </Link>
    </div>
  );
}

export default NotFound;
