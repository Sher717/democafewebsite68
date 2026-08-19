import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-medium tracking-wide transition-colors duration-200 min-h-11";

const variants = {
  primary: "bg-espresso text-espresso-foreground hover:bg-accent",
  outline: "border border-current/30 text-current hover:bg-current/8",
  light: "bg-background text-foreground hover:bg-secondary",
} as const;

type Variant = keyof typeof variants;

export function CtaLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link to={to} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function CtaAnchor({
  href,
  children,
  variant = "outline",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(base, variants[variant], className)}
    >
      {children}
    </a>
  );
}
