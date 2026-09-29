/** Joins truthy class names. Intentionally tiny — no merge semantics needed. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
