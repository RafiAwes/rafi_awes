import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { slugify, textContent } from "@/lib/utils/text";

function Heading({ level, children }: { level: 2 | 3; children?: ReactNode }) {
  const Tag = level === 2 ? "h2" : "h3";
  const id = slugify(textContent(children));
  return (
    <Tag id={id} className="group scroll-mt-28">
      <a href={`#${id}`} className="no-underline! decoration-transparent!">
        {children}
        <span
          aria-hidden
          className="ml-3 text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100"
        >
          #
        </span>
      </a>
    </Tag>
  );
}

function SmartLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

/** Use in MDX for images: <Figure src="/images/x.png" alt="" width={1600} height={900} caption="..." /> */
function Figure({
  caption,
  ...props
}: ComponentPropsWithoutRef<typeof Image> & { caption?: string }) {
  return (
    <figure className="max-w-none! md:-mx-8">
      <Image {...props} alt={props.alt} className="w-full rounded-2xl border border-line" sizes="(min-width: 1024px) 800px, 100vw" />
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-fg-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-line bg-surface-raised p-6 [&>p]:mt-0">
      {title ? <p className="eyebrow mb-3 text-accent">{title}</p> : null}
      <div className="text-[0.95em] [&>*+*]:mt-3">{children}</div>
    </aside>
  );
}

const components: MDXComponents = {
  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
  a: SmartLink,
  Figure,
  Callout,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
