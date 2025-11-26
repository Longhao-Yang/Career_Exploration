import { cn } from "@/lib/utils";
export function Card({ className, children }: { className?: string; children: React.ReactNode; }) {
  return <section className={cn("rounded-3xl border bg-white p-6 shadow-soft print-card", className)}>{children}</section>;
}
