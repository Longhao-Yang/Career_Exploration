"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
export function CopyButton({ text, label = "复制" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false), 1200); } catch {}
  }
  return <Button variant="secondary" onClick={copy} className="no-print">{copied ? "已复制 ✓" : label}</Button>;
}
