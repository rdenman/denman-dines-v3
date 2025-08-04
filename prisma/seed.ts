import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const email = "robertkarldenman@gmail.com";

// Recipe data arrays for generating realistic recipes
const recipeTitles = [
  "Spicy Chicken Tacos",
  "Creamy Mushroom Pasta",
  "Grilled Salmon with Herbs",
  "Beef Stir Fry",
  "Vegetable Curry",
  "Chocolate Chip Cookies",
  "Caesar Salad",
  "Homemade Pizza",
  "Chicken Noodle Soup",
  "Beef Burgers",
  "Pancakes with Berries",
  "Shrimp Scampi",
  "Roasted Vegetables",
  "Chicken Parmesan",
  "Beef Tacos",
  "Pasta Carbonara",
  "Grilled Cheese",
  "Chicken Wings",
  "Beef Stew",
  "Fish Tacos",
  "Mac and Cheese",
  "Chicken Salad",
  "Beef Stir Fry",
  "Vegetable Soup",
  "Chicken Quesadilla",
  "Beef Fajitas",
  "Chicken Teriyaki",
  "Beef Tacos",
  "Vegetable Stir Fry",
  "Chicken Soup",
  "Beef Burgers",
  "Chicken Wings",
  "Fish and Chips",
  "Beef Steak",
  "Chicken Curry",
  "Vegetable Pasta",
  "Beef Meatballs",
  "Chicken Breast",
  "Fish Tacos",
  "Beef Tacos",
  "Chicken Noodle Soup",
  "Beef Stir Fry",
  "Vegetable Curry",
  "Chicken Wings",
  "Beef Burgers",
  "Fish Tacos",
  "Chicken Parmesan",
  "Beef Tacos",
  "Vegetable Soup",
  "Chicken Quesadilla",
  "Beef Fajitas",
  "Chicken Teriyaki",
  "Beef Tacos",
  "Vegetable Stir Fry",
  "Chicken Soup",
  "Beef Burgers",
  "Chicken Wings",
  "Fish and Chips",
  "Beef Steak",
  "Chicken Curry",
  "Vegetable Pasta",
  "Beef Meatballs",
  "Chicken Breast",
  "Fish Tacos",
  "Beef Tacos",
  "Chicken Noodle Soup",
  "Beef Stir Fry",
  "Vegetable Curry",
  "Chicken Wings",
  "Beef Burgers",
  "Fish Tacos",
  "Chicken Parmesan",
  "Beef Tacos",
  "Vegetable Soup",
  "Chicken Quesadilla",
  "Beef Fajitas",
  "Chicken Teriyaki",
  "Beef Tacos",
  "Vegetable Stir Fry",
  "Chicken Soup",
  "Beef Burgers",
  "Chicken Wings",
  "Fish and Chips",
  "Beef Steak",
  "Chicken Curry",
  "Vegetable Pasta",
  "Beef Meatballs",
  "Chicken Breast",
  "Fish Tacos",
  "Beef Tacos",
  "Chicken Noodle Soup",
  "Beef Stir Fry",
  "Vegetable Curry",
  "Chicken Wings",
  "Beef Burgers",
  "Fish Tacos",
  "Chicken Parmesan",
  "Beef Tacos",
  "Vegetable Soup",
  "Chicken Quesadilla",
];

const descriptions = [
  "A delicious and flavorful dish perfect for any occasion.",
  "Quick and easy recipe that's sure to please everyone.",
  "Healthy and nutritious meal packed with fresh ingredients.",
  "Classic comfort food with a modern twist.",
  "Authentic flavors that will transport you to another place.",
  "Simple yet sophisticated dish that's perfect for entertaining.",
  "Family-friendly recipe that everyone will love.",
  "Restaurant-quality meal you can make at home.",
  "Fresh and vibrant dish bursting with flavor.",
  "Hearty and satisfying meal that's perfect for cold weather.",
];

const ingredients = [
  "Chicken breast",
  "Ground beef",
  "Salmon fillet",
  "Shrimp",
  "Pasta",
  "Rice",
  "Onion",
  "Garlic",
  "Bell pepper",
  "Tomato",
  "Carrot",
  "Broccoli",
  "Spinach",
  "Mushroom",
  "Cheese",
  "Butter",
  "Olive oil",
  "Soy sauce",
  "Worcestershire sauce",
  "Salt",
  "Black pepper",
  "Paprika",
  "Cumin",
  "Oregano",
  "Basil",
  "Thyme",
  "Rosemary",
  "Lemon",
  "Lime",
  "Lemon juice",
  "Lime juice",
  "Chicken broth",
  "Beef broth",
  "Vegetable broth",
  "Heavy cream",
  "Milk",
  "Eggs",
  "Flour",
  "Breadcrumbs",
  "Tortillas",
  "Bread",
  "Potato",
  "Sweet potato",
  "Corn",
  "Peas",
  "Green beans",
  "Asparagus",
  "Zucchini",
  "Eggplant",
  "Cauliflower",
  "Cabbage",
  "Lettuce",
  "Arugula",
  "Kale",
  "Cilantro",
  "Parsley",
  "Dill",
  "Mint",
  "Chives",
  "Scallions",
  "Ginger",
  "Turmeric",
  "Cinnamon",
  "Nutmeg",
  "Vanilla extract",
  "Honey",
  "Maple syrup",
  "Brown sugar",
  "White sugar",
  "Baking powder",
  "Baking soda",
  "Cornstarch",
  "Tomato paste",
  "Tomato sauce",
  "Diced tomatoes",
  "Black beans",
  "Kidney beans",
  "Chickpeas",
  "Quinoa",
  "Couscous",
  "Barley",
  "Oats",
  "Almonds",
  "Walnuts",
  "Pecans",
  "Pine nuts",
  "Sunflower seeds",
  "Pumpkin seeds",
  "Sesame seeds",
  "Chia seeds",
  "Flax seeds",
  "Coconut",
  "Raisins",
  "Cranberries",
  "Dates",
  "Prunes",
  "Apricots",
  "Peaches",
  "Pears",
  "Apples",
  "Oranges",
  "Grapefruit",
  "Lemons",
  "Limes",
  "Grapes",
  "Strawberries",
  "Blueberries",
  "Raspberries",
  "Blackberries",
  "Bananas",
  "Pineapple",
  "Mango",
  "Kiwi",
  "Avocado",
  "Cucumber",
  "Celery",
  "Radish",
  "Turnip",
  "Parsnip",
  "Rutabaga",
  "Beets",
  "Kohlrabi",
  "Fennel",
];

const amounts = [
  "1 pound",
  "2 pounds",
  "1/2 pound",
  "1 cup",
  "2 cups",
  "1/4 cup",
  "1/2 cup",
  "3/4 cup",
  "1 tablespoon",
  "2 tablespoons",
  "1 teaspoon",
  "1/2 teaspoon",
  "1/4 teaspoon",
  "1/8 teaspoon",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
  "15",
  "20",
  "1 can",
  "2 cans",
  "1 jar",
  "1 bottle",
  "1 package",
  "1 bunch",
  "1 head",
  "1 clove",
  "2 cloves",
  "3 cloves",
  "1 stalk",
  "2 stalks",
  "1 slice",
  "2 slices",
  "1 piece",
  "2 pieces",
  "1 handful",
  "2 handfuls",
  "to taste",
  "as needed",
  "for garnish",
  "for serving",
];

const preparations = [
  "chopped",
  "diced",
  "minced",
  "sliced",
  "grated",
  "shredded",
  "crushed",
  "crumbled",
  "cubed",
  "julienned",
  "finely chopped",
  "roughly chopped",
  "thinly sliced",
  "thickly sliced",
  "peeled",
  "seeded",
  "cored",
  "stemmed",
  "trimmed",
  "cleaned",
  "rinsed",
  "drained",
  "patted dry",
  "blotted dry",
  "warmed",
  "cooled",
  "room temperature",
  "chilled",
  "frozen",
  "thawed",
  "softened",
  "melted",
  "beaten",
  "whisked",
  "stirred",
  "mixed",
  "combined",
  "separated",
  "divided",
  "reserved",
  "set aside",
  "prepared",
  "ready to use",
];

const instructionTexts = [
  "Preheat the oven to the specified temperature.",
  "Heat oil in a large skillet over medium heat.",
  "Add the main ingredients to the pan.",
  "Cook until the ingredients are tender and fragrant.",
  "Season with salt and pepper to taste.",
  "Stir occasionally to prevent sticking.",
  "Reduce heat to low and simmer for the specified time.",
  "Add the remaining ingredients and mix well.",
  "Cook until the sauce thickens and coats the ingredients.",
  "Remove from heat and let stand for a few minutes.",
  "Garnish with fresh herbs before serving.",
  "Serve hot with your favorite side dishes.",
  "Allow to cool slightly before serving.",
  "Store leftovers in an airtight container in the refrigerator.",
  "Reheat gently before serving again.",
];

const tips = [
  "For best results, use fresh ingredients.",
  "You can substitute ingredients based on your preferences.",
  "This dish can be made ahead and reheated.",
  "Adjust seasoning to your taste preferences.",
  "Serve with a fresh green salad for a complete meal.",
  "Leftovers taste even better the next day.",
  "Freeze extra portions for quick weeknight meals.",
  "This recipe is easily doubled for larger crowds.",
  "Add extra vegetables for a healthier version.",
  "Use high-quality ingredients for the best flavor.",
];

const sectionNames = [
  "Main Ingredients",
  "Sauce",
  "Seasonings",
  "Garnish",
  "For Serving",
  "Marinade",
  "Dressing",
  "Toppings",
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateIngredients(sectionCount: number): Array<{
  name: string;
  order: number;
  ingredients: {
    create: Array<{
      name: string;
      amount: string;
      preparation?: string;
      order: number;
    }>;
  };
}> {
  const sections: Array<{
    name: string;
    order: number;
    ingredients: {
      create: Array<{
        name: string;
        amount: string;
        preparation?: string;
        order: number;
      }>;
    };
  }> = [];

  for (let i = 0; i < sectionCount; i++) {
    const ingredientCount = Math.floor(Math.random() * 6) + 5; // 5-10 ingredients
    const ingredientList: Array<{
      name: string;
      amount: string;
      preparation?: string;
      order: number;
    }> = [];

    for (let j = 0; j < ingredientCount; j++) {
      ingredientList.push({
        name: getRandomElement(ingredients),
        amount: getRandomElement(amounts),
        preparation:
          Math.random() > 0.7 ? getRandomElement(preparations) : undefined,
        order: j + 1,
      });
    }

    sections.push({
      name: getRandomElement(sectionNames),
      order: i + 1,
      ingredients: {
        create: ingredientList,
      },
    });
  }
  return sections;
}

function generateInstructions(sectionCount: number): Array<{
  name: string;
  order: number;
  instructions: {
    create: Array<{
      text: string;
      order: number;
    }>;
  };
}> {
  const sections: Array<{
    name: string;
    order: number;
    instructions: {
      create: Array<{
        text: string;
        order: number;
      }>;
    };
  }> = [];

  for (let i = 0; i < sectionCount; i++) {
    const instructionCount = Math.floor(Math.random() * 5) + 3; // 3-7 instructions
    const instructionList: Array<{
      text: string;
      order: number;
    }> = [];

    for (let j = 0; j < instructionCount; j++) {
      instructionList.push({
        text: getRandomElement(instructionTexts),
        order: j + 1,
      });
    }

    sections.push({
      name: "Instructions",
      order: i + 1,
      instructions: {
        create: instructionList,
      },
    });
  }
  return sections;
}

async function main() {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw Error(
      `Unable to find user with email ${email}. Create that user before running this script.`
    );
  }

  console.log("Creating 100 dummy recipes...");

  for (let i = 0; i < 100; i++) {
    const title = getRandomElement(recipeTitles);
    const slug = generateSlug(title);
    const description = getRandomElement(descriptions);
    const servings = Math.floor(Math.random() * 8) + 2; // 2-10 servings
    const prepTime = Math.floor(Math.random() * 30) + 5; // 5-35 minutes
    const cookTime = Math.floor(Math.random() * 60) + 10; // 10-70 minutes
    const tipCount = Math.floor(Math.random() * 3) + 1; // 1-3 tips
    const sectionCount = Math.floor(Math.random() * 3) + 1; // 1-3 sections

    await prisma.recipe.create({
      data: {
        title,
        slug: `${slug}-${i + 1}`,
        description,
        userId: user.id,
        servings,
        tips: getRandomElements(tips, tipCount, tipCount),
        prepTime,
        cookTime,
        ingredientSections: {
          create: generateIngredients(sectionCount),
        },
        instructionSections: {
          create: generateInstructions(sectionCount),
        },
      },
    });

    if ((i + 1) % 10 === 0) {
      console.log(`Created ${i + 1} recipes...`);
    }
  }

  console.log("Successfully seeded 100 recipes!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
