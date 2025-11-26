import { cn } from "@/lib/utils";
import Link from "next/link";
type Variant = "default" | "secondary" | "ghost";
const stylesByVariant: Record<Variant, string> = {
  default: "bg-zinc-900 text-zinc-50 hover:bg-zinc-800",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
  ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
};
export function Button({ children, className, variant = "default", href, type = "button", onClick, disabled, }: {
  children: React.ReactNode; className?: string; variant?: Variant; href?: string; type?: "button" | "submit"; onClick?: () => void; disabled?: boolean;
}) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed";
  const cls = cn(base, stylesByVariant[variant], className);
  if (href) return <Link className={cls} href={href}>{children}</Link>;
  return <button type={type} className={cls} onClick={onClick} disabled={disabled}>{children}</button>;
}
