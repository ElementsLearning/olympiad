import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSingularValue = <T>(value: T | T[]): T => {
  if (Array.isArray(value)) {
    return value[0]
  }
  return value
}
