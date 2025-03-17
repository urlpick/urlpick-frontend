import Link from "next/link";
import Logo from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import type { HeaderProps } from "@/types";

export default function Header({ minimal = false }: HeaderProps) {
  return (
    <header className="border-b border-border/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-all duration-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <Logo size={minimal ? "small" : "default"} />
          </div>
          {!minimal && (
            <span className="font-semibold text-xl text-foreground tracking-tight">
              URL<span className="text-primary">Pick</span>
            </span>
          )}
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
