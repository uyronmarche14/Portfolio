/**
 * Full-page poster background: a base, soft colour glows and thin vertical guide lines.
 * Pure CSS (see `.page-poster` in globals.css); one fixed layer behind every page, so the floating panels rest on it.
 */
export function PageBackground() {
  return (
    <div aria-hidden="true" className="page-poster">
      <span className="poster-grain" />
      <span className="poster-flare" />
    </div>
  );
}

export default PageBackground;
