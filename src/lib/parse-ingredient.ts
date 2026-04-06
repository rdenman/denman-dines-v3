const KNOWN_UNITS = new Set([
  "tsp",
  "teaspoon",
  "teaspoons",
  "tbsp",
  "tablespoon",
  "tablespoons",
  "cup",
  "cups",
  "fl oz",
  "oz",
  "ounce",
  "ounces",
  "lb",
  "lbs",
  "pound",
  "pounds",
  "g",
  "gram",
  "grams",
  "kg",
  "kilogram",
  "kilograms",
  "ml",
  "milliliter",
  "milliliters",
  "l",
  "liter",
  "liters",
  "clove",
  "cloves",
  "bunch",
  "bunches",
  "sprig",
  "sprigs",
  "stalk",
  "stalks",
  "head",
  "heads",
  "piece",
  "pieces",
  "slice",
  "slices",
  "can",
  "cans",
  "jar",
  "jars",
  "dash",
  "dashes",
  "pinch",
  "pinches",
  "handful",
  "handfuls",
  "bag",
  "bags",
  "bottle",
  "bottles",
  "box",
  "boxes",
  "package",
  "packages",
  "packet",
  "packets",
  "stick",
  "sticks",
  "quart",
  "quarts",
  "pint",
  "pints",
  "gallon",
  "gallons",
  "drop",
  "drops",
  "scoop",
  "scoops",
  "sheet",
  "sheets",
  "large",
  "medium",
  "small",
]);

const SPECIAL_AMOUNT_PHRASES = [
  "to taste",
  "as needed",
  "for garnish",
  "to garnish",
  "for serving",
  "for topping",
  "a pinch",
  "a dash",
  "a handful",
];

const UNICODE_FRACTIONS =
  "\u00BC\u00BD\u00BE\u2153\u2154\u215B\u215C\u215D\u215E";
const QTY_PATTERN = new RegExp(
  `^[\\d${UNICODE_FRACTIONS}][\\d\\s/${UNICODE_FRACTIONS}.,-]*`,
);
const HAS_QUANTITY = new RegExp(`[\\d${UNICODE_FRACTIONS}]`);

interface ParsedIngredient {
  name: string;
  amount: string;
  preparation: string;
}

export function parseIngredientLine(raw: string): ParsedIngredient {
  const line = raw.trim();
  if (!line) return { name: "", amount: "", preparation: "" };

  const lower = line.toLowerCase();

  for (const phrase of SPECIAL_AMOUNT_PHRASES) {
    if (lower.endsWith(phrase)) {
      const nameCandidate = line
        .slice(0, -phrase.length)
        .replace(/,\s*$/, "")
        .trim();
      if (nameCandidate) {
        return { name: nameCandidate, amount: phrase, preparation: "" };
      }
    }
  }

  const reversedResult = tryReversedFormat(line);
  if (reversedResult) return reversedResult;

  const qtyMatch = line.match(QTY_PATTERN);
  if (qtyMatch) {
    const qty = qtyMatch[0].trim();
    if (qty && HAS_QUANTITY.test(qty)) {
      const afterQty = line.slice(qtyMatch[0].length).trim();
      const unitResult = tryExtractUnit(afterQty);

      if (unitResult) {
        const amount = `${qty} ${unitResult.unit}`;
        const { name, preparation } = splitNameAndPreparation(
          unitResult.remainder,
        );
        return { name, amount, preparation };
      }

      const { name, preparation } = splitNameAndPreparation(afterQty);
      return { name, amount: qty, preparation };
    }
  }

  const { name, preparation } = splitNameAndPreparation(line);
  return { name, amount: "", preparation };
}

function tryReversedFormat(line: string): ParsedIngredient | null {
  const commaIdx = line.indexOf(",");
  if (commaIdx === -1) return null;

  const afterComma = line.slice(commaIdx + 1).trim();
  if (!HAS_QUANTITY.test(afterComma.charAt(0))) return null;

  const qtyMatch = afterComma.match(QTY_PATTERN);
  if (!qtyMatch?.[0].trim()) return null;

  const qty = qtyMatch[0].trim();
  const afterQty = afterComma.slice(qtyMatch[0].length).trim();
  const unitResult = tryExtractUnit(afterQty);

  const name = line.slice(0, commaIdx).trim();

  if (unitResult) {
    const amount = `${qty} ${unitResult.unit}`;
    const prep = unitResult.remainder.replace(/^,\s*/, "").trim();
    return { name, amount, preparation: prep };
  }

  const remaining = afterQty.replace(/^,\s*/, "").trim();
  return { name, amount: qty, preparation: remaining };
}

function tryExtractUnit(
  text: string,
): { unit: string; remainder: string } | null {
  const match = text.match(/^(\S+)\s*(.*)/);
  if (!match) return null;

  const candidate = match[1]?.toLowerCase().replace(/[.,]$/, "");
  if (candidate && KNOWN_UNITS.has(candidate)) {
    return { unit: match[1].replace(/[.,]$/, ""), remainder: match[2].trim() };
  }
  return null;
}

function splitNameAndPreparation(text: string): {
  name: string;
  preparation: string;
} {
  const commaIdx = text.indexOf(",");
  if (commaIdx === -1) return { name: text.trim(), preparation: "" };

  const name = text.slice(0, commaIdx).trim();
  const preparation = text.slice(commaIdx + 1).trim();
  return { name, preparation };
}

export function parseIngredientText(text: string): ParsedIngredient[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(parseIngredientLine);
}

export function ingredientToLine(ingredient: {
  name: string;
  amount?: string | null;
  preparation?: string | null;
}): string {
  let line = "";
  if (ingredient.amount) {
    line += `${ingredient.amount} `;
  }
  line += ingredient.name;
  if (ingredient.preparation) {
    line += `, ${ingredient.preparation}`;
  }
  return line.trim();
}

export function ingredientsToText(
  ingredients: Array<{
    name: string;
    amount?: string | null;
    preparation?: string | null;
  }>,
): string {
  return ingredients.map(ingredientToLine).join("\n");
}
