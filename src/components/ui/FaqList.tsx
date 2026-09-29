import type { Faq } from "@/types/common";
import { PlusIcon } from "./Icons";

/** Accessible FAQ built on native <details>; no JavaScript required. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-b border-line">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-t border-line">
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-lg font-medium tracking-[-0.02em] md:text-xl">
            {faq.question}
            <PlusIcon className="mt-1.5 size-5 shrink-0 text-fg-muted transition-transform duration-500 group-open:rotate-45" />
          </summary>
          <p className="max-w-2xl pb-8 text-fg-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
