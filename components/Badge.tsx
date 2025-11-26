import { cn } from "@/lib/utils";
export function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "ghost"; }) {
  const styles = variant === "default" ? "bg-zinc-900 text-zinc-50" : "bg-zinc-100 text-zinc-700";
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", styles)}>{children}</span>;
}
