import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatThousands(value: string): string {
  const num = value.replace(/\D/g, "");
  if (!num) return "";
  return parseInt(num, 10).toLocaleString("en-US");
}

export function parseThousands(formatted: string): number {
  return parseInt(formatted.replace(/,/g, ""), 10) || 0;
}
