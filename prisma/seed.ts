import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const email = "robertkarldenman@gmail.com";

// Real recipes from denmandines.com
const recipes = [
  {
    title: "Air Fryer Chicken Tenders",
    slug: "air-fryer-chicken-tenders",
    description:
      "Crispy chicken tenders made in the air fryer with panko breading.",
    photo: null,
    servings: 4,
    prepTime: 45,
    cookTime: 14,
    tips: [
      "For extra crispy tenders, make sure to pat the chicken completely dry after brining.",
      "Don't overcrowd the air fryer basket - cook in batches if needed for best results.",
      "Let the tenders rest for a few minutes after cooking to maintain crispiness.",
    ],
    createdAt: "2025-05-27T17:25:21.268Z",
    updatedAt: "2025-05-27T17:25:21.268Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chicken breast, cut into tenders",
            amount: "1.5 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "salt",
            amount: "2 tablespoon + 1 tsp",
            preparation: null,
            order: 1,
          },
          {
            name: "sugar",
            amount: "1 tablespoon",
            preparation: null,
            order: 2,
          },
          {
            name: "pepper",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "paprika",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "garlic powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "onion powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "cayenne",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "flour",
            amount: "3 tablespoon",
            preparation: null,
            order: 8,
          },
          {
            name: "eggs",
            amount: "2",
            preparation: null,
            order: 9,
          },
          {
            name: "panko breadcrumbs",
            amount: "2 cup",
            preparation: null,
            order: 10,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Mix 4 cups water with 2 tbsp salt and 1 tbsp sugar in a large bowl. Add the tenders and let them brine for at least 30 minutes or up to overnight.",
            order: 0,
          },
          {
            text: "In a small bowl, mix together remaining 1 tsp salt, pepper, paprika, garlic powder, onion powder, and cayenne.",
            order: 1,
          },
          {
            text: "In a separate bowl, add flour, eggs, and 1 tsp of the seasoning mix. Mix well until you get a batter-like consistency. Add water if too thick as needed.",
            order: 2,
          },
          {
            text: "On a large plate/pan, mix the breadcrumbs with the remaining seasoning mix.",
            order: 3,
          },
          {
            text: "Remove tenders from the brine and pat dry. Dip the tenders in the egg mix first, then in the breadcrumbs. Lay them on a parchment paper lined baking sheet.",
            order: 4,
          },
          {
            text: "Preheat air fryer to 400 degrees (will cook for 14 minutes).",
            order: 5,
          },
          {
            text: "Spray the top side of the chicken with oil spray. Place the sprayed side face down in the air fryer basket and spray the other side. Cook tenders for 14 minutes, flipping about halfway through.",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    title: "Argentinian Steak",
    slug: "argentinian-steak",
    description:
      "Marinated steak strips cooked in a cast iron skillet with citrus and soy sauce.",
    photo: null,
    servings: 3,
    prepTime: 15,
    cookTime: 8,
    tips: [
      "Let the steak marinate for at least 2 hours, or overnight for maximum flavor.",
      "Use a cast iron skillet and get it very hot before adding the steak for a good sear.",
    ],
    createdAt: "2023-12-28T13:22:52.868Z",
    updatedAt: "2024-02-29T12:52:58.191Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "steak",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "olive oil",
            amount: "0.667 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "orange juice",
            amount: "0.5 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "lime juice",
            amount: "0.333 cup",
            preparation: null,
            order: 3,
          },
          {
            name: "soy sauce",
            amount: "0.25 cup",
            preparation: null,
            order: 4,
          },
          {
            name: "Worcestershire sauce",
            amount: "0.25 cup",
            preparation: null,
            order: 5,
          },
          {
            name: "red wine vinegar",
            amount: "3 tablespoon",
            preparation: null,
            order: 6,
          },
          {
            name: "garlic",
            amount: "6 clove",
            preparation: null,
            order: 7,
          },
          {
            name: "red pepper flakes",
            amount: "2 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "Freshly ground pepper to taste",
            amount: "0",
            preparation: null,
            order: 9,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Mix all ingredients except the steak together in a bowl to make the marinade.",
            order: 0,
          },
          {
            text: 'Cut the steak into roughly 1/2" strips and add to the marinade. Put in the fridge for several hours.',
            order: 1,
          },
          {
            text: "Take steak out from marinade and pat dry. Sprinkle with coarse salt.",
            order: 2,
          },
          {
            text: "Preheat a cast iron skillet on high. Add steak strips to pan and cook for about a minute per side.",
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Avocado Chimichurri",
    slug: "avocado-chimichurri",
    description:
      "Creamy avocado-based chimichurri sauce with cilantro and lime.",
    photo: null,
    servings: 6,
    prepTime: 10,
    cookTime: 0,
    tips: [],
    createdAt: "2023-12-28T13:24:15.887Z",
    updatedAt: "2024-04-26T23:18:19.710Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "avocado",
            amount: "1",
            preparation: null,
            order: 0,
          },
          {
            name: "cilantro",
            amount: "0.333 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "garlic",
            amount: "3 clove",
            preparation: null,
            order: 2,
          },
          {
            name: "red wine vinegar",
            amount: "1 tablespoon",
            preparation: null,
            order: 3,
          },
          {
            name: "olive oil",
            amount: "2 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "lime juice",
            amount: "2 tablespoon",
            preparation: null,
            order: 6,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Combine all ingredients in a food processor or blender and mix until creamy.",
            order: 0,
          },
        ],
      },
    ],
  },
  {
    title: "Baked Salmon",
    slug: "baked-salmon",
    description: "Simple baked salmon with herbs and lemon.",
    photo: null,
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    tips: [
      "Don't overcook the salmon - it should flake easily with a fork when done.",
      "Let the salmon rest for a few minutes after baking to allow juices to redistribute.",
    ],
    createdAt: "2025-01-25T17:26:34.524Z",
    updatedAt: "2025-01-25T17:26:34.524Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "6 oz salmon fillets",
            amount: "4",
            preparation: null,
            order: 0,
          },
          {
            name: "olive oil",
            amount: "2 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "pepper",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "garlic cloves, minced",
            amount: "4",
            preparation: null,
            order: 4,
          },
          {
            name: "Italian seasoning",
            amount: "1 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "lemon",
            amount: "1",
            preparation: null,
            order: 6,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Preheat over to 400 degrees.",
            order: 0,
          },
          {
            text: "In a small bowl, mix together olive oil, garlic, herbs, and juice from half the lemon.",
            order: 1,
          },
          {
            text: "Place salmon on a baking sheet (they stick to aluminum pretty bad, so directly on the sheet is best) and spoon over the dressing. Try to cover the salmon entirely.",
            order: 2,
          },
          {
            text: "Thinly slice the remainder of the lemon and place the slices on top of the salmon.",
            order: 3,
          },
          {
            text: "Bake salmon for 12-15 minutes, until flaky. Can broil the last couple minutes for some extra char.",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    title: "Balsamic Chicken & Veggies",
    slug: "balsamic-chicken-&-veggies",
    description: "Chicken and vegetables roasted with balsamic glaze.",
    photo: null,
    servings: 4,
    prepTime: 15,
    cookTime: 25,
    tips: [
      "Cut vegetables into similar sizes for even cooking.",
      "Don't crowd the pan - use two baking sheets if needed for better browning.",
    ],
    createdAt: "2024-02-27T12:35:46.176Z",
    updatedAt: "2024-02-27T12:35:46.176Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chicken breast",
            amount: "1.5 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "olive oil",
            amount: "2 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "balsamic vinegar",
            amount: "0.25 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "brown sugar",
            amount: "1 tablespoon",
            preparation: null,
            order: 3,
          },
          {
            name: "dried oregano",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "dried basil",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "pepper",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "garlic, minced",
            amount: "2 clove",
            preparation: null,
            order: 8,
          },
          {
            name: "cherry tomatoes",
            amount: "2 cup",
            preparation: null,
            order: 9,
          },
          {
            name: "red onion",
            amount: "1",
            preparation: null,
            order: 10,
          },
          {
            name: "mozzarella",
            amount: "1 cup",
            preparation: null,
            order: 11,
          },
          {
            name: "White rice",
            amount: "0",
            preparation: null,
            order: 12,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Combine olive oil, balsamic vinegar, brown sugar, oregano, basil, salt, pepper, and garlic in a medium bowl.",
            order: 0,
          },
          {
            text: "Slice several slits width-wise in chicken breasts. Add chicken to the bowl and let marinate for at least an hour.",
            order: 1,
          },
          {
            text: "Preheat oven to 430 degrees.",
            order: 2,
          },
          {
            text: "Add tomatoes and onion to a 9x13 baking pan. Drizzle with olive oil and salt, then mix together.",
            order: 3,
          },
          {
            text: "Put chicken over veggies and pour remaining sauce over. Bake for 25 minutes.",
            order: 4,
          },
          {
            text: "Remove from oven and top chicken with mozzarella. Put back in the oven until cheese is melted.",
            order: 5,
          },
          {
            text: "Serve over rice.",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    title: "Blackened Shrimp Bowls",
    slug: "blackened-shrimp-bowls",
    description: "Spicy blackened shrimp served over rice with vegetables.",
    photo: null,
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    tips: [
      "Don't overcook the shrimp - they cook very quickly and become rubbery if overdone.",
      "Make sure your pan is very hot before adding the shrimp for a good blackened crust.",
    ],
    createdAt: "2023-12-28T13:29:57.015Z",
    updatedAt: "2023-12-28T13:29:57.015Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "shrimp",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "rice",
            amount: "1 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "corn",
            amount: "1 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "red bell pepper",
            amount: "1",
            preparation: null,
            order: 3,
          },
          {
            name: "cilantro",
            amount: "2 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "lime",
            amount: "1",
            preparation: null,
            order: 5,
          },
          {
            name: "olive oil",
            amount: "2 tablespoon",
            preparation: null,
            order: 6,
          },
          {
            name: "avocado",
            amount: "1",
            preparation: null,
            order: 7,
          },
          {
            name: "ground cumin",
            amount: "1.5 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "paprika",
            amount: "1 teaspoon",
            preparation: null,
            order: 9,
          },
          {
            name: "garlic powder",
            amount: "1 teaspoon",
            preparation: null,
            order: 10,
          },
          {
            name: "onion powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 11,
          },
          {
            name: "Salt & pepper to taste",
            amount: "0",
            preparation: null,
            order: 12,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Cook rice according to directions.",
            order: 0,
          },
          {
            text: "In a large bowl, toss shrimp with cumin, paprika, garlic powder, onion powder, salt, and pepper until evenly coated.",
            order: 1,
          },
          {
            text: "Heat 1 tbsp of olive oil over medium-high heat and cook shrimp until opaque, about 5 minutes.",
            order: 2,
          },
          {
            text: "In a medium bowl, combine corn, red bell pepper (chopped), cilantro, 1 tbsp olive oil, juice of 1/2 lime, salt, and pepper.",
            order: 3,
          },
          {
            text: "To serve, add rice and shrimp to your bowls, then top with corn salsa and slices of avocado. Squeeze remaining lime juice on top.",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    title: "Buffalo Chicken Alfredo Pasta",
    slug: "buffalo-chicken-alfredo-pasta",
    description: "Creamy alfredo pasta with buffalo chicken and blue cheese.",
    photo: null,
    servings: 6,
    prepTime: 15,
    cookTime: 20,
    tips: [
      "Reserve some pasta water to help create a creamier sauce if needed.",
      "Add the buffalo sauce gradually to control the heat level.",
    ],
    createdAt: "2023-12-28T13:34:52.711Z",
    updatedAt: "2023-12-28T13:34:52.711Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chickpea pasta",
            amount: "8 ounce",
            preparation: null,
            order: 0,
          },
          {
            name: "chicken breast",
            amount: "1 pound",
            preparation: null,
            order: 1,
          },
          {
            name: "hot wing sauce",
            amount: "1 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "ranch",
            amount: "0.25 cup",
            preparation: null,
            order: 3,
          },
          {
            name: "mozzarella cheese",
            amount: "0.75 cup",
            preparation: null,
            order: 4,
          },
          {
            name: "avocado oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 5,
          },
          {
            name: "salt",
            amount: "1 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "pepper",
            amount: "1 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "garlic powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "onion powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 9,
          },
          {
            name: "smoked paprika",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 10,
          },
          {
            name: "brown sugar",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 11,
          },
          {
            name: "ground cumin",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 12,
          },
          {
            name: "chili powder",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 13,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "In a bowl, add avocado oil, salt, pepper, garlic powder, onion powder, paprika, brown sugar, cumin, and chili powder. Mix together.",
            order: 0,
          },
          {
            text: "Cut chicken into small cubes. Add to the marinate and let sit for a while.",
            order: 1,
          },
          {
            text: "Cook pasta according to directions on the box. Drain, then shock with cold water.",
            order: 2,
          },
          {
            text: "While pasta cooks, throw a pan over high heat. Once very hot, add chicken and cook, about 7-8 minute",
            order: 3,
          },
          {
            text: "In a large bowl, add pasta, hot sauce, ranch, mozzarella, and chicken. Mix well and enjoy!",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    title: "Buffalo Chicken Dip",
    slug: "buffalo-chicken-dip",
    description: "Creamy buffalo chicken dip perfect for parties and game day.",
    photo: null,
    servings: 8,
    prepTime: 10,
    cookTime: 20,
    tips: [
      "Serve with celery sticks, tortilla chips, or crackers for dipping.",
      "Make ahead and refrigerate overnight for even better flavor.",
    ],
    createdAt: "2023-12-28T13:19:08.039Z",
    updatedAt: "2023-12-28T13:19:08.039Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "cream cheese",
            amount: "8 ounce",
            preparation: null,
            order: 0,
          },
          {
            name: "hot wing sauce",
            amount: "1 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "ranch dressing",
            amount: "1 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "canned chicken",
            amount: "12.5 ounce",
            preparation: null,
            order: 3,
          },
          {
            name: "shredded cheddar",
            amount: "1 cup",
            preparation: null,
            order: 4,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Preheat oven to 350 degrees & let cream cheese soften.",
            order: 0,
          },
          {
            text: "In a bowl, combine cream cheese, hot sauce, and ranch dressing. Stir in the chicken.",
            order: 1,
          },
          {
            text: "Spread mixture into a 11x7 baking sheet. Sprinkle cheddar on top and bake for about 20 minutes.",
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Buffalo Mac & Cheese",
    slug: "buffalo-mac-&-cheese",
    description: "Mac and cheese with buffalo sauce and chicken.",
    photo: null,
    servings: 6,
    prepTime: 15,
    cookTime: 25,
    tips: [],
    createdAt: "2025-01-29T18:54:48.072Z",
    updatedAt: "2025-01-29T18:54:48.072Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chickpea pasta",
            amount: "12 ounce",
            preparation: null,
            order: 0,
          },
          {
            name: "butter",
            amount: "2 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "flour",
            amount: "2 tablespoon",
            preparation: null,
            order: 2,
          },
          {
            name: "2% milk",
            amount: "1 cup",
            preparation: null,
            order: 3,
          },
          {
            name: "salt",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "pepper",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "garlic powder",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "light cream cheese",
            amount: "4 ounce",
            preparation: null,
            order: 7,
          },
          {
            name: "hot sauce (like Frank's wing sauce)",
            amount: "0.5 cup",
            preparation: null,
            order: 8,
          },
          {
            name: "plain Greek yogurt",
            amount: "0.333 cup",
            preparation: null,
            order: 9,
          },
          {
            name: "ranch",
            amount: "2 tablespoon",
            preparation: null,
            order: 10,
          },
          {
            name: "shredded cheddar",
            amount: "1.5 cup",
            preparation: null,
            order: 11,
          },
          {
            name: "chicken, shredded",
            amount: "1.5 pound",
            preparation: null,
            order: 12,
          },
          {
            name: "Green onion, chopped (for topping)",
            amount: "0",
            preparation: null,
            order: 13,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Cook and shred chicken. Use a marinade if desired.",
            order: 0,
          },
          {
            text: "Cook pasta as directed. Follow al dente instructions if available.",
            order: 1,
          },
          {
            text: "Make a roux. In a large pot, melt butter over medium heat and whisk in flour until all clumps are out. Slowly whisk in milk and heat until it starts to thicken. Stir in the seasonings.",
            order: 2,
          },
          {
            text: "Add the cream cheese, hot sauce, yogurt, and ranch. Whisk until the cream cheese has melted.",
            order: 3,
          },
          {
            text: "Add the cheddar and whisk until melted and everything is fully incorporated and the sauce is smooth.",
            order: 4,
          },
          {
            text: "Turn the heat to low and mix in the chicken & pasta. Serve topped with green onions if desired.",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    title: "Cheeseburger Sliders",
    slug: "cheeseburger-sliders",
    description:
      "Mini cheeseburgers on slider buns with all the classic toppings.",
    photo: null,
    servings: 8,
    prepTime: 20,
    cookTime: 15,
    tips: [
      "Don't overwork the meat when forming patties to keep them tender.",
      "Toast the buns lightly for better texture and to prevent sogginess.",
    ],
    createdAt: "2025-03-15T15:09:29.705Z",
    updatedAt: "2025-03-15T15:09:29.705Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "Hawaiian rolls (24 total)",
            amount: "2 pack",
            preparation: null,
            order: 0,
          },
          {
            name: "ground beef",
            amount: "2 pound",
            preparation: null,
            order: 1,
          },
          {
            name: "packets French onion soup mix",
            amount: "2",
            preparation: null,
            order: 2,
          },
          {
            name: "shredded cheddar",
            amount: "1.5 cup",
            preparation: null,
            order: 3,
          },
          {
            name: "onion",
            amount: "1",
            preparation: null,
            order: 4,
          },
          {
            name: "worchestire",
            amount: "1 tablespoon",
            preparation: null,
            order: 5,
          },
          {
            name: "mustard",
            amount: "2 tablespoon",
            preparation: null,
            order: 6,
          },
          {
            name: "mayonnaise",
            amount: "0.5 cup",
            preparation: null,
            order: 7,
          },
          {
            name: "sandwich-style cheddar cheese slices",
            amount: "8",
            preparation: null,
            order: 8,
          },
          {
            name: "butter",
            amount: "0.5 stick",
            preparation: null,
            order: 9,
          },
          {
            name: "Sesame seeds",
            amount: "0",
            preparation: null,
            order: 10,
          },
          {
            name: "Pickles, chopped (maybe like 4 spears-worth)",
            amount: "0",
            preparation: null,
            order: 11,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Heat a pan and add the beef. About halfway through cooking, add the onion. Once beef is fully cooked, drain the mix.",
            order: 0,
          },
          {
            text: "Add the mix back to the pan and add the shredded cheddar, French onion mix, worchestire, mayo, and mustard. Combine until cheese is melted.",
            order: 1,
          },
          {
            text: "Preheat oven to 350 degrees.",
            order: 2,
          },
          {
            text: "Chop the rolls in half and put the bottom layer on some tinfoil. Leave enough foil to wrap everything at the end.",
            order: 3,
          },
          {
            text: "Layer cheese slices on the bottom, then add the meat over the cheese, and the pickles over the meat. Put the top half of the rolls on top.",
            order: 4,
          },
          {
            text: "Slightly melt the butter so it's very easy to spread, and top the rolls with it. Sprinkle on the sesame seeds.",
            order: 5,
          },
          {
            text: "Cover the rolls with foil so their enclosed (try not to have it touch the top of the rolls). Back for about 15 minutes, directly on the rack.",
            order: 6,
          },
          {
            text: "Once the cheese is melted and the top is lightly toasted, they're ready! Serve with ketchup or some sort of burger sauce.",
            order: 7,
          },
        ],
      },
    ],
  },
  {
    title: "Chicken Enchilada Rice Bowls",
    slug: "chicken-enchilada-rice-bowls",
    description:
      "Mexican-inspired rice bowls with chicken and enchilada sauce.",
    photo: null,
    servings: 4,
    prepTime: 15,
    cookTime: 30,
    tips: [
      "Use day-old rice for better texture and to prevent mushiness.",
      "Shred the chicken while it's still warm for easier handling.",
    ],
    createdAt: "2024-03-11T14:50:34.307Z",
    updatedAt: "2024-03-11T14:50:34.307Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chicken",
            amount: "1.5 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "salt",
            amount: "1 teaspoon",
            preparation: null,
            order: 1,
          },
          {
            name: "ground cumin",
            amount: "1 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "tomato sauce",
            amount: "8 ounce",
            preparation: null,
            order: 3,
          },
          {
            name: "garlic cloves, minced",
            amount: "3",
            preparation: null,
            order: 4,
          },
          {
            name: "chipotle peppers in adobo sauce",
            amount: "0.5 tablespoon",
            preparation: null,
            order: 5,
          },
          {
            name: "chili powder",
            amount: "0.125 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "cheddar cheese, shredded",
            amount: "0.75 cup",
            preparation: null,
            order: 7,
          },
          {
            name: "onion, sliced",
            amount: "1",
            preparation: null,
            order: 8,
          },
          {
            name: "bell pepper, sliced",
            amount: "1",
            preparation: null,
            order: 9,
          },
          {
            name: "Rice",
            amount: "0",
            preparation: null,
            order: 10,
          },
          {
            name: "Cilantro, chopped",
            amount: "0",
            preparation: null,
            order: 11,
          },
          {
            name: "jalapeño, chopped",
            amount: "1",
            preparation: null,
            order: 12,
          },
          {
            name: "green onions, sliced",
            amount: "3",
            preparation: null,
            order: 13,
          },
          {
            name: "Sour cream",
            amount: "0",
            preparation: null,
            order: 14,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Season chicken with 1/2 tsp salt and 1/2 tsp cumin. Place in slow cooker.",
            order: 0,
          },
          {
            text: "Combine tomato sauce with remaining salt & cumin, garlic, chipotle peppers, and chili powder. Mix together and pour over chicken.",
            order: 1,
          },
          {
            text: "Cover slow cooker and cook on low for 4 hours.",
            order: 2,
          },
          {
            text: "When cooked, shred chicken. Top with cheese and cover, allowing cheese to melt (about 20 minutes).",
            order: 3,
          },
          {
            text: "Sauté onion and pepper. Add to the slow cooker and mix everything together.",
            order: 4,
          },
          {
            text: "Serve over rice.",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    title: "Chicken Fried Rice",
    slug: "chicken-fried-rice",
    description: "Classic fried rice with chicken, vegetables, and soy sauce.",
    photo: null,
    servings: 4,
    prepTime: 15,
    cookTime: 10,
    tips: [
      "Use cold, day-old rice for the best texture and to prevent sticking.",
      "Have all ingredients prepped and ready before you start cooking - it goes fast!",
    ],
    createdAt: "2025-08-02T18:02:04.478Z",
    updatedAt: "2025-08-02T18:02:27.736Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chicken, cubed",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "soy sauce",
            amount: "2 teaspoon + 1/4 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "cornstarch",
            amount: "2 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "vegetable oil",
            amount: "2 teaspoon + 1 tbsp",
            preparation: null,
            order: 3,
          },
          {
            name: "butter",
            amount: "3 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "eggs, whisked",
            amount: "3",
            preparation: null,
            order: 5,
          },
          {
            name: "frozen peas & carrots",
            amount: "1 cup",
            preparation: null,
            order: 6,
          },
          {
            name: "onion, diced",
            amount: "1",
            preparation: null,
            order: 7,
          },
          {
            name: "garlic, minced",
            amount: "5 clove",
            preparation: null,
            order: 8,
          },
          {
            name: "cooked rice",
            amount: "3 cup",
            preparation: null,
            order: 9,
          },
          {
            name: "green onions, sliced",
            amount: "3",
            preparation: null,
            order: 10,
          },
          {
            name: "sesame oil",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 11,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Start by velveting the chicken. In a medium bowl, mix 2 tbsp water and 2 tsp soy sauce, then add the chicken and mix. Set aside for 5-10 minutes, in which time most liquid should be absorbed into the chicken. Next, add the cornstarch and 2 tsp vegetable oil, mixing again. Let the chicken marinate for 15-20 minutes.",
            order: 0,
          },
          {
            text: "Heat a wok over medium-high heat. Add 1 tbsp vegetable oil, then add the chicken and cook through. Remove cooked chicken from pan and set aside. Note that you don't want to stack the chicken too much. Sometimes I used a normal pan instead of the wok here.",
            order: 1,
          },
          {
            text: "Heat 1/2 tbsp butter in the wok over medium-high heat, until melted. Add the eggs and cook until scrambled. Remove and set aside.",
            order: 2,
          },
          {
            text: "Add 1 tbsp butter to the pan and melt. Add peas, carrots, onion, and garlic, and season with a pinch of salt and pepper. Sauté for about 5 minutes, until soft.",
            order: 3,
          },
          {
            text: "Increase heat to high, add the remaining 1 1/2 tbsp butter, and melt. Add the rice, green onions, and 1/4 cup soy sauce. Stir until combined, then continue sautéing for a few more minutes.",
            order: 4,
          },
          {
            text: "Add the egg & chicken back to the wok, then stir to combine. Remove from heat, then stir in the sesame oil.",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    title: "Chicken Larb Bowls",
    slug: "chicken-larb-bowls",
    description:
      "Thai-inspired ground chicken salad with fresh herbs and lime.",
    photo: null,
    servings: 4,
    prepTime: 20,
    cookTime: 10,
    tips: [
      "Use fresh herbs for the best flavor - dried herbs won't give the same bright taste.",
      "Toast the rice powder for a nuttier flavor before adding to the dish.",
    ],
    createdAt: "2024-03-04T04:35:40.949Z",
    updatedAt: "2024-03-04T04:35:40.949Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "ground chicken",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "shallot, chopped",
            amount: "1 small",
            preparation: null,
            order: 1,
          },
          {
            name: "soy sauce",
            amount: "3 tablespoon",
            preparation: null,
            order: 2,
          },
          {
            name: "lime juice",
            amount: "3 tablespoon",
            preparation: null,
            order: 3,
          },
          {
            name: "chili paste",
            amount: "1 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "cilantro, chopped",
            amount: "0.25 cup",
            preparation: null,
            order: 5,
          },
          {
            name: "fresh mint, chopped",
            amount: "0.25 cup",
            preparation: null,
            order: 6,
          },
          {
            name: "green onions",
            amount: "4",
            preparation: null,
            order: 7,
          },
          {
            name: "cucumber",
            amount: "1",
            preparation: null,
            order: 8,
          },
          {
            name: "Rice",
            amount: "0",
            preparation: null,
            order: 9,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Heat a large skillet over high heat and spray with oil. Cook the chicken until no longer pink.",
            order: 0,
          },
          {
            text: "Add the shallot and cook until softened. Then add the soy sauce, lime juice, and chili paste. Mix in well and cook for a couple minutes to meld the flavors.",
            order: 1,
          },
          {
            text: "Remove from heat and stir in cilantro, mint, and green onions.",
            order: 2,
          },
          {
            text: "Serve over rice and top with cucumber slices and additional chili paste if desired.",
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Chimichurri Rice",
    slug: "chimichurri-rice",
    description: "Flavorful rice seasoned with fresh chimichurri sauce.",
    photo: null,
    servings: 6,
    prepTime: 10,
    cookTime: 20,
    tips: [],
    createdAt: "2023-12-28T13:32:09.242Z",
    updatedAt: "2023-12-28T13:32:09.242Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "white rice",
            amount: "1 cup",
            preparation: null,
            order: 0,
          },
          {
            name: "beef stock",
            amount: "1 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "garlic",
            amount: "4 clove",
            preparation: null,
            order: 2,
          },
          {
            name: "lime juice",
            amount: "3 tablespoon",
            preparation: null,
            order: 3,
          },
          {
            name: "red wine vinegar",
            amount: "2 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "oregano",
            amount: "1 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "fresh parsley",
            amount: "0.25 cup",
            preparation: null,
            order: 6,
          },
          {
            name: "fresh cilantro",
            amount: "0.25 cup",
            preparation: null,
            order: 7,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Add rice, beef stock, minced garlic, and lime juice to rice cooker and cook.",
            order: 0,
          },
          {
            text: "Add remaining ingredients and mix together.",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    title: "Cilantro Feta Stuffed Peppers",
    slug: "cilantro-feta-stuffed-peppers",
    description: "Bell peppers stuffed with feta cheese and fresh cilantro.",
    photo: null,
    servings: 4,
    prepTime: 20,
    cookTime: 25,
    tips: [
      "Choose peppers that can stand upright for easier stuffing and serving.",
      "Parboil the peppers for 2-3 minutes to soften them before stuffing.",
    ],
    createdAt: "2023-12-28T13:54:05.347Z",
    updatedAt: "2025-03-01T16:36:39.842Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "bell peppers",
            amount: "4",
            preparation: null,
            order: 0,
          },
          {
            name: "ground turkey",
            amount: "1 pound",
            preparation: null,
            order: 1,
          },
          {
            name: "cooked rice",
            amount: "1 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "onion",
            amount: "1",
            preparation: null,
            order: 3,
          },
          {
            name: "garlic",
            amount: "3 clove",
            preparation: null,
            order: 4,
          },
          {
            name: "smoked paprika",
            amount: "1 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "ground cumin",
            amount: "1 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "oregano",
            amount: "1 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "chicken broth",
            amount: "1 cup",
            preparation: null,
            order: 8,
          },
          {
            name: "fresh parsley, chopped",
            amount: "0.25 cup",
            preparation: null,
            order: 9,
          },
          {
            name: "cilantro, chopped",
            amount: "0.25 cup",
            preparation: null,
            order: 10,
          },
          {
            name: "feta cheese",
            amount: "0.25 cup",
            preparation: null,
            order: 11,
          },
          {
            name: "parmesan cheese",
            amount: "0.5 cup",
            preparation: null,
            order: 12,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Preheat oven to 400 degrees.",
            order: 0,
          },
          {
            text: "Cook turkey over medium-high heat. Once brown, add in minced garlic, diced onion, paprika, cumin, & oregano. Cook until onions are soft, 2-3 minutes.",
            order: 1,
          },
          {
            text: "Drain the mixture and add back to the pan. Add broth, parsley, cilantro, feta, and rice. Let simmer until broth is nearly evaporated/absorbed.",
            order: 2,
          },
          {
            text: "Chop tops off peppers and empty. Fill each pepper with the meat/rice mixture and top with parmesan. Bake until peppers are soft, about 40 minutes.",
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Cilantro Lime Chicken",
    slug: "cilantro-lime-chicken",
    description: "Grilled chicken marinated in cilantro and lime.",
    photo: null,
    servings: 4,
    prepTime: 30,
    cookTime: 15,
    tips: [
      "Marinate the chicken for at least 2 hours, or overnight for maximum flavor.",
      "Don't overcook the chicken - it should reach 165°F internal temperature.",
    ],
    createdAt: "2025-03-01T14:00:27.213Z",
    updatedAt: "2025-03-01T14:00:27.213Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chicken broth",
            amount: "0.5 cup",
            preparation: null,
            order: 0,
          },
          {
            name: "lime juice",
            amount: "0.25 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "olive oil",
            amount: "0.25 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic, smashed",
            amount: "6 clove",
            preparation: null,
            order: 3,
          },
          {
            name: "jalapeño, chopped",
            amount: "1",
            preparation: null,
            order: 4,
          },
          {
            name: "cumin",
            amount: "2 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "paprika",
            amount: "1 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "salt",
            amount: "1 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "pepper",
            amount: "1 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "chicken breast",
            amount: "2 pound",
            preparation: null,
            order: 9,
          },
          {
            name: "cilantro, chopped",
            amount: "0.5 cup",
            preparation: null,
            order: 10,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Add all ingredients except chicken and cilantro to food processor and blend until smooth.",
            order: 0,
          },
          {
            text: "Add chicken to crockpot and pour sauce over. Cook on low for 5 hours.",
            order: 1,
          },
          {
            text: "Shred the chicken, add the cilantro, and mix well.",
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Cilantro Lime Dressing",
    slug: "cilantro-lime-dressing",
    description: "Fresh cilantro and lime vinaigrette dressing.",
    photo: null,
    servings: 8,
    prepTime: 10,
    cookTime: 0,
    tips: [],
    createdAt: "2024-11-14T00:04:54.961Z",
    updatedAt: "2025-03-01T16:36:17.615Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "jalapeño, seeded and chopped",
            amount: "1",
            preparation: null,
            order: 0,
          },
          {
            name: "garlic",
            amount: "5 clove",
            preparation: null,
            order: 1,
          },
          {
            name: "mayonnaise",
            amount: "0.5 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "sour cream",
            amount: "0.5 cup",
            preparation: null,
            order: 3,
          },
          {
            name: "lime juice",
            amount: "0.25 cup",
            preparation: null,
            order: 4,
          },
          {
            name: "honey",
            amount: "2 tablespoon",
            preparation: null,
            order: 5,
          },
          {
            name: "salt",
            amount: "0.75 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "cilantro",
            amount: "0.5 cup",
            preparation: null,
            order: 7,
          },
          {
            name: "olive oil",
            amount: "0.5 cup",
            preparation: null,
            order: 8,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Add jalapeño and garlic to food processor and pulse until finely chopped.",
            order: 0,
          },
          {
            text: "Add mayo, sour cream, lime juice, honey, salt, and cilantro to the processor. Pulse until fully blended.",
            order: 1,
          },
          {
            text: "With processor running, slowly add in the oil until fully incorporated. Add more salt as needed.",
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Corn Salsa",
    slug: "corn-salsa",
    description: "Fresh corn salsa with tomatoes, onions, and lime.",
    photo: null,
    servings: 6,
    prepTime: 15,
    cookTime: 0,
    tips: [],
    createdAt: "2023-12-28T13:56:01.685Z",
    updatedAt: "2023-12-28T13:56:01.685Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "corn",
            amount: "3 cup",
            preparation: null,
            order: 0,
          },
          {
            name: "red onion",
            amount: "1 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "avocados",
            amount: "2",
            preparation: null,
            order: 2,
          },
          {
            name: "cilantro",
            amount: "0.5 cup",
            preparation: null,
            order: 3,
          },
          {
            name: "jalapeños",
            amount: "2",
            preparation: null,
            order: 4,
          },
          {
            name: "lime juice",
            amount: "0.25 cup",
            preparation: null,
            order: 5,
          },
          {
            name: "apple cider vinegar",
            amount: "1 tablespoon",
            preparation: null,
            order: 6,
          },
          {
            name: "chili powder",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "ground cumin",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "salt",
            amount: "0.5 tablespoon",
            preparation: null,
            order: 9,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Finely chop the red onion, cilantro, and jalapeños, and dice the avocado. Mix all ingredients together.",
            order: 0,
          },
        ],
      },
    ],
  },
  {
    title: "Cowboy Caviar",
    slug: "cowboy-caviar",
    description: "Black bean and corn salad with fresh vegetables.",
    photo: null,
    servings: 8,
    prepTime: 20,
    cookTime: 0,
    tips: [
      "Let the salad sit for at least 30 minutes before serving to allow flavors to meld.",
      "Drain and rinse the beans well to remove excess sodium and improve texture.",
    ],
    createdAt: "2025-01-25T17:06:14.587Z",
    updatedAt: "2025-01-25T17:06:14.587Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "Roma tomatoes, diced",
            amount: "3",
            preparation: null,
            order: 0,
          },
          {
            name: "avocados, diced",
            amount: "2",
            preparation: null,
            order: 1,
          },
          {
            name: "red onion, diced",
            amount: "0.5",
            preparation: null,
            order: 2,
          },
          {
            name: "15 ounce can of black beans, rinsed & drained",
            amount: "1",
            preparation: null,
            order: 3,
          },
          {
            name: "15 ounce can of corn",
            amount: "1",
            preparation: null,
            order: 4,
          },
          {
            name: "green bell pepper, diced",
            amount: "1",
            preparation: null,
            order: 5,
          },
          {
            name: "jalapeño, diced",
            amount: "1",
            preparation: null,
            order: 6,
          },
          {
            name: "cilantro, chopped",
            amount: "0.333 cup",
            preparation: null,
            order: 7,
          },
          {
            name: "olive oil",
            amount: "0.333 cup",
            preparation: null,
            order: 8,
          },
          {
            name: "lime juice",
            amount: "2 tablespoon",
            preparation: null,
            order: 9,
          },
          {
            name: "red wine vinegar",
            amount: "2 tablespoon",
            preparation: null,
            order: 10,
          },
          {
            name: "sugar",
            amount: "1 teaspoon",
            preparation: null,
            order: 11,
          },
          {
            name: "salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 12,
          },
          {
            name: "pepper",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 13,
          },
          {
            name: "garlic powder",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 14,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "In a large bowl, whisk together the olive oil, lime juice, vinegar, sugar, salt, pepper, and garlic powder.",
            order: 0,
          },
          {
            text: "Add chopped veggies to the bowl and thoroughly mix together.",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    title: "Cream of Mushroom Chicken",
    slug: "cream-of-mushroom-chicken",
    description: "Chicken cooked in creamy mushroom sauce.",
    photo: null,
    servings: 4,
    prepTime: 15,
    cookTime: 25,
    tips: [
      "Don't overcook the chicken - it will continue cooking in the sauce.",
      "Use a mix of mushroom varieties for more complex flavor.",
    ],
    createdAt: "2025-01-29T18:59:36.213Z",
    updatedAt: "2025-01-29T18:59:50.736Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chicken",
            amount: "1.5 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "onion, chopped",
            amount: "1 medium",
            preparation: null,
            order: 1,
          },
          {
            name: "10.5 oz can condensed cream of mushroom soup",
            amount: "1",
            preparation: null,
            order: 2,
          },
          {
            name: "butter",
            amount: "2 tablespoon",
            preparation: null,
            order: 3,
          },
          {
            name: "olive oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "chicken broth",
            amount: "0.333 cup",
            preparation: null,
            order: 5,
          },
          {
            name: "garlic powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "Salt & pepper to taste",
            amount: "0",
            preparation: null,
            order: 7,
          },
          {
            name: "Chopped parsley, for garnish",
            amount: "0",
            preparation: null,
            order: 8,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Cut chicken in half length-wise & season with salt, pepper, and garlic powder.",
            order: 0,
          },
          {
            text: "Add olive oil & 1 tbsp butter to a skillet and heat over medium-high. Cook the chicken for 4-5 minutes per side, then transfer to a plate.",
            order: 1,
          },
          {
            text: "Reduce the heat to medium and add the other tbsp of butter and the onions to the skillet. Cook until onions are lightly browned.",
            order: 2,
          },
          {
            text: "Add the broth & condensed soup to the skillet and stir until smooth.",
            order: 3,
          },
          {
            text: "Reduce heat to medium-low and add the chicken back in (with juices from the plate). Cook for another 5 minutes until the chicken is fully done.",
            order: 4,
          },
          {
            text: "Serve topped with parsley if desired.",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    title: "Creamy Feta & Roasted Red Pepper Chicken",
    slug: "creamy-feta-&-roasted-red-pepper-chicken",
    description: "Chicken in creamy feta sauce with roasted red peppers.",
    photo: null,
    servings: 4,
    prepTime: 15,
    cookTime: 20,
    tips: [
      "Use good quality feta cheese for the best flavor.",
      "Don't let the sauce boil after adding the feta to prevent curdling.",
    ],
    createdAt: "2024-03-11T14:31:27.149Z",
    updatedAt: "2024-03-11T14:31:27.149Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "olive oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 0,
          },
          {
            name: "onion, diced",
            amount: "0.5",
            preparation: null,
            order: 1,
          },
          {
            name: "garlic, minced",
            amount: "4 clove",
            preparation: null,
            order: 2,
          },
          {
            name: "cauliflower florets",
            amount: "0.5 pound",
            preparation: null,
            order: 3,
          },
          {
            name: "jar roasted red peppers, drained",
            amount: "12 ounce",
            preparation: null,
            order: 4,
          },
          {
            name: "chicken breasts",
            amount: "2 pound",
            preparation: null,
            order: 5,
          },
          {
            name: "paprika",
            amount: "1.5 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "oregano",
            amount: "1 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "salt",
            amount: "1.5 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "black pepper",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 9,
          },
          {
            name: "red pepper flakes",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 10,
          },
          {
            name: "chicken broth",
            amount: "2 cup",
            preparation: null,
            order: 11,
          },
          {
            name: "spinach, chopped",
            amount: "1 cup",
            preparation: null,
            order: 12,
          },
          {
            name: "feta, crumbled",
            amount: "0.75 cup",
            preparation: null,
            order: 13,
          },
          {
            name: "cream cheese",
            amount: "8 ounce",
            preparation: null,
            order: 14,
          },
          {
            name: "lemon, juiced",
            amount: "1",
            preparation: null,
            order: 15,
          },
          {
            name: "Rice",
            amount: "0",
            preparation: null,
            order: 16,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Heat a large pot over medium heat with olive oil. Add onions and garlic and sauté for 3 minutes.",
            order: 0,
          },
          {
            text: "Add cauliflower, red peppers, chicken, seasonings, and broth, ensuring everything is fully submerged. Bring to a simmer & cover. Simmer for 10-15 minutes, until chicken is cooked through.",
            order: 1,
          },
          {
            text: "Shred the chicken and add spinach, feta, cream cheese, and lemon juice. Simmer for 5-10 more minutes to allow liquid to thicken.",
            order: 2,
          },
          {
            text: "Serve over rice.",
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Crockpot Chicken Tacos",
    slug: "crockpot-chicken-tacos",
    description: "Slow-cooked chicken tacos made in the crockpot.",
    photo: null,
    servings: 8,
    prepTime: 10,
    cookTime: 480,
    tips: [
      "Don't add liquid - the chicken will create its own juices as it cooks.",
      "Shred the chicken while it's still warm for easier handling.",
    ],
    createdAt: "2025-04-28T20:02:00.253Z",
    updatedAt: "2025-04-28T20:02:00.253Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chicken breast",
            amount: "2 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "salsa",
            amount: "1 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "canned diced tomatoes with chilies (Rotel)",
            amount: "1 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "onion, diced",
            amount: "0.5",
            preparation: null,
            order: 3,
          },
          {
            name: "chili powder",
            amount: "1 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "ground cumin",
            amount: "1.5 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "pepper",
            amount: "1 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "onion powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "oregano",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 9,
          },
          {
            name: "garlic powder",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 10,
          },
          {
            name: "red pepper flakes",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 11,
          },
          {
            name: "Pinch of cayenne pepper",
            amount: "0",
            preparation: null,
            order: 12,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Combine salsa, canned tomatoes, and seasonings.",
            order: 0,
          },
          {
            text: "Place onions and chicken in the slow cooker and top with the mixture.",
            order: 1,
          },
          {
            text: "Cook on low for 8 hours. Shred the chicken and serve.",
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Crystal's Famous Cheese Dip",
    slug: "crystal's-famous-cheese-dip",
    description: "Creamy cheese dip perfect for parties and gatherings.",
    photo: null,
    servings: 12,
    prepTime: 10,
    cookTime: 15,
    tips: [
      "Serve warm with tortilla chips, crackers, or fresh vegetables.",
      "Keep warm in a slow cooker for parties to maintain the perfect dipping consistency.",
    ],
    createdAt: "2024-01-02T19:55:38.614Z",
    updatedAt: "2024-01-02T19:55:38.614Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "Velveeta cheese",
            amount: "2 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "Hormel chili (no beans)",
            amount: "2 can",
            preparation: null,
            order: 1,
          },
          {
            name: "onions, chopped",
            amount: "2",
            preparation: null,
            order: 2,
          },
          {
            name: "green chilis",
            amount: "2 can",
            preparation: null,
            order: 3,
          },
          {
            name: "Tabasco sauce to taste",
            amount: "0",
            preparation: null,
            order: 4,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Add Velveeta, chili, onions, and green chilis to a crockpot and cook on low for 8 hours (or high for 4 hours). Stir occasionally.",
            order: 0,
          },
          {
            text: "Stir in some Tabasco sauce to taste.",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    title: "Fish Tacos",
    slug: "fish-tacos",
    description: "Fresh fish tacos with cabbage slaw and lime crema.",
    photo: null,
    servings: 4,
    prepTime: 20,
    cookTime: 10,
    tips: [
      "Use firm white fish like cod or tilapia for best results.",
      "Don't overcook the fish - it should flake easily when done.",
    ],
    createdAt: "2024-02-28T12:46:11.713Z",
    updatedAt: "2024-02-28T12:46:11.713Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "cod",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "chili powder",
            amount: "1 teaspoon",
            preparation: null,
            order: 1,
          },
          {
            name: "oregano",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic powder",
            amount: "1.5 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "paprika",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "cayenne",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "onion powder",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "cumin",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "pepper",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 9,
          },
          {
            name: "coleslaw mix",
            amount: "2 cup",
            preparation: null,
            order: 10,
          },
          {
            name: "Cotija cheese, grated",
            amount: "1 cup",
            preparation: null,
            order: 11,
          },
          {
            name: "sour cream",
            amount: "0.5 cup",
            preparation: null,
            order: 12,
          },
          {
            name: "mayo",
            amount: "0.333 cup",
            preparation: null,
            order: 13,
          },
          {
            name: "lime juice",
            amount: "2 tablespoon",
            preparation: null,
            order: 14,
          },
          {
            name: "Sriracha",
            amount: "1 teaspoon",
            preparation: null,
            order: 15,
          },
          {
            name: "Pico de Gallo",
            amount: "0",
            preparation: null,
            order: 16,
          },
          {
            name: "Guacamole",
            amount: "0",
            preparation: null,
            order: 17,
          },
          {
            name: "Lime wedges",
            amount: "0",
            preparation: null,
            order: 18,
          },
          {
            name: "Tortillas",
            amount: "0",
            preparation: null,
            order: 19,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Mix 1/2 tsp garlic powder and the rest of the spices in a small bowl. Pat fish dry and generously cover the fish with the spice rub.",
            order: 0,
          },
          {
            text: "Preheat air fryer to 400 degrees. Spray air fryer with oil and add fish to the basket. Spritz top of fish with a bit of oil.",
            order: 1,
          },
          {
            text: "Heat fish at 400 degrees for about 8-10 minutes. Once cooked, remove from air fryer and cut into small pieces.",
            order: 2,
          },
          {
            text: "While fish cooks, mix remaining 1 tsp garlic powder, sour cream, mayo, lime juice, and Sriracha in a small bowl.",
            order: 3,
          },
          {
            text: "Warm your tortillas. Add fish and top with slaw mix, guac, pico, cotija, and sauce. Squeeze some lime juice on top.",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    title: "French Dip Sandwiches",
    slug: "french-dip-sandwiches",
    description: "Classic French dip sandwiches with au jus for dipping.",
    photo: null,
    servings: 4,
    prepTime: 15,
    cookTime: 180,
    tips: [
      "Use a good quality beef broth for the au jus - it makes all the difference.",
      "Toast the rolls lightly to prevent them from getting soggy when dipped.",
    ],
    createdAt: "2024-08-05T15:11:08.442Z",
    updatedAt: "2024-08-05T15:11:08.442Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "beef chuck roast",
            amount: "2 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "beef broth",
            amount: "3 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "Worcestershire sauce",
            amount: "0.25 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "olive oil",
            amount: "2 tablespoon",
            preparation: null,
            order: 3,
          },
          {
            name: "onions, sliced",
            amount: "2",
            preparation: null,
            order: 4,
          },
          {
            name: "garlic, minced",
            amount: "5 clove",
            preparation: null,
            order: 5,
          },
          {
            name: "bay leaf",
            amount: "1",
            preparation: null,
            order: 6,
          },
          {
            name: "Salt & pepper to taste",
            amount: "0",
            preparation: null,
            order: 7,
          },
          {
            name: "hoagie rolls",
            amount: "6",
            preparation: null,
            order: 8,
          },
          {
            name: "slices of white cheese (e.g. provolone)",
            amount: "6",
            preparation: null,
            order: 9,
          },
          {
            name: "Butter",
            amount: "0",
            preparation: null,
            order: 10,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Liberally salt & pepper the roast.",
            order: 0,
          },
          {
            text: "Heat a large cast iron skillet over medium-high heat. Sear the roast on all sides until a nice crust has formed.",
            order: 1,
          },
          {
            text: "While searing, combine broth & Worcestershire sauce and set aside.",
            order: 2,
          },
          {
            text: "Transfer meat to slow cooker. Reduce heat to medium for cast iron, then add the olive oil and onions. Cook for 5 minutes, then add the garlic. Cook for an additional minute or two until fragrant.",
            order: 3,
          },
          {
            text: "Transfer the onion mix over the meat in the slow cooker, then pour the broth mixture over. Add the bay leaf, and cook on low for about 5 hours.",
            order: 4,
          },
          {
            text: "Remove meat and slice into thin pieces. Pour the juices in the slow cooker through a strainer (keep them for au jus). Return the mean and onions back to the cooker and mix in about a tablespoon of the au jus.",
            order: 5,
          },
          {
            text: "Preheat oven to 375 degrees. Butter the hoagies and toast them in the oven for a few minutes, until they start getting slightly toasted.",
            order: 6,
          },
          {
            text: "Remove the hoagies from the oven and add the meat, followed by the cheese. Change the over to broil and add the sandwiches back in for another minute, until the cheese has melted.",
            order: 7,
          },
          {
            text: "Finish assembling the sandwiches and serve with bowls of au jus.",
            order: 8,
          },
        ],
      },
    ],
  },
  {
    title: "Gochujang Sauce",
    slug: "gochujang-sauce",
    description: "Spicy Korean gochujang sauce for marinades and dipping.",
    photo: null,
    servings: 8,
    prepTime: 5,
    cookTime: 0,
    tips: [],
    createdAt: "2024-04-28T16:08:13.566Z",
    updatedAt: "2024-04-28T16:09:37.913Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chili paste",
            amount: "3 tablespoon",
            preparation: null,
            order: 0,
          },
          {
            name: "rice vinegar",
            amount: "1.5 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "sesame oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 2,
          },
          {
            name: "maple syrup",
            amount: "1 tablespoon",
            preparation: null,
            order: 3,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Mix all ingredients in a small bowl.",
            order: 0,
          },
        ],
      },
    ],
  },
  {
    title: "Guacamole",
    slug: "guacamole",
    description: "Fresh guacamole with avocado, lime, and cilantro.",
    photo: null,
    servings: 6,
    prepTime: 10,
    cookTime: 0,
    tips: [
      "Use ripe avocados that yield to gentle pressure for the best texture.",
      "Add the lime juice immediately after mashing to prevent browning.",
    ],
    createdAt: "2023-12-28T13:57:06.345Z",
    updatedAt: "2023-12-28T13:57:06.345Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "avocados",
            amount: "3",
            preparation: null,
            order: 0,
          },
          {
            name: "red onion",
            amount: "0.25 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "cilantro",
            amount: "0.5 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "jalapeño",
            amount: "0.5",
            preparation: null,
            order: 3,
          },
          {
            name: "garlic",
            amount: "3 clove",
            preparation: null,
            order: 4,
          },
          {
            name: "lime juice",
            amount: "2 tablespoon",
            preparation: null,
            order: 5,
          },
          {
            name: "freshly ground pepper",
            amount: "1 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "coarse salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 7,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Finely chop the red onion & jalapeño, and mince the cilantro & garlic. Mix all ingredients in a bowl and mash together.",
            order: 0,
          },
        ],
      },
    ],
  },
  {
    title: "Jamaican Jerk Chicken",
    slug: "jamaican-jerk-chicken",
    description: "Spicy Jamaican jerk chicken with authentic seasonings.",
    photo: null,
    servings: 4,
    prepTime: 30,
    cookTime: 25,
    tips: [
      "Marinate the chicken for at least 4 hours, or overnight for maximum flavor.",
      "Use a grill or cast iron skillet for the best char and authentic jerk flavor.",
    ],
    createdAt: "2025-03-15T15:17:57.479Z",
    updatedAt: "2025-03-15T15:17:57.479Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "onion, chopped",
            amount: "1",
            preparation: null,
            order: 0,
          },
          {
            name: "green onions, chopped",
            amount: "3",
            preparation: null,
            order: 1,
          },
          {
            name: "habaneros, seeded and chopped",
            amount: "2",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic, chopped",
            amount: "6 clove",
            preparation: null,
            order: 3,
          },
          {
            name: "five-spice powder",
            amount: "1 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "allspice berries, coarsely ground",
            amount: "1 tablespoon",
            preparation: null,
            order: 5,
          },
          {
            name: "black pepper, coarsely ground",
            amount: "1 tablespoon",
            preparation: null,
            order: 6,
          },
          {
            name: "dried thyme",
            amount: "1 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "nutmeg, freshly grated",
            amount: "1 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "salt",
            amount: "1 teaspoon",
            preparation: null,
            order: 9,
          },
          {
            name: "soy sauce",
            amount: "0.5 cup",
            preparation: null,
            order: 10,
          },
          {
            name: "vegetable oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 11,
          },
          {
            name: "chicken (breast, thighs, whatever)",
            amount: "2 pound",
            preparation: null,
            order: 12,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "In a food processor, add onion, green onion, habaneros, garlic, and spices. Process to a paste. With the machine on low, slowly add the soy sauce and oil until well combined.",
            order: 0,
          },
          {
            text: "Add the chicken and marinade to a container and marinate for several hours (ideally overnight).",
            order: 1,
          },
          {
            text: "Bring the chicken to room temperature first for better cooking results! Start the grill and cook chicken through. Note that the air fryer isn't great for this marinade, as it gets pretty charred around the edges - grill is recommended!",
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "KenZie's Dessert Dip",
    slug: "kenzies-dessert-dip",
    description: "Sweet dessert dip with cream cheese and chocolate chips.",
    photo: null,
    servings: 8,
    prepTime: 10,
    cookTime: 0,
    tips: [],
    createdAt: "2024-04-26T23:14:18.203Z",
    updatedAt: "2024-04-26T23:18:41.776Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "vanilla extract",
            amount: "1 teaspoon",
            preparation: null,
            order: 0,
          },
          {
            name: "brown sugar",
            amount: "1 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "marshmallow cream",
            amount: "7 ounce",
            preparation: null,
            order: 2,
          },
          {
            name: "heavy whipping cream",
            amount: "1 cup",
            preparation: null,
            order: 3,
          },
          {
            name: "mini chocolate chips",
            amount: "1.5 cup",
            preparation: null,
            order: 4,
          },
          {
            name: "cream cheese",
            amount: "8 ounce",
            preparation: null,
            order: 5,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Mix together cream cheese and vanilla in a mixing bowl until smooth and fluffy",
            order: 0,
          },
          {
            text: "Beat the brown sugar into the cream cheese mixture and add the marshmallow cream",
            order: 1,
          },
          {
            text: "While mixing, gradually add the heavy cream, continuing to beat until the mixture is smooth and fluffy",
            order: 2,
          },
          {
            text: "Fold in or beat in the mini chocolate chips, just until combined",
            order: 3,
          },
          {
            text: "Serve with graham crackers or berries!!",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    title: "Korean Beef Bowls",
    slug: "korean-beef-bowls",
    description: "Korean-style beef bowls with rice and vegetables.",
    photo: null,
    servings: 4,
    prepTime: 15,
    cookTime: 10,
    tips: [
      "Use thin-sliced beef for quick cooking and tender texture.",
      "Don't overcook the beef - it should be just cooked through.",
    ],
    createdAt: "2024-02-27T12:27:22.035Z",
    updatedAt: "2024-03-17T21:08:03.330Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "soy sauce",
            amount: "0.25 cup",
            preparation: null,
            order: 0,
          },
          {
            name: "tsps brown sugar",
            amount: "2",
            preparation: null,
            order: 1,
          },
          {
            name: "sesame oil",
            amount: "1 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "crushed red pepper flakes",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "ground beef",
            amount: "1 pound",
            preparation: null,
            order: 4,
          },
          {
            name: "onion, chopped",
            amount: "0.5 cup",
            preparation: null,
            order: 5,
          },
          {
            name: "garlic, crushed",
            amount: "4 clove",
            preparation: null,
            order: 6,
          },
          {
            name: "fresh ginger, minced",
            amount: "1 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "broccoli",
            amount: "2 head",
            preparation: null,
            order: 8,
          },
          {
            name: "cucumber, sliced",
            amount: "1",
            preparation: null,
            order: 9,
          },
          {
            name: "Sesame seeds to taste",
            amount: "0",
            preparation: null,
            order: 10,
          },
          {
            name: "green onions",
            amount: "4",
            preparation: null,
            order: 11,
          },
          {
            name: "White rice",
            amount: "0",
            preparation: null,
            order: 12,
          },
          {
            name: "Sesame Seeds",
            amount: "0",
            preparation: null,
            order: 13,
          },
          {
            name: "Gochujang",
            amount: "0",
            preparation: null,
            order: 14,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Combine soy sauce, 2 tablespoons water, brown sugar, sesame oil, and pepper flakes in a bowl.",
            order: 0,
          },
          {
            text: "Heat a wok over high heat. Once hot, spray with cooking oil and cook the beef until no longer pink.",
            order: 1,
          },
          {
            text: "Add onion, garlic, and ginger and cook for another minute, until soft.",
            order: 2,
          },
          {
            text: "Add broccoli to the wok and pour sauce over. Mix together, then cover and simmer for about 10 minutes to allow the flavors to meld.",
            order: 3,
          },
          {
            text: "Serve with white rice and gochujang sauce. Top with sesame seeds.",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    title: "Lemon Garlic Shrimp",
    slug: "lemon-garlic-shrimp",
    description: "Shrimp cooked with lemon and garlic butter sauce.",
    photo: null,
    servings: 4,
    prepTime: 10,
    cookTime: 8,
    tips: [
      "Don't overcook the shrimp - they cook very quickly and become rubbery.",
      "Add the lemon juice at the end to preserve its bright flavor.",
    ],
    createdAt: "2025-01-25T17:01:48.611Z",
    updatedAt: "2025-01-25T17:01:48.611Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "shrimp",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "olive oil",
            amount: "1 tablespoon + 1 tsp",
            preparation: null,
            order: 1,
          },
          {
            name: "lemon juice",
            amount: "2 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic, minced",
            amount: "3 clove",
            preparation: null,
            order: 3,
          },
          {
            name: "honey",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "paprika",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "onion powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "Italian seasoning",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "Salt & pepper to taste",
            amount: "0",
            preparation: null,
            order: 8,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Preheat oven to 400 degrees.",
            order: 0,
          },
          {
            text: "In a bowl, whisk together everything but the shrimp. Once mixed, add the shrimp to the bowl and toss to coat.",
            order: 1,
          },
          {
            text: "Transfer shrimp to a baking sheet and roast for 6 - 8 minutes, depending on the size of the shrimp.",
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Lemon Parmesan Broccoli",
    slug: "lemon-parmesan-broccoli",
    description: "Roasted broccoli with lemon and parmesan cheese.",
    photo: null,
    servings: 4,
    prepTime: 10,
    cookTime: 18,
    tips: [],
    createdAt: "2023-12-28T14:46:29.973Z",
    updatedAt: "2023-12-28T14:46:29.973Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "broccoli",
            amount: "1 head",
            preparation: null,
            order: 0,
          },
          {
            name: "olive oil",
            amount: "3 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "lemon juice",
            amount: "1 tablespoon",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic",
            amount: "4 clove",
            preparation: null,
            order: 3,
          },
          {
            name: "parmesan",
            amount: "0.25 cup",
            preparation: null,
            order: 4,
          },
          {
            name: "Salt & pepper to taste",
            amount: "0",
            preparation: null,
            order: 5,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Preheat oven to 425 degrees.",
            order: 0,
          },
          {
            text: "Chop broccoli into bite size pieces. Combine broccoli, olive oil, lemon juice, garlic, and salt in a bowl and mix together.",
            order: 1,
          },
          {
            text: "Put broccoli on an oven-safe baking sheet and bake for 18 minutes.",
            order: 2,
          },
          {
            text: "Put broccoli back in the mixing bowl and toss in parmesan and pepper. Mix together.",
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Lemon Parmesan Rice",
    slug: "lemon-parmesan-rice",
    description: "Fluffy rice with lemon and parmesan cheese.",
    photo: null,
    servings: 6,
    prepTime: 5,
    cookTime: 20,
    tips: [],
    createdAt: "2023-12-28T14:48:53.366Z",
    updatedAt: "2023-12-28T14:49:40.071Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "brown rice",
            amount: "1 cup",
            preparation: null,
            order: 0,
          },
          {
            name: "vegetable stock",
            amount: "1.5 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "shallots, finely chopped",
            amount: "2",
            preparation: null,
            order: 2,
          },
          {
            name: "salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "garlic, minced",
            amount: "3 clove",
            preparation: null,
            order: 4,
          },
          {
            name: "thyme",
            amount: "2 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "lemon juice",
            amount: "2 tablespoon",
            preparation: null,
            order: 6,
          },
          {
            name: "parmesan, shredded",
            amount: "0.25 cup",
            preparation: null,
            order: 7,
          },
          {
            name: "olive oil",
            amount: "3 tablespoon",
            preparation: null,
            order: 8,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Add rice, vegetable stock, 2 tbsp olive oil, shallots, and salt to rice cooker and cook.",
            order: 0,
          },
          {
            text: "Heat 1 tbsp olive oil in a pan over medium heat. Add garlic and let cook for a minute, then add thyme and lemon juice. Let cook for another minute.",
            order: 1,
          },
          {
            text: "Add the garlic & lemon juice combo to the rice, along with the parmesan. Mix together.",
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Mediterranean Stir Fry",
    slug: "mediterranean-stir-fry",
    description: "Mediterranean-inspired stir fry with vegetables and herbs.",
    photo: null,
    servings: 4,
    prepTime: 15,
    cookTime: 12,
    tips: [
      "Have all ingredients prepped and ready before you start cooking - stir fry goes fast!",
      "Don't overcook the vegetables - they should still have some crunch.",
    ],
    createdAt: "2025-03-28T11:27:28.721Z",
    updatedAt: "2025-03-28T11:27:28.721Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "ground beef",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "olive oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "red onion, sliced",
            amount: "1",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic, minced",
            amount: "5 clove",
            preparation: null,
            order: 3,
          },
          {
            name: "bell pepper, sliced",
            amount: "1",
            preparation: null,
            order: 4,
          },
          {
            name: "zucchini, sliced",
            amount: "2",
            preparation: null,
            order: 5,
          },
          {
            name: "cherry tomatoes, halved",
            amount: "1 cup",
            preparation: null,
            order: 6,
          },
          {
            name: "oregano",
            amount: "1 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "ground cumin",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "paprika",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 9,
          },
          {
            name: "salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 10,
          },
          {
            name: "pepper",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 11,
          },
          {
            name: "feta",
            amount: "0.5 cup",
            preparation: null,
            order: 12,
          },
          {
            name: "lemon, juiced",
            amount: "1",
            preparation: null,
            order: 13,
          },
          {
            name: "parsley, chopped",
            amount: "2 tablespoon",
            preparation: null,
            order: 14,
          },
          {
            name: "Rice",
            amount: "0",
            preparation: null,
            order: 15,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Heat olive oil in a large skillet over medium high heat. Add onion and garlic until fragrant.",
            order: 0,
          },
          {
            text: "Add beef to the skillet and cook through.",
            order: 1,
          },
          {
            text: "Add bell pepper, zucchini, and tomatoes to the skillet. Cook until soft.",
            order: 2,
          },
          {
            text: "Add seasonings and mix thoroughly.",
            order: 3,
          },
          {
            text: "Remove from heat and mix in lemon juice, feta, and parsley. Serve over rice.",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    title: "Mexican Salad",
    slug: "mexican-salad",
    description: "Fresh Mexican salad with beans, corn, and avocado.",
    photo: null,
    servings: 6,
    prepTime: 20,
    cookTime: 0,
    tips: [],
    createdAt: "2025-01-25T22:23:33.586Z",
    updatedAt: "2025-01-25T22:23:33.586Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "cilantro lime dressing",
            amount: "0.25 cup",
            preparation: null,
            order: 0,
          },
          {
            name: "romaine lettuce, chopped",
            amount: "1 head",
            preparation: null,
            order: 1,
          },
          {
            name: "red onion, sliced thin",
            amount: "0.5",
            preparation: null,
            order: 2,
          },
          {
            name: "grape tomatoes, halved",
            amount: "1 cup",
            preparation: null,
            order: 3,
          },
          {
            name: "cucumber, chopped",
            amount: "1",
            preparation: null,
            order: 4,
          },
          {
            name: "15 oz can of corn",
            amount: "1",
            preparation: null,
            order: 5,
          },
          {
            name: "avocado, sliced thin",
            amount: "1",
            preparation: null,
            order: 6,
          },
          {
            name: "feta, crumbled",
            amount: "0.5 cup",
            preparation: null,
            order: 7,
          },
          {
            name: "Cilantro to taste",
            amount: "0",
            preparation: null,
            order: 8,
          },
          {
            name: "Tortilla strips",
            amount: "0",
            preparation: null,
            order: 9,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Mix lettuce, onion, tomatoes, cucumber, and corn together in a large bowl and mix together.",
            order: 0,
          },
          {
            text: "Add the dressing and toss. Garnish with avocado, feta, cilantro, and tortilla strips.",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    title: "Orange Chicken",
    slug: "orange-chicken",
    description: "Chinese-style orange chicken with sweet and tangy sauce.",
    photo: null,
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    tips: [
      "Don't overcrowd the pan when frying the chicken - cook in batches if needed.",
      "The sauce should thicken and coat the chicken nicely when done.",
    ],
    createdAt: "2024-08-18T19:06:54.546Z",
    updatedAt: "2024-12-22T00:05:52.282Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chicken",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "baking soda",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 1,
          },
          {
            name: "orange juice",
            amount: "0.5 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "soy sauce",
            amount: "2.5 tablespoon",
            preparation: null,
            order: 3,
          },
          {
            name: "salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "pepper",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "cornstarch",
            amount: "1.5 tablespoon",
            preparation: null,
            order: 6,
          },
          {
            name: "garlic cloves",
            amount: "6",
            preparation: null,
            order: 7,
          },
          {
            name: "ginger",
            amount: "2 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "rice vinegar",
            amount: "0.25 cup",
            preparation: null,
            order: 9,
          },
          {
            name: "chili garlic sauce",
            amount: "1.5 tablespoon",
            preparation: null,
            order: 10,
          },
          {
            name: "orange zest",
            amount: "2 teaspoon",
            preparation: null,
            order: 11,
          },
          {
            name: "red pepper flakes",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 12,
          },
          {
            name: "brown sugar",
            amount: "3 tablespoon",
            preparation: null,
            order: 13,
          },
          {
            name: "sesame oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 14,
          },
          {
            name: "green onions, chopped",
            amount: "2",
            preparation: null,
            order: 15,
          },
          {
            name: "broccoli",
            amount: "1 head",
            preparation: null,
            order: 16,
          },
          {
            name: "Sesame seeds",
            amount: "0",
            preparation: null,
            order: 17,
          },
          {
            name: "Rice",
            amount: "0",
            preparation: null,
            order: 18,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Create marinade by combining baking soda, salt, 2 tbsp orange juice, 1 1/2 tbsp soy sauce, pepper, 1 tbsp corn starch, 2 garlic cloves, and 1 tsp ginger in a bowl. Marinate the chicken for a few hours.",
            order: 0,
          },
          {
            text: "Note! The sauce can be a little spicy (for Tannah). Cut back a bit on the chili garlic sauce & red pepper flakes to ease her pain.",
            order: 1,
          },
          {
            text: "In a different bowl, combine 1/3 cup orange juice, 1 tbsp soy sauce, rice vinegar, chili garlic sauce, 1/2 tbsp corn starch, orange zest, 4 garlic cloves, 1 tsp ginger, chili flakes, brown sugar, and salt to taste.",
            order: 2,
          },
          {
            text: "Heat the oil in a large pan and cook the chicken until no longer pink. Add the sauce and simmer until thick, about 5 minutes.",
            order: 3,
          },
          {
            text: "Steam the broccoli and add to the chicken. Sprinkle green onions and sesame seeds over everything and serve over rice.",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    title: "Orzo with Zucchini & Tomato",
    slug: "orzo-with-zucchini-&-tomato",
    description: "Orzo pasta with fresh zucchini and tomatoes.",
    photo: null,
    servings: 6,
    prepTime: 15,
    cookTime: 20,
    tips: [],
    createdAt: "2025-05-27T17:16:04.292Z",
    updatedAt: "2025-05-27T17:16:04.292Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "orzo, uncooked",
            amount: "5 ounce",
            preparation: null,
            order: 0,
          },
          {
            name: "zucchini, diced",
            amount: "1",
            preparation: null,
            order: 1,
          },
          {
            name: "tomato, chopped",
            amount: "1",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic, minced",
            amount: "4 clove",
            preparation: null,
            order: 3,
          },
          {
            name: "olive oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "parmesan, grated",
            amount: "0.25 cup",
            preparation: null,
            order: 5,
          },
          {
            name: "Salt & pepper, to taste",
            amount: "0",
            preparation: null,
            order: 6,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Cook orzo as directed for al dente. Reserve about 1/2 cup liquid before draining.",
            order: 0,
          },
          {
            text: "Add oil to the (now empty) pot. Sauté garlic until fragrant, then add zucchini and tomatoes. Season with salt & pepper and mix together. Cook until tender, 3-4 minutes.",
            order: 1,
          },
          {
            text: "Add the orzo back to the pot and stir to combine. Add some of the reserved liquid as needed so the orzo isn't too dry. Mix in the cheese and stir.",
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Pico de Gallo",
    slug: "pico-de-gallo",
    description: "Fresh Mexican pico de gallo with tomatoes and onions.",
    photo: null,
    servings: 6,
    prepTime: 15,
    cookTime: 0,
    tips: [],
    createdAt: "2023-12-28T13:20:28.363Z",
    updatedAt: "2023-12-28T13:20:28.363Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "Roma tomatoes, chopped",
            amount: "1 cup",
            preparation: null,
            order: 0,
          },
          {
            name: "onion, chopped",
            amount: "0.333 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "cilantro, chopped",
            amount: "0.25 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "lime juice",
            amount: "1 tablespoon",
            preparation: null,
            order: 3,
          },
          {
            name: "Salt & pepper to taste",
            amount: "0",
            preparation: null,
            order: 4,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Combine all ingredients in a bowl and mix together.",
            order: 0,
          },
        ],
      },
    ],
  },
  {
    title: "Ramen Salad Bowls with Grilled Chicken",
    slug: "ramen-salad-bowls-with-grilled-chicken",
    description: "Asian-inspired ramen salad bowls with grilled chicken.",
    photo: null,
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    tips: [
      "Don't overcook the ramen noodles - they should still have some bite.",
      "Let the chicken rest for a few minutes before slicing to keep it juicy.",
    ],
    createdAt: "2024-03-11T14:44:13.215Z",
    updatedAt: "2024-03-11T14:44:13.215Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "soy sauce",
            amount: "0.25 cup",
            preparation: null,
            order: 0,
          },
          {
            name: "orange juice",
            amount: "0.667 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "canola oil",
            amount: "0.25 cup",
            preparation: null,
            order: 2,
          },
          {
            name: "sesame oil",
            amount: "2 tablespoon",
            preparation: null,
            order: 3,
          },
          {
            name: "rice vinegar",
            amount: "2 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "honey",
            amount: "4 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "chicken",
            amount: "1.25 pound",
            preparation: null,
            order: 6,
          },
          {
            name: "ramen noodles",
            amount: "1 package",
            preparation: null,
            order: 7,
          },
          {
            name: "almonds, slivered",
            amount: "0.333 cup",
            preparation: null,
            order: 8,
          },
          {
            name: "coleslaw mix",
            amount: "7 cup",
            preparation: null,
            order: 9,
          },
          {
            name: "red bell pepper, sliced",
            amount: "0.5",
            preparation: null,
            order: 10,
          },
          {
            name: "green onions, sliced",
            amount: "3",
            preparation: null,
            order: 11,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "In a medium bowl, combine soy sauce, orange juice, canola oil, sesame oil, rice vinegar, and honey. Combine and set half (3/4 cup) aside for the dressing.",
            order: 0,
          },
          {
            text: "Put chicken in a bag and pound until about 1/2 inch thick. Add remaining 3/4 cup marinade. Let sit for at least 30 minutes in the fridge.",
            order: 1,
          },
          {
            text: "Preheat grill over medium-high heat. Remove chicken from the marinade and cook for about 5 minutes per side, until no longer pink.",
            order: 2,
          },
          {
            text: "Preheat oven for 350 degrees.",
            order: 3,
          },
          {
            text: "While in the package, break ramen into small pieces. Spread the ramen pieces and almonds onto a sheet pan and toast in the oven for about 10 minutes.",
            order: 4,
          },
          {
            text: "In a large bowl, combine slaw mix, bell pepper, and green onions. Mix well.",
            order: 5,
          },
          {
            text: "To serve, top salad with ramen-almond mix and grilled chicken. Top with dressing.",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    title: "Roasted Broccolini",
    slug: "roasted-broccolini",
    description: "Simple roasted broccolini with olive oil and seasonings.",
    photo: null,
    servings: 4,
    prepTime: 5,
    cookTime: 15,
    tips: [],
    createdAt: "2025-01-25T17:28:44.084Z",
    updatedAt: "2025-01-25T17:29:07.409Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "broccolini",
            amount: "0.5 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "olive oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "garlic powder",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "salt",
            amount: "0.125 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "pepper",
            amount: "0.125 teaspoon",
            preparation: null,
            order: 4,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Preheat oven to 425 degrees.",
            order: 0,
          },
          {
            text: "Trim the tips of the broccolini and add to a bowl. Add the remaining ingredients and mix together.",
            order: 1,
          },
          {
            text: "Spread the broccolini on a baking sheet and cook for 10-15 minutes, until crispy and brown.",
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Roasted Potatoes",
    slug: "roasted-potatoes",
    description: "Crispy roasted potatoes with herbs and spices.",
    photo: null,
    servings: 6,
    prepTime: 10,
    cookTime: 35,
    tips: [
      "Cut potatoes into similar sizes for even cooking.",
      "Don't overcrowd the pan - use two baking sheets if needed for crispier results.",
    ],
    createdAt: "2025-01-25T17:09:50.375Z",
    updatedAt: "2025-01-25T17:09:50.375Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "Yukon gold potatoes",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "olive oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "salt",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "oregano",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "thyme",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "Pepper to taste",
            amount: "0",
            preparation: null,
            order: 6,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Preheat oven to 425 degrees.",
            order: 0,
          },
          {
            text: "Wash potatoes and cut to 1/2-inch sized pieces.",
            order: 1,
          },
          {
            text: "Put potatoes in a bowl and add the remaining ingredients. Mix together well.",
            order: 2,
          },
          {
            text: "Transfer potatoes to a baking sheet and roast for about 25 minutes, tossing about halfway through.",
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Ropa Vieja",
    slug: "ropa-vieja",
    description: "Cuban-style shredded beef stew with peppers and onions.",
    photo: null,
    servings: 6,
    prepTime: 20,
    cookTime: 480,
    tips: [
      "Use a good quality chuck roast for the best flavor and tenderness.",
      "Don't skip the searing step - it adds important depth of flavor.",
    ],
    createdAt: "2025-03-15T15:32:39.317Z",
    updatedAt: "2025-03-15T15:32:39.317Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chuck beef",
            amount: "2 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "onion, sliced",
            amount: "1",
            preparation: null,
            order: 1,
          },
          {
            name: "green bell pepper, sliced",
            amount: "1",
            preparation: null,
            order: 2,
          },
          {
            name: "red bell pepper, sliced",
            amount: "1",
            preparation: null,
            order: 3,
          },
          {
            name: "yellow bell pepper, sliced",
            amount: "1",
            preparation: null,
            order: 4,
          },
          {
            name: "garlic, minced",
            amount: "8 clove",
            preparation: null,
            order: 5,
          },
          {
            name: "oregano",
            amount: "2 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "ground cumin",
            amount: "2 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "sweet paprika",
            amount: "2 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "smoked paprika",
            amount: "1 teaspoon",
            preparation: null,
            order: 9,
          },
          {
            name: "ground allspice",
            amount: "0.125 teaspoon",
            preparation: null,
            order: 10,
          },
          {
            name: "ground cloves",
            amount: "0.125 teaspoon",
            preparation: null,
            order: 11,
          },
          {
            name: "salt",
            amount: "2 teaspoon",
            preparation: null,
            order: 12,
          },
          {
            name: "black pepper, freshly ground",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 13,
          },
          {
            name: "beef broth",
            amount: "1 cup",
            preparation: null,
            order: 14,
          },
          {
            name: "16 oz can crushed tomatoes",
            amount: "1",
            preparation: null,
            order: 15,
          },
          {
            name: "tomato paste",
            amount: "6 ounce",
            preparation: null,
            order: 16,
          },
          {
            name: "bay leaves",
            amount: "2",
            preparation: null,
            order: 17,
          },
          {
            name: "fresh parsley, chopped",
            amount: "0.333 cup",
            preparation: null,
            order: 18,
          },
          {
            name: "olive oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 19,
          },
          {
            name: "Rice",
            amount: "0",
            preparation: null,
            order: 20,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Heat oil over high heat in a large skillet. Brown the meat on all sides until a nice crust has formed.",
            order: 0,
          },
          {
            text: "Transfer the meat to a crockpot. Pour in the broth and add the onion and bell peppers. Then, add the crushed tomatoes and tomato paste, followed by the garlic and spices. Stir everything until well blended.",
            order: 1,
          },
          {
            text: "Add the bay leaves, then cover and cook on low for 8 hours.",
            order: 2,
          },
          {
            text: "Once cooked, remove the bay leaves and shred the beef. Add the parsley, give a quick stir, and it's ready to serve over rice!",
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Salmon Sushi Bake",
    slug: "salmon-sushi-bake",
    description: "Baked sushi casserole with salmon and rice.",
    photo: null,
    servings: 6,
    prepTime: 30,
    cookTime: 20,
    tips: [
      "Use sushi-grade salmon for the best flavor and safety.",
      "Don't overcook the salmon - it should still be slightly pink in the center.",
    ],
    createdAt: "2025-03-15T15:43:37.622Z",
    updatedAt: "2025-03-15T15:43:37.622Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "salmon",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "teriyaki sauce",
            amount: "3 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "brown sugar",
            amount: "1 tablespoon",
            preparation: null,
            order: 2,
          },
          {
            name: "salt",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "garlic powder",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "rice",
            amount: "3 cup",
            preparation: null,
            order: 5,
          },
          {
            name: "avocado, cubed",
            amount: "1",
            preparation: null,
            order: 6,
          },
          {
            name: "spicy mayo",
            amount: "3 tablespoon",
            preparation: null,
            order: 7,
          },
          {
            name: "furikake (optional, but adds a lot)",
            amount: "1 tablespoon",
            preparation: null,
            order: 8,
          },
          {
            name: "crispy fried onion bits",
            amount: "2 tablespoon",
            preparation: null,
            order: 9,
          },
          {
            name: "green onions, diced",
            amount: "2 tablespoon",
            preparation: null,
            order: 10,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Remove skin from salmon and cut into cubes.",
            order: 0,
          },
          {
            text: "Combine salmon, teriyaki, and salt in a bowl. Set aside to allow it to marinate for 10-15 minutes.",
            order: 1,
          },
          {
            text: "In a baking dish, add the rice and pat down to create a flat base. Top with the salmon (and sauce!), then spread garlic powder and brown sugar evenly over the top.",
            order: 2,
          },
          {
            text: "Turn on broiler and cook on the top rack for 6-10 minutes, until the salmon is flaky.",
            order: 3,
          },
          {
            text: "Top with avocado, mayo, furikake, fried onions, and green onions.",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    title: "Salmon Sushi Bowls",
    slug: "salmon-sushi-bowls",
    description: "Sushi bowl with salmon, rice, and vegetables.",
    photo: null,
    servings: 4,
    prepTime: 25,
    cookTime: 6,
    tips: [],
    createdAt: "2025-08-02T18:15:06.879Z",
    updatedAt: "2025-08-02T18:15:06.879Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "salmon, cubed",
            amount: "1.5 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "soy sauce",
            amount: "0.25 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "sesame oil",
            amount: "2 tablespoon + 1/2 tbsp ",
            preparation: null,
            order: 2,
          },
          {
            name: "rice vinegar",
            amount: "3 tablespoon + 1 tsp ",
            preparation: null,
            order: 3,
          },
          {
            name: "ginger, minced",
            amount: "1 tablespoon + 1/2 tbsp",
            preparation: null,
            order: 4,
          },
          {
            name: "garlic, minced",
            amount: "6 clove",
            preparation: null,
            order: 5,
          },
          {
            name: "maple syrup",
            amount: "1 teaspoon + 1/2 tsp",
            preparation: null,
            order: 6,
          },
          {
            name: "red pepper flakes",
            amount: "1 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "rice",
            amount: "1 cup",
            preparation: null,
            order: 8,
          },
          {
            name: "avocado, sliced",
            amount: "1",
            preparation: null,
            order: 9,
          },
          {
            name: "green onions, sliced",
            amount: "5",
            preparation: null,
            order: 10,
          },
          {
            name: "seaweed snack chips (or nori)",
            amount: "1 package",
            preparation: null,
            order: 11,
          },
          {
            name: "Sesame seeds",
            amount: "0",
            preparation: null,
            order: 12,
          },
          {
            name: "English cucumber",
            amount: "1 large",
            preparation: null,
            order: 13,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Add rice, water, and 1 tsp rice vinegar to rice maker and cook.",
            order: 0,
          },
          {
            text: "In a medium bowl, mix 3 tbsp soy sauce, 2 tbsp sesame oil, 2 tbsp rice vinegar, 1 tbsp ginger, 4 cloves garlic, 1 tsp maple syrup, and 1/2 tsp pepper flakes. Add the salmon and allow to marinate for about 20 minutes.",
            order: 1,
          },
          {
            text: "In a different medium bowl, mix 2 cloves garlic, 1/2 tbsp ginger, 1 tbsp rice vinegar, 1 tbsp soy sauce, 1/2 tbsp sesame oil, 1/2 tsp maple syrup, and 1/2 tsp red pepper flakes.",
            order: 2,
          },
          {
            text: "Trim the ends of the cucumbers, then cut in half lengthwise. Lay the cut side down and lightly smash the cucumbers. After smashing, slice cucumber and add to the bowl. Mix in 3 green onions and 2 tbsp sesame seeds.",
            order: 3,
          },
          {
            text: "Heat a large skillet over medium-high heat. Add salmon to the skillet (use slotted spoon and leave excess marinade in the bowl) and cook through, about 5-6 minutes.",
            order: 4,
          },
          {
            text: "To serve, add rice and salmon to bowls, then top with cucumber salad, avocado, green onion, seaweed, and sesame seeds.",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    title: "Salsa Criolla",
    slug: "salsa-criolla",
    description: "Peruvian-style salsa with red onions and lime.",
    photo: null,
    servings: 6,
    prepTime: 15,
    cookTime: 0,
    tips: [],
    createdAt: "2023-12-28T14:50:46.532Z",
    updatedAt: "2023-12-28T14:50:46.532Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "red bell pepper",
            amount: "1",
            preparation: null,
            order: 0,
          },
          {
            name: "yellow bell pepper",
            amount: "1",
            preparation: null,
            order: 1,
          },
          {
            name: "onion",
            amount: "1",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic",
            amount: "2 clove",
            preparation: null,
            order: 3,
          },
          {
            name: "red wine vinegar",
            amount: "2 tablespoon",
            preparation: null,
            order: 4,
          },
          {
            name: "oregano",
            amount: "1 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "olive oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 6,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Heat olive oil over medium-high heat in a cast iron skillet.",
            order: 0,
          },
          {
            text: 'Chop peppers and onions into 3/4" pieces. Add garlic, onion, peppers, and oregano to the skillet and cook until soft, about 3-5 minutes.',
            order: 1,
          },
          {
            text: "Add in vinegar and sprinkle with some salt & pepper. Turn heat down to medium and cook for another couple minutes.",
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Sheet Pan Fajitas",
    slug: "sheet-pan-fajitas",
    description: "Easy sheet pan fajitas with chicken and vegetables.",
    photo: null,
    servings: 6,
    prepTime: 15,
    cookTime: 20,
    tips: [
      "Cut all ingredients into similar sizes for even cooking.",
      "Don't overcrowd the pan - use two baking sheets if needed.",
    ],
    createdAt: "2023-12-28T14:53:41.983Z",
    updatedAt: "2023-12-28T14:53:41.983Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chicken breast",
            amount: "2 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "red onion",
            amount: "1",
            preparation: null,
            order: 1,
          },
          {
            name: "red bell pepper",
            amount: "1",
            preparation: null,
            order: 2,
          },
          {
            name: "yellow bell pepper",
            amount: "1",
            preparation: null,
            order: 3,
          },
          {
            name: "green bell pepper",
            amount: "1",
            preparation: null,
            order: 4,
          },
          {
            name: "lime",
            amount: "1",
            preparation: null,
            order: 5,
          },
          {
            name: "olive oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 6,
          },
          {
            name: "chili powder",
            amount: "0.5 tablespoon",
            preparation: null,
            order: 7,
          },
          {
            name: "salt",
            amount: "0.5 tablespoon",
            preparation: null,
            order: 8,
          },
          {
            name: "smoked paprika",
            amount: "0.5 tablespoon",
            preparation: null,
            order: 9,
          },
          {
            name: "ground cumin",
            amount: "0.5 tablespoon",
            preparation: null,
            order: 10,
          },
          {
            name: "onion powder",
            amount: "0.5 tablespoon",
            preparation: null,
            order: 11,
          },
          {
            name: "garlic powder",
            amount: "0.5 tablespoon",
            preparation: null,
            order: 12,
          },
          {
            name: "oregano",
            amount: "0.5 tablespoon",
            preparation: null,
            order: 13,
          },
          {
            name: "pepper",
            amount: "0.25 tablespoon",
            preparation: null,
            order: 14,
          },
          {
            name: "Cilantro to taste",
            amount: "0",
            preparation: null,
            order: 15,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "In a large bowl, create the marinade using all seasonings, olive oil, and lime juice.",
            order: 0,
          },
          {
            text: "Thinly slice the chicken, onion, and bell peppers. Add all to the marinade and let sit for at least an hour in the fridge.",
            order: 1,
          },
          {
            text: "Preheat oven to 375 degrees. Spread the chicken & veggie mixture onto a rimmed baking sheet and cook for 15-20 minutes.",
            order: 2,
          },
          {
            text: "Turn oven to broil to get some char on the veggies, about 3 minutes.",
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Stir Fry Sauce",
    slug: "stir-fry-sauce",
    description: "Versatile stir fry sauce for Asian dishes.",
    photo: null,
    servings: null,
    prepTime: null,
    cookTime: null,
    tips: [],
    createdAt: "2023-12-28T14:54:53.664Z",
    updatedAt: "2023-12-28T14:54:53.664Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "garlic, minced",
            amount: "3 clove",
            preparation: null,
            order: 0,
          },
          {
            name: "ginger",
            amount: "1 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "sesame oil",
            amount: "1 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "rice vinegar",
            amount: "2 tablespoon",
            preparation: null,
            order: 3,
          },
          {
            name: "soy sauce",
            amount: "0.25 cup",
            preparation: null,
            order: 4,
          },
          {
            name: "chicken broth",
            amount: "0.25 cup",
            preparation: null,
            order: 5,
          },
          {
            name: "sriracha",
            amount: "1 tablespoon",
            preparation: null,
            order: 6,
          },
          {
            name: "brown sugar",
            amount: "2 tablespoon",
            preparation: null,
            order: 7,
          },
          {
            name: "cornstarch",
            amount: "1 tablespoon",
            preparation: null,
            order: 8,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Add all ingredients to a medium bowl and whisk together until smooth.",
            order: 0,
          },
        ],
      },
    ],
  },
  {
    title: "Street Corn Chicken Rice Bowls",
    slug: "street-corn-chicken-rice-bowls",
    description: "Mexican street corn-inspired rice bowls with chicken.",
    photo: null,
    servings: null,
    prepTime: null,
    cookTime: null,
    tips: [],
    createdAt: "2025-06-16T15:56:04.972Z",
    updatedAt: "2025-06-16T15:56:04.972Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "chicken breast",
            amount: "1.5 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "apple cider vinegar",
            amount: "1 tablespoon",
            preparation: null,
            order: 1,
          },
          {
            name: "chili powder",
            amount: "2.5 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic powder",
            amount: "1 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "onion powder",
            amount: "1 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "salt",
            amount: "1.25 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "pepper",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "lime juice",
            amount: "4 tablespoon",
            preparation: null,
            order: 7,
          },
          {
            name: "corn",
            amount: "2 cup",
            preparation: null,
            order: 8,
          },
          {
            name: "mayo",
            amount: "0.333 cup",
            preparation: null,
            order: 9,
          },
          {
            name: "cotija cheese, crumbled",
            amount: "0.5 cup",
            preparation: null,
            order: 10,
          },
          {
            name: "cilantro, chopped",
            amount: "2 tablespoon",
            preparation: null,
            order: 11,
          },
          {
            name: "garlic, minced",
            amount: "3 clove",
            preparation: null,
            order: 12,
          },
          {
            name: "paprika",
            amount: "0.25 teaspoon",
            preparation: null,
            order: 13,
          },
          {
            name: "red onion, diced",
            amount: "0.25 cup",
            preparation: null,
            order: 14,
          },
          {
            name: "Rice",
            amount: "0",
            preparation: null,
            order: 15,
          },
          {
            name: "Cherry tomatoes, halved",
            amount: "0",
            preparation: null,
            order: 16,
          },
          {
            name: "Jalapeño, sliced",
            amount: "0",
            preparation: null,
            order: 17,
          },
          {
            name: "Avocado, sliced",
            amount: "0",
            preparation: null,
            order: 18,
          },
          {
            name: "Sour cream",
            amount: "0",
            preparation: null,
            order: 19,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Create marinade by combining vinegar, 2 tsp chili powder, garlic powder, onion powder, 1 tsp salt, 1/4 tsp pepper, and 2 tbsp lime juice. Mix well, add chicken, and let sit for at least an hour.",
            order: 0,
          },
          {
            text: "Grill chicken until cooked through. Cut into slices.",
            order: 1,
          },
          {
            text: "Combine corn, mayo, cotjia cheese, cilantro, 2 tbsp lime juice, garlic, 1/2 tsp chili powder, paprika, 1/4 tsp salt, 1/8 tsp pepper, and red onions into a large bowl. Stir to combine.",
            order: 2,
          },
          {
            text: "Build bowls by adding rice, chicken, and corn mix, along with other toppings as desired!",
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Teriyaki Sauce",
    slug: "teriyaki-sauce",
    description: "Homemade teriyaki sauce for marinades and glazes.",
    photo: null,
    servings: null,
    prepTime: null,
    cookTime: null,
    tips: [],
    createdAt: "2025-03-15T15:20:47.907Z",
    updatedAt: "2025-03-15T15:20:47.907Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "soy sauce",
            amount: "0.75 cup",
            preparation: null,
            order: 0,
          },
          {
            name: "water",
            amount: "0.25 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "mirin",
            amount: "2 tablespoon",
            preparation: null,
            order: 2,
          },
          {
            name: "brown sugar",
            amount: "0.5 cup",
            preparation: null,
            order: 3,
          },
          {
            name: "garlic",
            amount: "4 clove",
            preparation: null,
            order: 4,
          },
          {
            name: "fresh ginger",
            amount: "2 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "Pinch of salt",
            amount: "0",
            preparation: null,
            order: 6,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Add all ingredients to a small saucepan and set over medium heat. Whisk everything together.",
            order: 0,
          },
          {
            text: "Once the mix reaches a simmer, drop heat to low and allow mix to reduce for about 10 minutes.",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    title: "Turkey Meatballs",
    slug: "turkey-meatballs",
    description: "Juicy turkey meatballs with Italian seasoning and parmesan.",
    photo: null,
    servings: null,
    prepTime: null,
    cookTime: null,
    tips: [],
    createdAt: "2023-12-28T14:58:20.882Z",
    updatedAt: "2023-12-28T15:12:00.559Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "ground turkey",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "mozzarella, shredded",
            amount: "0.5 cup",
            preparation: null,
            order: 1,
          },
          {
            name: "egg",
            amount: "1",
            preparation: null,
            order: 2,
          },
          {
            name: "Italian seasoning",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "onion powder",
            amount: "2 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "garlic, minced",
            amount: "6 clove",
            preparation: null,
            order: 5,
          },
          {
            name: "crushed red pepper",
            amount: "1 teaspoon",
            preparation: null,
            order: 6,
          },
          {
            name: "parmesan, shredded",
            amount: "5 tablespoon",
            preparation: null,
            order: 7,
          },
          {
            name: "butter",
            amount: "0.5 stick",
            preparation: null,
            order: 8,
          },
          {
            name: "lemon juice",
            amount: "1 tablespoon",
            preparation: null,
            order: 9,
          },
          {
            name: "rosemary",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 10,
          },
          {
            name: "thyme",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 11,
          },
          {
            name: "sage",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 12,
          },
          {
            name: "pepper",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 13,
          },
          {
            name: "sriracha",
            amount: "1 teaspoon",
            preparation: null,
            order: 14,
          },
          {
            name: "parsley",
            amount: "1 tablespoon",
            preparation: null,
            order: 15,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Preheat oven to 425 degrees.",
            order: 0,
          },
          {
            text: "Combine turkey, mozzarella, egg, Italian seasoning, onion powder, 2 garlic cloves, crushed red peppers, 1 tbsp parmesan, and some salt & pepper in a bowl. Form meatballs.",
            order: 1,
          },
          {
            text: "Heat a cast iron skillet on high. Once hot, sear meatballs on both sides (1-2 minutes per side).",
            order: 2,
          },
          {
            text: "Put seared meatballs on a baking sheet and bake for about 15 minutes.",
            order: 3,
          },
          {
            text: "While baking, create the butter sauce. Melt butter over low heat, then add in the lemon juice, rosemary, thyme, sage, pepper, hot sauce, parsley, and remaining 4 cloves of garlic.",
            order: 4,
          },
          {
            text: "After 15 minutes, take meatballs out from the oven. Drizzle the butter sauce over them and top with parmesan. Bake for another 5 minutes to let the cheese melt.",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    title: "Turkey Potato Skillet",
    slug: "turkey-potato-skillet",
    description: "One-pan turkey and potato skillet with vegetables.",
    photo: null,
    servings: null,
    prepTime: null,
    cookTime: null,
    tips: [],
    createdAt: "2025-01-25T17:16:00.400Z",
    updatedAt: "2025-01-25T17:16:00.400Z",
    ingredientSections: [
      {
        name: "Ingredients",
        order: 0,
        ingredients: [
          {
            name: "ground turkey",
            amount: "1 pound",
            preparation: null,
            order: 0,
          },
          {
            name: "salt",
            amount: "1.5 teaspoon",
            preparation: null,
            order: 1,
          },
          {
            name: "pepper",
            amount: "1 teaspoon",
            preparation: null,
            order: 2,
          },
          {
            name: "garlic powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 3,
          },
          {
            name: "chili powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 4,
          },
          {
            name: "oregano",
            amount: "2.5 teaspoon",
            preparation: null,
            order: 5,
          },
          {
            name: "garlic cloves, minced",
            amount: "3",
            preparation: null,
            order: 6,
          },
          {
            name: "basil",
            amount: "1 teaspoon",
            preparation: null,
            order: 7,
          },
          {
            name: "parsley",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 8,
          },
          {
            name: "onion powder",
            amount: "0.5 teaspoon",
            preparation: null,
            order: 9,
          },
          {
            name: "avocado oil",
            amount: "1 tablespoon",
            preparation: null,
            order: 10,
          },
          {
            name: "potatoes, dice small",
            amount: "1 pound",
            preparation: null,
            order: 11,
          },
          {
            name: "onion, diced",
            amount: "1",
            preparation: null,
            order: 12,
          },
          {
            name: "bell pepper, diced",
            amount: "1",
            preparation: null,
            order: 13,
          },
          {
            name: "tomato sauce",
            amount: "8 ounce",
            preparation: null,
            order: 14,
          },
          {
            name: "water",
            amount: "0.5 cup",
            preparation: null,
            order: 15,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 0,
        instructions: [
          {
            text: "Heat a large skillet on medium high. Once hot, add turkey and cook through. Stir in 1 tsp salt, 1/2 tsp pepper, 1/2 tsp garlic powder, 1/2 tsp chili powder, and 1/2 tsp oregano. Remove from skillet.",
            order: 0,
          },
          {
            text: "Add oil to skillet and heat on medium high. Once hot, add the potatoes, onion, and bell pepper. Cook for 5-10 minutes, until potatoes are browned.",
            order: 1,
          },
          {
            text: "Reduce heat to medium. Add turkey, tomato sauce, water, garlic, and remaining herbs to the skillet. Cover and simmer for about 5 minutes.",
            order: 2,
          },
        ],
      },
    ],
  },
];

async function main() {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw Error(
      `Unable to find user with email ${email}. Create that user before running this script.`
    );
  }

  console.log("Creating recipes from denmandines.com...");

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    await prisma.recipe.create({
      data: {
        title: recipe.title,
        slug: recipe.slug,
        description: recipe.description,
        userId: user.id,
        servings: recipe.servings,
        tips: recipe.tips,
        photo: recipe.photo,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
        ingredientSections: {
          create: recipe.ingredientSections.map((section) => ({
            name: section.name,
            order: section.order,
            ingredients: {
              create: section.ingredients.map((ingredient) => ({
                name: ingredient.name,
                amount: ingredient.amount,
                preparation: ingredient.preparation,
                order: ingredient.order,
              })),
            },
          })),
        },
        instructionSections: {
          create: recipe.instructionSections.map((section) => ({
            name: section.name,
            order: section.order,
            instructions: {
              create: section.instructions.map((instruction) => ({
                text: instruction.text,
                order: instruction.order,
              })),
            },
          })),
        },
      },
    });

    console.log(`Created recipe: ${recipe.title}`);
  }

  console.log(
    `Successfully seeded ${recipes.length} recipes from denmandines.com!`
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
