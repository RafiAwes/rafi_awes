import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";

interface RevealTextProps {
  text: string;
  as?: "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
}

/**
 * Headline that rises word by word from behind a baseline mask.
 * Words are split on the server; only the shared observer runs on the client.
 */
export function RevealText({ text, as = "h2", className, delay }: RevealTextProps) {
  const words = text.split(" ");

  return (
    <Reveal as={as} variant="words" delay={delay} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="word">
            <span style={{ "--wi": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Reveal>
  );
}
