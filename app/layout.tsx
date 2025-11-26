import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Try-A-Job｜15分钟职业微体验",
  description: "用 15 分钟做一次职业微体验，而不是刷 30 个视频。",
  metadataBase: new URL("http://localhost:3000")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
