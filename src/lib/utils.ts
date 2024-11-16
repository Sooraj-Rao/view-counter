import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



// export const API_URL = "https://viewcount.soorajrao.in/api";
export const API_URL = "http://localhost:3000/api";