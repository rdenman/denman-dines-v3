import { Ingredient } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import Fraction from "fraction.js";
import { twMerge } from "tailwind-merge";

/** Combines and merges CSS class names using clsx and tailwind-merge. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Type guard that checks if a value is not null or undefined. */
export function exists<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/** Formats minutes into a human-readable time string (e.g., "1h 30m", "45m"). */
export function formatTime(minutes: number | null): string {
  if (!minutes) return "N/A";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${mins}m`;
}

/** Converts a decimal number to a simplified fraction string. */
export function formatFraction(num: number): string {
  const fraction = new Fraction(num).simplify(0.01);
  return fraction.toFraction(true);
}

/** Formats ingredient amounts by converting decimals to fractions and handling units. */
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

/** Formats a complete ingredient string with amount, name, and preparation. */
export function formatIngredient(ingredient: Ingredient): string {
  let formatted = "";
  if (ingredient.amount) {
    formatted += formatIngredientAmount(ingredient.amount) + " ";
  }
  formatted += ingredient.name;
  if (ingredient.preparation) {
    formatted += `, ${ingredient.preparation}`;
  }
  return formatted.trim();
}
