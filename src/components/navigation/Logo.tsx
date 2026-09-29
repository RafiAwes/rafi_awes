import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Rafi Rahman — home"
      className={cn(
        "group inline-flex items-center gap-2 text-[0.95rem] font-semibold tracking-[0.18em]",
        className,
      )}
    >
      <span
        aria-hidden
        className="size-2 rounded-full bg-[image:var(--accent-gradient)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-150"
      />
      RAFI
    </Link>
  );
}
