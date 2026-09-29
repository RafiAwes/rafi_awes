import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/animations/Magnetic";
import { cn } from "@/lib/utils/cn";
import { ArrowRight, ArrowUpRight } from "./Icons";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  arrow?: "right" | "up-right" | false;
  magnetic?: boolean;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  // bg-fg / text-surface invert against whichever surface the button sits on.
  primary: "bg-fg text-surface hover:bg-fg/90",
  secondary: "border border-line-strong text-fg hover:border-fg/50 hover:bg-fg/5",
  ghost: "text-fg hover:text-fg/80 px-0!",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = "right",
  magnetic = false,
  className,
}: ButtonLinkProps) {
  const Arrow = arrow === "up-right" ? ArrowUpRight : ArrowRight;

  const link = (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[-0.01em]",
        "transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-out-expo)]",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      <span>{children}</span>
      {arrow ? (
        <Arrow className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-px" />
      ) : null}
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
