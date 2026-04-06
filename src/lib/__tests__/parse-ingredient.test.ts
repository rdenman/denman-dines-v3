import { describe, expect, test } from "bun:test";
import {
  ingredientsToText,
  ingredientToLine,
  parseIngredientLine,
  parseIngredientText,
} from "../parse-ingredient";

describe("parseIngredientLine", () => {
  test("quantity + unit + name + preparation", () => {
    expect(parseIngredientLine("3 cloves garlic, minced")).toEqual({
      name: "garlic",
      amount: "3 cloves",
      preparation: "minced",
    });
  });

  test("quantity + unit + name (no preparation)", () => {
    expect(parseIngredientLine("2 lbs chicken")).toEqual({
      name: "chicken",
      amount: "2 lbs",
      preparation: "",
    });
  });

  test("quantity + unit + multi-word name", () => {
    expect(parseIngredientLine("1 cup all-purpose flour")).toEqual({
      name: "all-purpose flour",
      amount: "1 cup",
      preparation: "",
    });
  });

  test("bare number + name", () => {
    expect(parseIngredientLine("1 onion")).toEqual({
      name: "onion",
      amount: "1",
      preparation: "",
    });
  });

  test("bare number + name + preparation", () => {
    expect(parseIngredientLine("3 eggs, beaten")).toEqual({
      name: "eggs",
      amount: "3",
      preparation: "beaten",
    });
  });

  test("name only (no amount)", () => {
    expect(parseIngredientLine("flour")).toEqual({
      name: "flour",
      amount: "",
      preparation: "",
    });
  });

  test("name only with preparation", () => {
    expect(parseIngredientLine("parsley, chopped")).toEqual({
      name: "parsley",
      amount: "",
      preparation: "chopped",
    });
  });

  test("special phrase: to taste", () => {
    expect(parseIngredientLine("Salt, to taste")).toEqual({
      name: "Salt",
      amount: "to taste",
      preparation: "",
    });
  });

  test("special phrase: to taste without comma", () => {
    expect(parseIngredientLine("Salt & pepper to taste")).toEqual({
      name: "Salt & pepper",
      amount: "to taste",
      preparation: "",
    });
  });

  test("special phrase: as needed", () => {
    expect(parseIngredientLine("olive oil, as needed")).toEqual({
      name: "olive oil",
      amount: "as needed",
      preparation: "",
    });
  });

  test("special phrase: for garnish", () => {
    expect(parseIngredientLine("fresh basil, for garnish")).toEqual({
      name: "fresh basil",
      amount: "for garnish",
      preparation: "",
    });
  });

  test("reversed format: name, amount", () => {
    expect(parseIngredientLine("Chicken, 2 lbs")).toEqual({
      name: "Chicken",
      amount: "2 lbs",
      preparation: "",
    });
  });

  test("reversed format: name, bare number", () => {
    expect(parseIngredientLine("Eggs, 3")).toEqual({
      name: "Eggs",
      amount: "3",
      preparation: "",
    });
  });

  test("fraction in amount", () => {
    expect(parseIngredientLine("1/2 cup sugar")).toEqual({
      name: "sugar",
      amount: "1/2 cup",
      preparation: "",
    });
  });

  test("mixed number in amount", () => {
    expect(parseIngredientLine("1 1/2 cups flour")).toEqual({
      name: "flour",
      amount: "1 1/2 cups",
      preparation: "",
    });
  });

  test("unicode fraction", () => {
    expect(parseIngredientLine("½ cup milk")).toEqual({
      name: "milk",
      amount: "½ cup",
      preparation: "",
    });
  });

  test("tbsp unit", () => {
    expect(parseIngredientLine("2 tbsp olive oil")).toEqual({
      name: "olive oil",
      amount: "2 tbsp",
      preparation: "",
    });
  });

  test("teaspoon unit", () => {
    expect(parseIngredientLine("1 teaspoon vanilla extract")).toEqual({
      name: "vanilla extract",
      amount: "1 teaspoon",
      preparation: "",
    });
  });

  test("empty string", () => {
    expect(parseIngredientLine("")).toEqual({
      name: "",
      amount: "",
      preparation: "",
    });
  });

  test("whitespace only", () => {
    expect(parseIngredientLine("   ")).toEqual({
      name: "",
      amount: "",
      preparation: "",
    });
  });

  test("size-based unit: large", () => {
    expect(parseIngredientLine("2 large eggs")).toEqual({
      name: "eggs",
      amount: "2 large",
      preparation: "",
    });
  });

  test("dash/pinch units", () => {
    expect(parseIngredientLine("1 dash cayenne pepper")).toEqual({
      name: "cayenne pepper",
      amount: "1 dash",
      preparation: "",
    });
  });

  test("preparation with multiple words", () => {
    expect(parseIngredientLine("1 lb chicken breast, cut into strips")).toEqual(
      {
        name: "chicken breast",
        amount: "1 lb",
        preparation: "cut into strips",
      },
    );
  });
});

describe("parseIngredientText", () => {
  test("parses multiple lines", () => {
    const text = "2 cups flour\n3 cloves garlic, minced\nSalt to taste";
    const result = parseIngredientText(text);
    expect(result).toEqual([
      { name: "flour", amount: "2 cups", preparation: "" },
      { name: "garlic", amount: "3 cloves", preparation: "minced" },
      { name: "Salt", amount: "to taste", preparation: "" },
    ]);
  });

  test("skips empty lines", () => {
    const text = "1 onion\n\n2 cups flour\n   \n";
    const result = parseIngredientText(text);
    expect(result).toHaveLength(2);
  });

  test("empty string returns empty array", () => {
    expect(parseIngredientText("")).toEqual([]);
  });
});

describe("ingredientToLine", () => {
  test("amount + name + preparation", () => {
    expect(
      ingredientToLine({
        name: "garlic",
        amount: "3 cloves",
        preparation: "minced",
      }),
    ).toBe("3 cloves garlic, minced");
  });

  test("amount + name only", () => {
    expect(ingredientToLine({ name: "chicken", amount: "2 lbs" })).toBe(
      "2 lbs chicken",
    );
  });

  test("name only", () => {
    expect(ingredientToLine({ name: "flour" })).toBe("flour");
  });

  test("name + preparation (no amount)", () => {
    expect(ingredientToLine({ name: "parsley", preparation: "chopped" })).toBe(
      "parsley, chopped",
    );
  });

  test("handles null amount and preparation", () => {
    expect(
      ingredientToLine({ name: "salt", amount: null, preparation: null }),
    ).toBe("salt");
  });
});

describe("ingredientsToText", () => {
  test("joins ingredients with newlines", () => {
    const result = ingredientsToText([
      { name: "flour", amount: "2 cups" },
      { name: "garlic", amount: "3 cloves", preparation: "minced" },
      { name: "salt" },
    ]);
    expect(result).toBe("2 cups flour\n3 cloves garlic, minced\nsalt");
  });

  test("empty array returns empty string", () => {
    expect(ingredientsToText([])).toBe("");
  });
});

describe("round-trip", () => {
  const cases = [
    { name: "garlic", amount: "3 cloves", preparation: "minced" },
    { name: "flour", amount: "2 cups", preparation: "" },
    { name: "onion", amount: "1", preparation: "" },
    { name: "chicken", amount: "2 lbs", preparation: "" },
    { name: "salt", amount: "", preparation: "" },
  ];

  for (const original of cases) {
    test(`round-trips: ${original.amount} ${original.name}`.trim(), () => {
      const line = ingredientToLine(original);
      const parsed = parseIngredientLine(line);
      expect(parsed.name).toBe(original.name);
      if (original.amount) expect(parsed.amount).toBe(original.amount);
      if (original.preparation)
        expect(parsed.preparation).toBe(original.preparation);
    });
  }
});
