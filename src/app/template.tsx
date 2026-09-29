/**
 * Templates re-mount on every navigation, so a CSS entrance animation here
 * gives each route a quiet page transition with zero JavaScript.
 * The animation is disabled under prefers-reduced-motion (see globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
