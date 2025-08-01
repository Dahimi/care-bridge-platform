import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "War Child Trauma Platform",
  description: "Professional dashboard for volunteer psychologists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "min-h-full bg-background")}>
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
} 