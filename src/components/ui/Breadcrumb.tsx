import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../../lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center text-sm text-slate-500 font-medium", className)}>
      <Link href="/" className="hover:text-[#1B2A6B] transition-colors flex items-center justify-center">
        <Home size={14} className="mb-0.5" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={14} className="mx-2 text-slate-400 shrink-0" />
          {item.href && index !== items.length - 1 ? (
            <Link href={item.href} className="hover:text-[#1B2A6B] transition-colors truncate max-w-[150px] sm:max-w-none">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1B2A6B] font-bold truncate max-w-[200px] sm:max-w-none">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
