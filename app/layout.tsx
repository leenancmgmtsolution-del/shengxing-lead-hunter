import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Shengxing Lead Hunter",
  description: "AI-assisted lead discovery and sales workflow platform for 胜行天下工作室",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
