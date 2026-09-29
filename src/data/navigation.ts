import type { NavItem } from "@/types/common";

export const mainNavigation: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Blog", href: "/blog" },
];

export const footerNavigation: NavItem[] = [
  ...mainNavigation,
  { label: "Contact", href: "/contact" },
];

export const primaryCta: NavItem = { label: "Start a Project", href: "/contact" };
