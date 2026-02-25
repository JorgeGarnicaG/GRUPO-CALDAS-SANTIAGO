import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
}

export function Header({ title, subtitle, rightContent }: HeaderProps) {
  return (
    <header className="flex items-start justify-between border-b border-slate-800/80 pb-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-50">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        )}
      </div>
      {rightContent && (
        <div className="flex items-center gap-3 text-xs text-slate-300">
          {rightContent}
        </div>
      )}
    </header>
  );
}

