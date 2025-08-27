import { clsx, type ClassValue } from "clsx";
import Fraction from "fraction.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(minutes: number): string {
  if (!minutes) return "N/A";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${mins}m`;
}

export function formatFraction(num: number): string {
  const fraction = new Fraction(num);
  return fraction.toFraction(true);
}

export function formatIngredientAmount(amount: string | null): string {
  if (!amount) return "";

  // Match decimal numbers at the start of the string
  const decimalMatch = amount.match(/^(\d+\.?\d*)\s*(.*)/);

  if (!decimalMatch) return amount;

  const [, numberStr, rest] = decimalMatch;
  const number = parseFloat(numberStr);

  if (isNaN(number)) return amount;

  // Don't display amounts that are 0
  if (number === 0) return "";

  // Format the number as a fraction
  const formattedNumber = formatFraction(number);

  // Return the formatted fraction with the rest of the text
  return rest ? `${formattedNumber} ${rest}` : formattedNumber;
}

export function exists<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
