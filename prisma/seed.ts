import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const email = "robertkarldenman@gmail.com";

async function main() {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw Error(
      `Unable to find user with email ${email}. Create that user before running this script.`
    );
  }

  await prisma.recipe.create({
    data: {
      title: "Blackened Shrimp Bowls",
      slug: "blackened-shrimp-bowls",
      description:
        "Spicy shrimp bowls with rice, avocado, and a fresh corn salsa.",
      userId: user.id,
      servings: 2,
      tips: ["Squeeze lime at the end for extra flavor."],
      prepTime: 10,
      cookTime: 15,
      ingredientSections: {
        create: [
          {
            name: "Main Ingredients",
            order: 1,
            ingredients: {
              create: [
                { name: "Shrimp", amount: "1 pound", order: 1 },
                { name: "Rice", amount: "1 cup", order: 2 },
                { name: "Corn", amount: "1 cup", order: 3 },
                {
                  name: "Red bell pepper",
                  amount: "1",
                  preparation: "chopped",
                  order: 4,
                },
                {
                  name: "Cilantro",
                  amount: "2 tablespoon",
                  preparation: "chopped",
                  order: 5,
                },
                { name: "Lime", amount: "1", order: 6 },
                { name: "Olive oil", amount: "2 tablespoon", order: 7 },
                { name: "Avocado", amount: "1", order: 8 },
              ],
            },
          },
          {
            name: "Spices",
            order: 2,
            ingredients: {
              create: [
                { name: "Ground cumin", amount: "1 1/2 teaspoon", order: 1 },
                { name: "Paprika", amount: "1 teaspoon", order: 2 },
                { name: "Garlic powder", amount: "1 teaspoon", order: 3 },
                { name: "Onion powder", amount: "1/2 teaspoon", order: 4 },
                { name: "Salt", amount: "to taste", order: 5 },
                { name: "Pepper", amount: "to taste", order: 6 },
              ],
            },
          },
        ],
      },
      instructionSections: {
        create: [
          {
            name: "Instructions",
            order: 1,
            instructions: {
              create: [
                { order: 1, text: "Cook rice according to directions." },
                {
                  order: 2,
                  text: "In a large bowl, toss shrimp with cumin, paprika, garlic powder, onion powder, salt, and pepper until evenly coated.",
                },
                {
                  order: 3,
                  text: "Heat 1 tbsp of olive oil over medium-high heat and cook shrimp until opaque, about 5 minutes.",
                },
                {
                  order: 4,
                  text: "In a medium bowl, combine corn, red bell pepper, cilantro, 1 tbsp olive oil, juice of 1/2 lime, salt, and pepper.",
                },
                {
                  order: 5,
                  text: "To serve, add rice and shrimp to your bowls, then top with corn salsa and slices of avocado. Squeeze remaining lime juice on top.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.recipe.create({
    data: {
      title: "Cheeseburger Sliders",
      slug: "cheeseburger-sliders",
      description:
        "Savory, melty sliders made with seasoned beef, cheddar, and sweet Hawaiian rolls.",
      userId: user.id,
      servings: 6,
      prepTime: 15,
      cookTime: 25,
      tips: [
        "Serve with ketchup or burger sauce.",
        "Try not to let the foil touch the tops of the rolls.",
      ],
      ingredientSections: {
        create: [
          {
            name: "Main Ingredients",
            order: 1,
            ingredients: {
              create: [
                {
                  name: "Hawaiian rolls",
                  amount: "2 packs (24 rolls)",
                  order: 1,
                },
                { name: "Ground beef", amount: "2 pounds", order: 2 },
                {
                  name: "French onion soup mix",
                  amount: "2 packets",
                  order: 3,
                },
                {
                  name: "Shredded cheddar cheese",
                  amount: "1 1/2 cup",
                  order: 4,
                },
                {
                  name: "Onion",
                  amount: "1",
                  preparation: "chopped",
                  order: 5,
                },
                {
                  name: "Worcestershire sauce",
                  amount: "1 tablespoon",
                  order: 6,
                },
                { name: "Mustard", amount: "2 tablespoon", order: 7 },
                { name: "Mayonnaise", amount: "1/2 cup", order: 8 },
                {
                  name: "Cheddar cheese slices",
                  amount: "8 sandwich-style slices",
                  order: 9,
                },
                { name: "Butter", amount: "1/2 stick", order: 10 },
                { name: "Sesame seeds", amount: "to top", order: 11 },
                {
                  name: "Pickle spears",
                  amount: "4",
                  preparation: "chopped",
                  order: 12,
                },
              ],
            },
          },
        ],
      },
      instructionSections: {
        create: [
          {
            name: "Instructions",
            order: 1,
            instructions: {
              create: [
                {
                  order: 1,
                  text: "Heat a pan and add the beef. About halfway through cooking, add the onion. Once beef is fully cooked, drain the mix.",
                },
                {
                  order: 2,
                  text: "Add the mix back to the pan and add the shredded cheddar, French onion mix, Worcestershire, mayo, and mustard. Combine until cheese is melted.",
                },
                { order: 3, text: "Preheat oven to 350 degrees." },
                {
                  order: 4,
                  text: "Chop the rolls in half and put the bottom layer on some tinfoil. Leave enough foil to wrap everything at the end.",
                },
                {
                  order: 5,
                  text: "Layer cheese slices on the bottom, then add the meat over the cheese, and the pickles over the meat. Put the top half of the rolls on top.",
                },
                {
                  order: 6,
                  text: "Slightly melt the butter so it's very easy to spread, and top the rolls with it. Sprinkle on the sesame seeds.",
                },
                {
                  order: 7,
                  text: "Cover the rolls with foil so they're enclosed. Bake for about 15 minutes, directly on the rack.",
                },
                {
                  order: 8,
                  text: "Once the cheese is melted and the top is lightly toasted, they're ready!",
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seeded recipes");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
