import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "./Eyebrow";

interface SplitBlockProps {
  eyebrow: string;
  title: string;
  id: string;
  children: ReactNode;
}

/** Label/title on the left, content on the right — the standard detail-page row. */
export function SplitBlock({ eyebrow, title, id, children }: SplitBlockProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h2 id={id} className="text-display-sm font-medium">
          {title}
        </h2>
      </div>
      <Reveal className="lg:col-span-7 lg:col-start-6">{children}</Reveal>
    </div>
  );
}
