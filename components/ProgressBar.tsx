import { clamp } from "@/lib/utils";
export function ProgressBar({ value }: { value: number }) {
  const v = clamp(value, 0, 100);
  return <div className="h-2 w-full rounded-full bg-zinc-100"><div className="h-2 rounded-full bg-zinc-900" style={{ width: `${v}%` }} /></div>;
}
