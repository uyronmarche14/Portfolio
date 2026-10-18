import { Fragment } from "react";

interface HighlightedTextProps {
  text: string;
  terms?: string[];
}

const escape = (term: string) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Renders `text` with the given phrases wrapped in a hand-marked highlight
 * (see `.marker` in globals.css). Phrases that are not in the text are ignored.
 */
export function HighlightedText({ text, terms = [] }: HighlightedTextProps) {
  const present = terms.filter((term) => term && text.includes(term));
  if (present.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${present.map(escape).join("|")})`, "g");
  return (
    <>
      {text.split(pattern).map((part, i) =>
        present.includes(part) ? (
          <span key={i} className="marker group/term">
            {part.split(" ").map((word, w, words) => (
              <Fragment key={w}>
                <span className="inline-block origin-bottom transition-transform duration-200 ease-out group-hover/term:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/term:scale-100">
                  {word}
                </span>
                {w < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
