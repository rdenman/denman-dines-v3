import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const email = "robertkarldenman@gmail.com";

// Real recipes from denmandines.com
const recipes = [
  {
    title: "Air Fryer Chicken Tenders",
    description:
      "Crispy, golden chicken tenders made in the air fryer for a healthier alternative to deep frying.",
    servings: 4,
    prepTime: 15,
    cookTime: 12,
    tips: [
      "For extra crispy tenders, spray with cooking oil before air frying",
      "Don't overcrowd the air fryer basket for best results",
      "Serve with your favorite dipping sauce",
    ],
    ingredientSections: [
      {
        name: "Main Ingredients",
        order: 1,
        ingredients: [
          { name: "Chicken tenders", amount: "1 pound", order: 1 },
          { name: "All-purpose flour", amount: "1/2 cup", order: 2 },
          { name: "Eggs", amount: "2", preparation: "beaten", order: 3 },
          { name: "Panko breadcrumbs", amount: "1 cup", order: 4 },
          { name: "Salt", amount: "1 teaspoon", order: 5 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 6 },
          { name: "Garlic powder", amount: "1/2 teaspoon", order: 7 },
          { name: "Paprika", amount: "1/2 teaspoon", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          { text: "Preheat air fryer to 400°F for 5 minutes.", order: 1 },
          {
            text: "Season chicken tenders with salt, pepper, garlic powder, and paprika.",
            order: 2,
          },
          {
            text: "Set up breading station: flour in one bowl, beaten eggs in another, panko breadcrumbs in third.",
            order: 3,
          },
          {
            text: "Dredge each tender in flour, then egg, then panko breadcrumbs.",
            order: 4,
          },
          {
            text: "Place breaded tenders in air fryer basket in single layer.",
            order: 5,
          },
          {
            text: "Cook for 6 minutes, flip, and cook additional 6 minutes until golden and crispy.",
            order: 6,
          },
          { text: "Serve hot with your favorite dipping sauce.", order: 7 },
        ],
      },
    ],
  },
  {
    title: "Argentinian Steak",
    description:
      "Authentic Argentinian-style grilled steak with chimichurri sauce, perfect for a special dinner.",
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    tips: [
      "Let steak come to room temperature before grilling",
      "Don't move the steak too much while grilling for perfect sear marks",
      "Rest the steak for 5-10 minutes before slicing",
    ],
    ingredientSections: [
      {
        name: "Steak",
        order: 1,
        ingredients: [
          {
            name: "Ribeye steaks",
            amount: "4",
            preparation: "1 inch thick",
            order: 1,
          },
          { name: "Olive oil", amount: "2 tablespoons", order: 2 },
          { name: "Kosher salt", amount: "2 tablespoons", order: 3 },
          {
            name: "Black pepper",
            amount: "1 tablespoon",
            preparation: "freshly ground",
            order: 4,
          },
        ],
      },
      {
        name: "Chimichurri Sauce",
        order: 2,
        ingredients: [
          {
            name: "Fresh parsley",
            amount: "1 cup",
            preparation: "finely chopped",
            order: 1,
          },
          {
            name: "Fresh cilantro",
            amount: "1/2 cup",
            preparation: "finely chopped",
            order: 2,
          },
          {
            name: "Garlic",
            amount: "4 cloves",
            preparation: "minced",
            order: 3,
          },
          { name: "Red wine vinegar", amount: "1/4 cup", order: 4 },
          { name: "Olive oil", amount: "1/2 cup", order: 5 },
          { name: "Red pepper flakes", amount: "1/2 teaspoon", order: 6 },
          { name: "Salt", amount: "1/2 teaspoon", order: 7 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Let steaks come to room temperature for 30 minutes before grilling.",
            order: 1,
          },
          {
            text: "Make chimichurri: combine all ingredients in a bowl and let sit for 30 minutes.",
            order: 2,
          },
          { text: "Preheat grill to high heat (450-500°F).", order: 3 },
          {
            text: "Pat steaks dry and season generously with salt and pepper.",
            order: 4,
          },
          {
            text: "Grill steaks for 4-5 minutes per side for medium-rare.",
            order: 5,
          },
          {
            text: "Let steaks rest for 5-10 minutes before slicing.",
            order: 6,
          },
          { text: "Serve with chimichurri sauce on the side.", order: 7 },
        ],
      },
    ],
  },
  {
    title: "Avocado Chimichurri",
    description:
      "Creamy avocado chimichurri sauce perfect for grilled meats, fish, or as a dip.",
    servings: 6,
    prepTime: 10,
    cookTime: 0,
    tips: [
      "Use ripe avocados for the best texture",
      "Add more lime juice if you prefer a tangier sauce",
      "Store in refrigerator for up to 2 days",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Ripe avocados",
            amount: "2",
            preparation: "peeled and pitted",
            order: 1,
          },
          {
            name: "Fresh parsley",
            amount: "1/2 cup",
            preparation: "finely chopped",
            order: 2,
          },
          {
            name: "Fresh cilantro",
            amount: "1/4 cup",
            preparation: "finely chopped",
            order: 3,
          },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 4,
          },
          { name: "Lime juice", amount: "2 tablespoons", order: 5 },
          { name: "Olive oil", amount: "1/4 cup", order: 6 },
          { name: "Red wine vinegar", amount: "1 tablespoon", order: 7 },
          { name: "Salt", amount: "1/2 teaspoon", order: 8 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 9 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a food processor, combine avocados, parsley, cilantro, and garlic.",
            order: 1,
          },
          {
            text: "Pulse until well combined but still slightly chunky.",
            order: 2,
          },
          {
            text: "Add lime juice, olive oil, and vinegar. Pulse to combine.",
            order: 3,
          },
          { text: "Season with salt and pepper to taste.", order: 4 },
          {
            text: "Serve immediately or refrigerate for up to 2 days.",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    title: "Baked Salmon",
    description:
      "Simple and delicious baked salmon with herbs and lemon, perfect for a healthy weeknight dinner.",
    servings: 4,
    prepTime: 10,
    cookTime: 20,
    tips: [
      "Don't overcook salmon - it should be slightly pink in the center",
      "Use fresh herbs for the best flavor",
      "Serve with roasted vegetables for a complete meal",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Salmon fillets",
            amount: "4",
            preparation: "6-8 oz each",
            order: 1,
          },
          { name: "Olive oil", amount: "2 tablespoons", order: 2 },
          { name: "Lemon", amount: "1", preparation: "sliced", order: 3 },
          {
            name: "Fresh dill",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 4,
          },
          {
            name: "Fresh parsley",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 5,
          },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 6,
          },
          { name: "Salt", amount: "1 teaspoon", order: 7 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 400°F and line a baking sheet with parchment paper.",
            order: 1,
          },
          { text: "Place salmon fillets on prepared baking sheet.", order: 2 },
          {
            text: "Drizzle with olive oil and season with salt and pepper.",
            order: 3,
          },
          { text: "Sprinkle minced garlic and herbs over salmon.", order: 4 },
          { text: "Place lemon slices on top of salmon.", order: 5 },
          {
            text: "Bake for 15-20 minutes until salmon flakes easily with a fork.",
            order: 6,
          },
          { text: "Serve hot with additional lemon wedges.", order: 7 },
        ],
      },
    ],
  },
  {
    title: "Balsamic Chicken & Veggies",
    description:
      "One-pan balsamic chicken with roasted vegetables, a healthy and flavorful dinner.",
    servings: 4,
    prepTime: 15,
    cookTime: 25,
    tips: [
      "Cut vegetables in similar sizes for even cooking",
      "Don't overcrowd the pan for better browning",
      "Use good quality balsamic vinegar for best flavor",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Chicken breasts",
            amount: "4",
            preparation: "cut into 1-inch pieces",
            order: 1,
          },
          {
            name: "Broccoli",
            amount: "1 head",
            preparation: "cut into florets",
            order: 2,
          },
          {
            name: "Bell peppers",
            amount: "2",
            preparation: "sliced",
            order: 3,
          },
          { name: "Cherry tomatoes", amount: "1 cup", order: 4 },
          { name: "Balsamic vinegar", amount: "1/4 cup", order: 5 },
          { name: "Olive oil", amount: "3 tablespoons", order: 6 },
          {
            name: "Garlic",
            amount: "4 cloves",
            preparation: "minced",
            order: 7,
          },
          { name: "Italian seasoning", amount: "1 tablespoon", order: 8 },
          { name: "Salt", amount: "1 teaspoon", order: 9 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 10 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 425°F and line a large baking sheet with parchment paper.",
            order: 1,
          },
          {
            text: "In a large bowl, combine balsamic vinegar, olive oil, garlic, and seasonings.",
            order: 2,
          },
          { text: "Add chicken pieces and toss to coat evenly.", order: 3 },
          {
            text: "Add vegetables to the bowl and toss with remaining marinade.",
            order: 4,
          },
          {
            text: "Spread chicken and vegetables in a single layer on baking sheet.",
            order: 5,
          },
          {
            text: "Bake for 20-25 minutes, stirring halfway through cooking time.",
            order: 6,
          },
          {
            text: "Serve hot with additional balsamic drizzle if desired.",
            order: 7,
          },
        ],
      },
    ],
  },
  {
    title: "Blackened Shrimp Bowls",
    description:
      "Spicy blackened shrimp served over rice with fresh vegetables and creamy sauce.",
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    tips: [
      "Don't overcook shrimp - they cook quickly",
      "Use a well-seasoned cast iron skillet for best blackening",
      "Prepare all ingredients before starting to cook",
    ],
    ingredientSections: [
      {
        name: "Shrimp",
        order: 1,
        ingredients: [
          {
            name: "Large shrimp",
            amount: "1 pound",
            preparation: "peeled and deveined",
            order: 1,
          },
          { name: "Blackening seasoning", amount: "2 tablespoons", order: 2 },
          { name: "Butter", amount: "2 tablespoons", order: 3 },
          { name: "Olive oil", amount: "1 tablespoon", order: 4 },
        ],
      },
      {
        name: "Bowl Components",
        order: 2,
        ingredients: [
          {
            name: "White rice",
            amount: "2 cups",
            preparation: "cooked",
            order: 1,
          },
          { name: "Avocado", amount: "1", preparation: "sliced", order: 2 },
          {
            name: "Cherry tomatoes",
            amount: "1 cup",
            preparation: "halved",
            order: 3,
          },
          { name: "Cucumber", amount: "1", preparation: "diced", order: 4 },
          {
            name: "Red onion",
            amount: "1/4 cup",
            preparation: "thinly sliced",
            order: 5,
          },
          {
            name: "Lime",
            amount: "1",
            preparation: "cut into wedges",
            order: 6,
          },
        ],
      },
      {
        name: "Creamy Sauce",
        order: 3,
        ingredients: [
          { name: "Sour cream", amount: "1/2 cup", order: 1 },
          { name: "Lime juice", amount: "2 tablespoons", order: 2 },
          { name: "Hot sauce", amount: "1 tablespoon", order: 3 },
          { name: "Salt", amount: "1/4 teaspoon", order: 4 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Cook rice according to package directions and set aside.",
            order: 1,
          },
          {
            text: "Make creamy sauce by combining sour cream, lime juice, hot sauce, and salt.",
            order: 2,
          },
          {
            text: "Heat butter and oil in a large skillet over high heat.",
            order: 3,
          },
          {
            text: "Toss shrimp with blackening seasoning until well coated.",
            order: 4,
          },
          {
            text: "Add shrimp to hot skillet and cook 2-3 minutes per side until blackened.",
            order: 5,
          },
          {
            text: "Assemble bowls: rice, shrimp, vegetables, and drizzle with creamy sauce.",
            order: 6,
          },
          { text: "Serve with lime wedges on the side.", order: 7 },
        ],
      },
    ],
  },
  {
    title: "Buffalo Chicken Alfredo Pasta",
    description:
      "Creamy alfredo pasta with spicy buffalo chicken, the perfect comfort food with a kick.",
    servings: 6,
    prepTime: 15,
    cookTime: 20,
    tips: [
      "Reserve pasta water to adjust sauce consistency",
      "Use freshly grated parmesan for best flavor",
      "Adjust buffalo sauce amount to your spice preference",
    ],
    ingredientSections: [
      {
        name: "Pasta",
        order: 1,
        ingredients: [
          { name: "Fettuccine", amount: "1 pound", order: 1 },
          { name: "Salt", amount: "1 tablespoon", order: 2 },
        ],
      },
      {
        name: "Chicken",
        order: 2,
        ingredients: [
          {
            name: "Chicken breasts",
            amount: "2",
            preparation: "cut into 1-inch pieces",
            order: 1,
          },
          { name: "Olive oil", amount: "2 tablespoons", order: 2 },
          { name: "Salt", amount: "1 teaspoon", order: 3 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 4 },
        ],
      },
      {
        name: "Alfredo Sauce",
        order: 3,
        ingredients: [
          { name: "Butter", amount: "1/2 cup", order: 1 },
          { name: "Heavy cream", amount: "2 cups", order: 2 },
          {
            name: "Parmesan cheese",
            amount: "1 cup",
            preparation: "freshly grated",
            order: 3,
          },
          { name: "Buffalo sauce", amount: "1/2 cup", order: 4 },
          {
            name: "Garlic",
            amount: "4 cloves",
            preparation: "minced",
            order: 5,
          },
          { name: "Salt", amount: "1/2 teaspoon", order: 6 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 7 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Bring large pot of salted water to boil and cook fettuccine according to package directions.",
            order: 1,
          },
          {
            text: "While pasta cooks, heat oil in large skillet over medium-high heat.",
            order: 2,
          },
          {
            text: "Season chicken with salt and pepper, then cook until golden and cooked through.",
            order: 3,
          },
          { text: "Remove chicken from skillet and set aside.", order: 4 },
          {
            text: "In same skillet, melt butter and sauté garlic until fragrant.",
            order: 5,
          },
          {
            text: "Add heavy cream and bring to simmer, then stir in parmesan until melted.",
            order: 6,
          },
          { text: "Add buffalo sauce and stir to combine.", order: 7 },
          {
            text: "Return chicken to skillet and toss with cooked pasta.",
            order: 8,
          },
          { text: "Serve hot with additional parmesan if desired.", order: 9 },
        ],
      },
    ],
  },
  {
    title: "Buffalo Chicken Dip",
    description:
      "Creamy, spicy buffalo chicken dip perfect for parties and game day gatherings.",
    servings: 8,
    prepTime: 10,
    cookTime: 25,
    tips: [
      "Use rotisserie chicken for quick prep",
      "Serve with celery sticks, crackers, or tortilla chips",
      "Can be made ahead and reheated",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Cream cheese",
            amount: "8 ounces",
            preparation: "softened",
            order: 1,
          },
          {
            name: "Chicken",
            amount: "2 cups",
            preparation: "cooked and shredded",
            order: 2,
          },
          { name: "Buffalo sauce", amount: "1/2 cup", order: 3 },
          { name: "Ranch dressing", amount: "1/2 cup", order: 4 },
          {
            name: "Cheddar cheese",
            amount: "1 cup",
            preparation: "shredded",
            order: 5,
          },
          {
            name: "Blue cheese",
            amount: "1/2 cup",
            preparation: "crumbled",
            order: 6,
          },
          {
            name: "Green onions",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 7,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 350°F and grease a 9x13 baking dish.",
            order: 1,
          },
          {
            text: "In a large bowl, beat cream cheese until smooth.",
            order: 2,
          },
          {
            text: "Add buffalo sauce and ranch dressing, mix until combined.",
            order: 3,
          },
          {
            text: "Stir in shredded chicken, cheddar cheese, and blue cheese.",
            order: 4,
          },
          {
            text: "Transfer mixture to prepared baking dish and spread evenly.",
            order: 5,
          },
          { text: "Bake for 20-25 minutes until hot and bubbly.", order: 6 },
          {
            text: "Garnish with green onions and serve hot with dippers.",
            order: 7,
          },
        ],
      },
    ],
  },
  {
    title: "Buffalo Mac & Cheese",
    description:
      "Creamy mac and cheese with a spicy buffalo kick, perfect comfort food with heat.",
    servings: 6,
    prepTime: 15,
    cookTime: 20,
    tips: [
      "Use a good melting cheese like cheddar or gruyere",
      "Reserve pasta water to adjust sauce consistency",
      "Add more buffalo sauce if you like it spicier",
    ],
    ingredientSections: [
      {
        name: "Pasta",
        order: 1,
        ingredients: [
          { name: "Elbow macaroni", amount: "1 pound", order: 1 },
          { name: "Salt", amount: "1 tablespoon", order: 2 },
        ],
      },
      {
        name: "Cheese Sauce",
        order: 2,
        ingredients: [
          { name: "Butter", amount: "1/2 cup", order: 1 },
          { name: "All-purpose flour", amount: "1/4 cup", order: 2 },
          { name: "Milk", amount: "3 cups", order: 3 },
          {
            name: "Cheddar cheese",
            amount: "2 cups",
            preparation: "shredded",
            order: 4,
          },
          { name: "Buffalo sauce", amount: "1/3 cup", order: 5 },
          { name: "Salt", amount: "1 teaspoon", order: 6 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 7 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Bring large pot of salted water to boil and cook macaroni according to package directions.",
            order: 1,
          },
          {
            text: "While pasta cooks, melt butter in large saucepan over medium heat.",
            order: 2,
          },
          {
            text: "Whisk in flour and cook for 1 minute to make roux.",
            order: 3,
          },
          {
            text: "Gradually whisk in milk and bring to simmer, stirring constantly.",
            order: 4,
          },
          { text: "Add cheese and stir until melted and smooth.", order: 5 },
          { text: "Stir in buffalo sauce, salt, and pepper.", order: 6 },
          {
            text: "Drain pasta and return to pot. Pour cheese sauce over pasta and stir to combine.",
            order: 7,
          },
          {
            text: "Serve hot with additional buffalo sauce on the side if desired.",
            order: 8,
          },
        ],
      },
    ],
  },
  {
    title: "Cheeseburger Sliders",
    description:
      "Mini cheeseburger sliders perfect for parties, game day, or family dinner.",
    servings: 8,
    prepTime: 20,
    cookTime: 25,
    tips: [
      "Use Hawaiian rolls for a sweet contrast to the savory filling",
      "Don't overstuff the sliders or they won't close properly",
      "Brush with butter and sprinkle with sesame seeds for extra flavor",
    ],
    ingredientSections: [
      {
        name: "Sliders",
        order: 1,
        ingredients: [
          { name: "Hawaiian rolls", amount: "12", order: 1 },
          { name: "Ground beef", amount: "1 pound", order: 2 },
          { name: "American cheese", amount: "6 slices", order: 3 },
          {
            name: "Onion",
            amount: "1",
            preparation: "thinly sliced",
            order: 4,
          },
          {
            name: "Pickles",
            amount: "1/2 cup",
            preparation: "sliced",
            order: 5,
          },
          { name: "Ketchup", amount: "1/4 cup", order: 6 },
          { name: "Mustard", amount: "2 tablespoons", order: 7 },
          { name: "Salt", amount: "1 teaspoon", order: 8 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 9 },
        ],
      },
      {
        name: "Topping",
        order: 2,
        ingredients: [
          {
            name: "Butter",
            amount: "3 tablespoons",
            preparation: "melted",
            order: 1,
          },
          { name: "Sesame seeds", amount: "1 tablespoon", order: 2 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 350°F and line a 9x13 baking dish with foil.",
            order: 1,
          },
          {
            text: "Form ground beef into 6 thin patties and season with salt and pepper.",
            order: 2,
          },
          {
            text: "Cook patties in skillet over medium heat until cooked through.",
            order: 3,
          },
          {
            text: "Place bottom half of rolls in baking dish and layer with cheese, beef patties, onions, and pickles.",
            order: 4,
          },
          {
            text: "Spread ketchup and mustard on top half of rolls and place on top.",
            order: 5,
          },
          {
            text: "Brush melted butter over tops and sprinkle with sesame seeds.",
            order: 6,
          },
          {
            text: "Cover with foil and bake for 15 minutes, then uncover and bake 5 more minutes.",
            order: 7,
          },
          { text: "Cut into individual sliders and serve hot.", order: 8 },
        ],
      },
    ],
  },
  {
    title: "Chicken Enchilada Rice Bowls",
    description:
      "Mexican-inspired rice bowls with tender chicken, black beans, and fresh toppings.",
    servings: 4,
    prepTime: 20,
    cookTime: 25,
    tips: [
      "Use leftover chicken or rotisserie chicken for quick prep",
      "Make extra rice for meal prep throughout the week",
      "Customize toppings based on your preferences",
    ],
    ingredientSections: [
      {
        name: "Rice",
        order: 1,
        ingredients: [
          {
            name: "White rice",
            amount: "2 cups",
            preparation: "cooked",
            order: 1,
          },
          { name: "Enchilada sauce", amount: "1/2 cup", order: 2 },
          { name: "Cumin", amount: "1 teaspoon", order: 3 },
          { name: "Chili powder", amount: "1 teaspoon", order: 4 },
        ],
      },
      {
        name: "Chicken",
        order: 2,
        ingredients: [
          {
            name: "Chicken breasts",
            amount: "2",
            preparation: "cooked and shredded",
            order: 1,
          },
          { name: "Enchilada sauce", amount: "1/2 cup", order: 2 },
          { name: "Cumin", amount: "1/2 teaspoon", order: 3 },
          { name: "Chili powder", amount: "1/2 teaspoon", order: 4 },
        ],
      },
      {
        name: "Toppings",
        order: 3,
        ingredients: [
          {
            name: "Black beans",
            amount: "1 can",
            preparation: "drained and rinsed",
            order: 1,
          },
          { name: "Corn", amount: "1 cup", preparation: "cooked", order: 2 },
          { name: "Avocado", amount: "1", preparation: "sliced", order: 3 },
          {
            name: "Cherry tomatoes",
            amount: "1 cup",
            preparation: "halved",
            order: 4,
          },
          {
            name: "Cheddar cheese",
            amount: "1 cup",
            preparation: "shredded",
            order: 5,
          },
          { name: "Sour cream", amount: "1/2 cup", order: 6 },
          {
            name: "Cilantro",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 7,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          { text: "Cook rice according to package directions.", order: 1 },
          {
            text: "In a large skillet, combine cooked rice with enchilada sauce and seasonings.",
            order: 2,
          },
          {
            text: "Cook over medium heat for 5 minutes until flavors combine.",
            order: 3,
          },
          {
            text: "In another skillet, combine shredded chicken with enchilada sauce and seasonings.",
            order: 4,
          },
          {
            text: "Heat chicken mixture for 5 minutes until warmed through.",
            order: 5,
          },
          {
            text: "Assemble bowls: rice, chicken, beans, corn, and desired toppings.",
            order: 6,
          },
          { text: "Garnish with cilantro and serve hot.", order: 7 },
        ],
      },
    ],
  },
  {
    title: "Chicken Fried Rice",
    description:
      "Classic Chinese takeout-style fried rice with tender chicken and vegetables.",
    servings: 4,
    prepTime: 15,
    cookTime: 10,
    tips: [
      "Use day-old rice for best results",
      "Have all ingredients prepped before starting",
      "Cook over high heat for authentic restaurant taste",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Cooked white rice",
            amount: "4 cups",
            preparation: "day-old, chilled",
            order: 1,
          },
          {
            name: "Chicken breast",
            amount: "1 pound",
            preparation: "cut into small pieces",
            order: 2,
          },
          { name: "Eggs", amount: "3", preparation: "beaten", order: 3 },
          { name: "Carrots", amount: "2", preparation: "diced", order: 4 },
          { name: "Peas", amount: "1 cup", preparation: "frozen", order: 5 },
          {
            name: "Green onions",
            amount: "4",
            preparation: "chopped",
            order: 6,
          },
          { name: "Soy sauce", amount: "3 tablespoons", order: 7 },
          { name: "Sesame oil", amount: "1 tablespoon", order: 8 },
          { name: "Vegetable oil", amount: "2 tablespoons", order: 9 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 10,
          },
          {
            name: "Ginger",
            amount: "1 tablespoon",
            preparation: "minced",
            order: 11,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Heat vegetable oil in a large wok or skillet over high heat.",
            order: 1,
          },
          {
            text: "Add chicken and cook until golden and cooked through, about 5 minutes.",
            order: 2,
          },
          {
            text: "Push chicken to one side and add beaten eggs to empty space.",
            order: 3,
          },
          {
            text: "Scramble eggs until just set, then mix with chicken.",
            order: 4,
          },
          { text: "Add carrots and peas, stir-fry for 2 minutes.", order: 5 },
          { text: "Add rice, breaking up any clumps with spatula.", order: 6 },
          { text: "Add soy sauce, sesame oil, garlic, and ginger.", order: 7 },
          {
            text: "Stir-fry for 3-4 minutes until rice is heated through.",
            order: 8,
          },
          { text: "Add green onions and serve hot.", order: 9 },
        ],
      },
    ],
  },
  {
    title: "Chicken Larb Bowls",
    description:
      "Thai-inspired ground chicken salad with fresh herbs and lime dressing.",
    servings: 4,
    prepTime: 20,
    cookTime: 10,
    tips: [
      "Use fresh herbs for authentic flavor",
      "Adjust fish sauce and lime to taste",
      "Serve with sticky rice for traditional presentation",
    ],
    ingredientSections: [
      {
        name: "Chicken",
        order: 1,
        ingredients: [
          { name: "Ground chicken", amount: "1 pound", order: 1 },
          {
            name: "Shallots",
            amount: "2",
            preparation: "thinly sliced",
            order: 2,
          },
          { name: "Fish sauce", amount: "2 tablespoons", order: 3 },
          { name: "Lime juice", amount: "2 tablespoons", order: 4 },
          { name: "Chili powder", amount: "1 teaspoon", order: 5 },
        ],
      },
      {
        name: "Dressing",
        order: 2,
        ingredients: [
          { name: "Lime juice", amount: "3 tablespoons", order: 1 },
          { name: "Fish sauce", amount: "1 tablespoon", order: 2 },
          { name: "Brown sugar", amount: "1 teaspoon", order: 3 },
          { name: "Red chili", amount: "1", preparation: "minced", order: 4 },
        ],
      },
      {
        name: "Toppings",
        order: 3,
        ingredients: [
          {
            name: "Fresh mint",
            amount: "1/2 cup",
            preparation: "chopped",
            order: 1,
          },
          {
            name: "Fresh cilantro",
            amount: "1/2 cup",
            preparation: "chopped",
            order: 2,
          },
          {
            name: "Green onions",
            amount: "4",
            preparation: "chopped",
            order: 3,
          },
          { name: "Cucumber", amount: "1", preparation: "sliced", order: 4 },
          {
            name: "Lettuce leaves",
            amount: "1 head",
            preparation: "for serving",
            order: 5,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Heat oil in a large skillet over medium-high heat.",
            order: 1,
          },
          {
            text: "Add ground chicken and cook, breaking up with spatula.",
            order: 2,
          },
          {
            text: "Add shallots and cook until chicken is browned and cooked through.",
            order: 3,
          },
          {
            text: "Stir in fish sauce, lime juice, and chili powder.",
            order: 4,
          },
          { text: "Remove from heat and let cool slightly.", order: 5 },
          {
            text: "Make dressing by combining lime juice, fish sauce, sugar, and chili.",
            order: 6,
          },
          { text: "Toss chicken with fresh herbs and green onions.", order: 7 },
          {
            text: "Serve in lettuce cups with cucumber and dressing on the side.",
            order: 8,
          },
        ],
      },
    ],
  },
  {
    title: "Chimichurri Rice",
    description:
      "Flavorful rice dish with fresh chimichurri sauce, perfect as a side or main dish.",
    servings: 6,
    prepTime: 10,
    cookTime: 20,
    tips: [
      "Use fresh herbs for the best flavor",
      "Let chimichurri sit for 30 minutes before mixing with rice",
      "Serve with grilled meats for a complete meal",
    ],
    ingredientSections: [
      {
        name: "Rice",
        order: 1,
        ingredients: [
          {
            name: "White rice",
            amount: "2 cups",
            preparation: "uncooked",
            order: 1,
          },
          { name: "Chicken broth", amount: "4 cups", order: 2 },
          { name: "Olive oil", amount: "2 tablespoons", order: 3 },
          { name: "Salt", amount: "1 teaspoon", order: 4 },
        ],
      },
      {
        name: "Chimichurri",
        order: 2,
        ingredients: [
          {
            name: "Fresh parsley",
            amount: "1 cup",
            preparation: "finely chopped",
            order: 1,
          },
          {
            name: "Fresh cilantro",
            amount: "1/2 cup",
            preparation: "finely chopped",
            order: 2,
          },
          {
            name: "Garlic",
            amount: "4 cloves",
            preparation: "minced",
            order: 3,
          },
          { name: "Red wine vinegar", amount: "1/4 cup", order: 4 },
          { name: "Olive oil", amount: "1/2 cup", order: 5 },
          { name: "Red pepper flakes", amount: "1/2 teaspoon", order: 6 },
          { name: "Salt", amount: "1/2 teaspoon", order: 7 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          { text: "Rinse rice until water runs clear, then drain.", order: 1 },
          {
            text: "In a large pot, heat olive oil over medium heat.",
            order: 2,
          },
          {
            text: "Add rice and stir for 1 minute until lightly toasted.",
            order: 3,
          },
          { text: "Add chicken broth and salt, bring to boil.", order: 4 },
          {
            text: "Reduce heat to low, cover, and simmer for 18 minutes.",
            order: 5,
          },
          {
            text: "Make chimichurri by combining all ingredients in a bowl.",
            order: 6,
          },
          {
            text: "Let chimichurri sit for 30 minutes to develop flavors.",
            order: 7,
          },
          {
            text: "Fluff rice with fork and gently fold in chimichurri.",
            order: 8,
          },
          { text: "Serve warm or at room temperature.", order: 9 },
        ],
      },
    ],
  },
  {
    title: "Cilantro Feta Stuffed Peppers",
    description:
      "Colorful bell peppers stuffed with a flavorful mixture of rice, feta, and fresh herbs.",
    servings: 6,
    prepTime: 20,
    cookTime: 30,
    tips: [
      "Choose peppers that can stand upright for best presentation",
      "Pre-cook the rice to save time",
      "Serve with a fresh green salad for a complete meal",
    ],
    ingredientSections: [
      {
        name: "Peppers",
        order: 1,
        ingredients: [
          {
            name: "Bell peppers",
            amount: "6",
            preparation: "tops cut off, seeded",
            order: 1,
          },
          { name: "Olive oil", amount: "2 tablespoons", order: 2 },
          { name: "Salt", amount: "1/2 teaspoon", order: 3 },
        ],
      },
      {
        name: "Filling",
        order: 2,
        ingredients: [
          { name: "Cooked rice", amount: "2 cups", order: 1 },
          {
            name: "Feta cheese",
            amount: "1 cup",
            preparation: "crumbled",
            order: 2,
          },
          {
            name: "Fresh cilantro",
            amount: "1/2 cup",
            preparation: "chopped",
            order: 3,
          },
          {
            name: "Green onions",
            amount: "4",
            preparation: "chopped",
            order: 4,
          },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 5,
          },
          { name: "Lemon juice", amount: "2 tablespoons", order: 6 },
          { name: "Olive oil", amount: "1/4 cup", order: 7 },
          { name: "Salt", amount: "1 teaspoon", order: 8 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 9 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 375°F and grease a 9x13 baking dish.",
            order: 1,
          },
          {
            text: "Cook rice according to package directions and let cool.",
            order: 2,
          },
          {
            text: "In a large bowl, combine rice, feta, cilantro, green onions, and garlic.",
            order: 3,
          },
          {
            text: "Stir in lemon juice, olive oil, salt, and pepper.",
            order: 4,
          },
          {
            text: "Brush peppers with olive oil and season with salt.",
            order: 5,
          },
          {
            text: "Fill each pepper with rice mixture, packing gently.",
            order: 6,
          },
          {
            text: "Place peppers in prepared baking dish and cover with foil.",
            order: 7,
          },
          {
            text: "Bake for 25-30 minutes until peppers are tender.",
            order: 8,
          },
          {
            text: "Serve hot with additional feta on top if desired.",
            order: 9,
          },
        ],
      },
    ],
  },
  {
    title: "Cilantro Lime Chicken",
    description:
      "Zesty grilled chicken marinated in fresh cilantro, lime, and garlic.",
    servings: 4,
    prepTime: 15,
    cookTime: 15,
    tips: [
      "Marinate chicken for at least 2 hours for best flavor",
      "Don't overcook chicken to keep it juicy",
      "Serve with rice and beans for a complete meal",
    ],
    ingredientSections: [
      {
        name: "Marinade",
        order: 1,
        ingredients: [
          {
            name: "Fresh cilantro",
            amount: "1 cup",
            preparation: "chopped",
            order: 1,
          },
          { name: "Lime juice", amount: "1/4 cup", order: 2 },
          { name: "Lime zest", amount: "2 tablespoons", order: 3 },
          {
            name: "Garlic",
            amount: "4 cloves",
            preparation: "minced",
            order: 4,
          },
          { name: "Olive oil", amount: "1/3 cup", order: 5 },
          { name: "Cumin", amount: "1 teaspoon", order: 6 },
          { name: "Salt", amount: "1 teaspoon", order: 7 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 8 },
        ],
      },
      {
        name: "Chicken",
        order: 2,
        ingredients: [
          {
            name: "Chicken breasts",
            amount: "4",
            preparation: "6-8 oz each",
            order: 1,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a blender, combine all marinade ingredients until smooth.",
            order: 1,
          },
          {
            text: "Place chicken in a large resealable bag and pour marinade over.",
            order: 2,
          },
          {
            text: "Seal bag and refrigerate for at least 2 hours, up to overnight.",
            order: 3,
          },
          { text: "Preheat grill to medium-high heat.", order: 4 },
          {
            text: "Remove chicken from marinade and discard marinade.",
            order: 5,
          },
          {
            text: "Grill chicken for 6-8 minutes per side until cooked through.",
            order: 6,
          },
          { text: "Let rest for 5 minutes before slicing.", order: 7 },
          { text: "Serve with additional lime wedges and cilantro.", order: 8 },
        ],
      },
    ],
  },
  {
    title: "Cilantro Lime Dressing",
    description:
      "Fresh and tangy dressing perfect for salads, tacos, or as a marinade.",
    servings: 8,
    prepTime: 10,
    cookTime: 0,
    tips: [
      "Use fresh cilantro for the best flavor",
      "Adjust lime juice to your taste preference",
      "Store in refrigerator for up to 1 week",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Fresh cilantro",
            amount: "1 cup",
            preparation: "packed",
            order: 1,
          },
          { name: "Lime juice", amount: "1/4 cup", order: 2 },
          { name: "Olive oil", amount: "1/2 cup", order: 3 },
          {
            name: "Garlic",
            amount: "2 cloves",
            preparation: "minced",
            order: 4,
          },
          { name: "Honey", amount: "1 tablespoon", order: 5 },
          { name: "Salt", amount: "1/2 teaspoon", order: 6 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 7 },
          { name: "Cumin", amount: "1/4 teaspoon", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a food processor, combine cilantro, lime juice, and garlic.",
            order: 1,
          },
          { text: "Pulse until cilantro is finely chopped.", order: 2 },
          {
            text: "With processor running, slowly drizzle in olive oil.",
            order: 3,
          },
          { text: "Add honey, salt, pepper, and cumin.", order: 4 },
          { text: "Process until smooth and well combined.", order: 5 },
          { text: "Taste and adjust seasoning as needed.", order: 6 },
          {
            text: "Transfer to a jar and refrigerate until ready to use.",
            order: 7,
          },
        ],
      },
    ],
  },
  {
    title: "Corn Salsa",
    description:
      "Fresh and vibrant corn salsa perfect for tacos, chips, or as a side dish.",
    servings: 6,
    prepTime: 15,
    cookTime: 0,
    tips: [
      "Use fresh corn when in season for best flavor",
      "Let salsa sit for 30 minutes to develop flavors",
      "Adjust jalapeño amount based on your spice preference",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Corn kernels",
            amount: "2 cups",
            preparation: "fresh or frozen, thawed",
            order: 1,
          },
          {
            name: "Red onion",
            amount: "1/2 cup",
            preparation: "finely diced",
            order: 2,
          },
          {
            name: "Jalapeño",
            amount: "1",
            preparation: "seeded and minced",
            order: 3,
          },
          {
            name: "Fresh cilantro",
            amount: "1/2 cup",
            preparation: "chopped",
            order: 4,
          },
          { name: "Lime juice", amount: "2 tablespoons", order: 5 },
          { name: "Olive oil", amount: "1 tablespoon", order: 6 },
          { name: "Salt", amount: "1/2 teaspoon", order: 7 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a large bowl, combine corn, red onion, jalapeño, and cilantro.",
            order: 1,
          },
          { text: "Add lime juice, olive oil, salt, and pepper.", order: 2 },
          { text: "Toss gently to combine all ingredients.", order: 3 },
          {
            text: "Let salsa sit at room temperature for 30 minutes.",
            order: 4,
          },
          { text: "Taste and adjust seasoning as needed.", order: 5 },
          {
            text: "Serve with tortilla chips or as a topping for tacos.",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    title: "Cowboy Caviar",
    description:
      "Texas-style bean and vegetable dip perfect for parties and potlucks.",
    servings: 8,
    prepTime: 20,
    cookTime: 0,
    tips: [
      "Make ahead for best flavor development",
      "Serve with tortilla chips or as a side salad",
      "Adjust jalapeño amount to your spice preference",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Black beans",
            amount: "1 can",
            preparation: "drained and rinsed",
            order: 1,
          },
          {
            name: "Black-eyed peas",
            amount: "1 can",
            preparation: "drained and rinsed",
            order: 2,
          },
          {
            name: "Corn kernels",
            amount: "1 cup",
            preparation: "fresh or frozen, thawed",
            order: 3,
          },
          {
            name: "Red bell pepper",
            amount: "1",
            preparation: "diced",
            order: 4,
          },
          {
            name: "Red onion",
            amount: "1/2 cup",
            preparation: "diced",
            order: 5,
          },
          {
            name: "Jalapeño",
            amount: "1",
            preparation: "seeded and minced",
            order: 6,
          },
          {
            name: "Fresh cilantro",
            amount: "1/2 cup",
            preparation: "chopped",
            order: 7,
          },
          { name: "Lime juice", amount: "3 tablespoons", order: 8 },
          { name: "Olive oil", amount: "2 tablespoons", order: 9 },
          { name: "Salt", amount: "1 teaspoon", order: 10 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 11 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a large bowl, combine beans, peas, corn, bell pepper, and onion.",
            order: 1,
          },
          {
            text: "Add jalapeño and cilantro, toss gently to combine.",
            order: 2,
          },
          {
            text: "In a small bowl, whisk together lime juice, olive oil, salt, and pepper.",
            order: 3,
          },
          {
            text: "Pour dressing over bean mixture and toss to coat evenly.",
            order: 4,
          },
          {
            text: "Cover and refrigerate for at least 2 hours, up to overnight.",
            order: 5,
          },
          {
            text: "Serve chilled with tortilla chips or as a side dish.",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    title: "Cream of Mushroom Chicken",
    description:
      "Creamy chicken dish with mushrooms and herbs, perfect comfort food.",
    servings: 4,
    prepTime: 15,
    cookTime: 25,
    tips: [
      "Use a mix of mushroom varieties for more flavor",
      "Don't overcrowd the pan when cooking chicken",
      "Serve over rice or pasta for a complete meal",
    ],
    ingredientSections: [
      {
        name: "Chicken",
        order: 1,
        ingredients: [
          {
            name: "Chicken breasts",
            amount: "4",
            preparation: "cut into 1-inch pieces",
            order: 1,
          },
          { name: "All-purpose flour", amount: "1/4 cup", order: 2 },
          { name: "Salt", amount: "1 teaspoon", order: 3 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 4 },
          { name: "Olive oil", amount: "2 tablespoons", order: 5 },
        ],
      },
      {
        name: "Sauce",
        order: 2,
        ingredients: [
          {
            name: "Mushrooms",
            amount: "8 ounces",
            preparation: "sliced",
            order: 1,
          },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 2,
          },
          { name: "Chicken broth", amount: "1 cup", order: 3 },
          { name: "Heavy cream", amount: "1/2 cup", order: 4 },
          {
            name: "Fresh thyme",
            amount: "1 tablespoon",
            preparation: "chopped",
            order: 5,
          },
          { name: "Butter", amount: "2 tablespoons", order: 6 },
          { name: "Salt", amount: "1/2 teaspoon", order: 7 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Season chicken pieces with salt and pepper, then dredge in flour.",
            order: 1,
          },
          {
            text: "Heat olive oil in large skillet over medium-high heat.",
            order: 2,
          },
          {
            text: "Cook chicken in batches until golden and cooked through.",
            order: 3,
          },
          { text: "Remove chicken from skillet and set aside.", order: 4 },
          { text: "In same skillet, melt butter and add mushrooms.", order: 5 },
          { text: "Cook mushrooms until golden, then add garlic.", order: 6 },
          {
            text: "Add chicken broth and scrape up browned bits from pan.",
            order: 7,
          },
          {
            text: "Stir in heavy cream and thyme, simmer for 5 minutes.",
            order: 8,
          },
          { text: "Return chicken to skillet and heat through.", order: 9 },
          { text: "Serve hot over rice or pasta.", order: 10 },
        ],
      },
    ],
  },
  {
    title: "Creamy Feta & Roasted Red Pepper Chicken",
    description:
      "Tender chicken in a creamy feta and roasted red pepper sauce.",
    servings: 4,
    prepTime: 15,
    cookTime: 20,
    tips: [
      "Use jarred roasted red peppers for convenience",
      "Don't overcook the chicken to keep it juicy",
      "Serve with crusty bread to soak up the sauce",
    ],
    ingredientSections: [
      {
        name: "Chicken",
        order: 1,
        ingredients: [
          {
            name: "Chicken breasts",
            amount: "4",
            preparation: "6-8 oz each",
            order: 1,
          },
          { name: "Olive oil", amount: "2 tablespoons", order: 2 },
          { name: "Salt", amount: "1 teaspoon", order: 3 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 4 },
        ],
      },
      {
        name: "Sauce",
        order: 2,
        ingredients: [
          {
            name: "Roasted red peppers",
            amount: "1 cup",
            preparation: "chopped",
            order: 1,
          },
          {
            name: "Feta cheese",
            amount: "1/2 cup",
            preparation: "crumbled",
            order: 2,
          },
          { name: "Heavy cream", amount: "1 cup", order: 3 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 4,
          },
          { name: "Chicken broth", amount: "1/2 cup", order: 5 },
          {
            name: "Fresh basil",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 6,
          },
          { name: "Salt", amount: "1/2 teaspoon", order: 7 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          { text: "Season chicken breasts with salt and pepper.", order: 1 },
          {
            text: "Heat olive oil in large skillet over medium-high heat.",
            order: 2,
          },
          {
            text: "Cook chicken for 6-8 minutes per side until golden and cooked through.",
            order: 3,
          },
          { text: "Remove chicken from skillet and set aside.", order: 4 },
          {
            text: "In same skillet, add garlic and cook until fragrant.",
            order: 5,
          },
          { text: "Add roasted red peppers and cook for 2 minutes.", order: 6 },
          {
            text: "Stir in heavy cream and chicken broth, bring to simmer.",
            order: 7,
          },
          {
            text: "Add feta cheese and stir until melted and smooth.",
            order: 8,
          },
          {
            text: "Return chicken to skillet and simmer for 5 minutes.",
            order: 9,
          },
          { text: "Garnish with fresh basil and serve hot.", order: 10 },
        ],
      },
    ],
  },
  {
    title: "Crockpot Chicken Tacos",
    description: "Easy slow cooker chicken tacos with tender, flavorful meat.",
    servings: 6,
    prepTime: 10,
    cookTime: 240,
    tips: [
      "Use boneless, skinless chicken thighs for best results",
      "Shred chicken with two forks for perfect texture",
      "Serve with your favorite taco toppings",
    ],
    ingredientSections: [
      {
        name: "Chicken",
        order: 1,
        ingredients: [
          { name: "Chicken breasts", amount: "2 pounds", order: 1 },
          { name: "Taco seasoning", amount: "1 packet", order: 2 },
          { name: "Chicken broth", amount: "1/2 cup", order: 3 },
          { name: "Lime juice", amount: "2 tablespoons", order: 4 },
        ],
      },
      {
        name: "For Serving",
        order: 2,
        ingredients: [
          {
            name: "Tortillas",
            amount: "12",
            preparation: "corn or flour",
            order: 1,
          },
          { name: "Shredded cheese", amount: "1 cup", order: 2 },
          { name: "Sour cream", amount: "1/2 cup", order: 3 },
          { name: "Salsa", amount: "1 cup", order: 4 },
          {
            name: "Lettuce",
            amount: "1 head",
            preparation: "shredded",
            order: 5,
          },
          { name: "Tomatoes", amount: "2", preparation: "diced", order: 6 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          { text: "Place chicken breasts in slow cooker.", order: 1 },
          { text: "Sprinkle taco seasoning over chicken.", order: 2 },
          { text: "Add chicken broth and lime juice.", order: 3 },
          {
            text: "Cover and cook on low for 6-8 hours or high for 3-4 hours.",
            order: 4,
          },
          {
            text: "Remove chicken from slow cooker and shred with two forks.",
            order: 5,
          },
          {
            text: "Return shredded chicken to slow cooker and stir to coat with juices.",
            order: 6,
          },
          { text: "Serve hot in tortillas with desired toppings.", order: 7 },
        ],
      },
    ],
  },
  {
    title: "Crystal's Famous Cheese Dip",
    description:
      "Creamy, cheesy dip perfect for parties and game day gatherings.",
    servings: 8,
    prepTime: 10,
    cookTime: 15,
    tips: [
      "Use a good melting cheese like Velveeta or American",
      "Serve with tortilla chips, crackers, or vegetables",
      "Can be kept warm in a slow cooker for parties",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Velveeta cheese",
            amount: "16 ounces",
            preparation: "cubed",
            order: 1,
          },
          {
            name: "Rotel tomatoes",
            amount: "1 can",
            preparation: "with green chiles",
            order: 2,
          },
          {
            name: "Ground beef",
            amount: "1 pound",
            preparation: "cooked and drained",
            order: 3,
          },
          { name: "Taco seasoning", amount: "1 packet", order: 4 },
          { name: "Milk", amount: "1/4 cup", order: 5 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          { text: "In a large saucepan, combine Velveeta and milk.", order: 1 },
          {
            text: "Cook over medium heat, stirring constantly, until cheese melts.",
            order: 2,
          },
          { text: "Add Rotel tomatoes and stir to combine.", order: 3 },
          { text: "Stir in cooked ground beef and taco seasoning.", order: 4 },
          {
            text: "Continue cooking until heated through, about 5 minutes.",
            order: 5,
          },
          { text: "Serve hot with tortilla chips or crackers.", order: 6 },
        ],
      },
    ],
  },
  {
    title: "Fish Tacos",
    description:
      "Fresh and crispy fish tacos with cabbage slaw and creamy sauce.",
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    tips: [
      "Use firm white fish like cod or tilapia",
      "Don't overcrowd the pan when frying fish",
      "Serve immediately for the crispiest texture",
    ],
    ingredientSections: [
      {
        name: "Fish",
        order: 1,
        ingredients: [
          {
            name: "White fish fillets",
            amount: "1 pound",
            preparation: "cut into strips",
            order: 1,
          },
          { name: "All-purpose flour", amount: "1/2 cup", order: 2 },
          { name: "Cornmeal", amount: "1/2 cup", order: 3 },
          { name: "Salt", amount: "1 teaspoon", order: 4 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 5 },
          { name: "Vegetable oil", amount: "1/2 cup", order: 6 },
        ],
      },
      {
        name: "Slaw",
        order: 2,
        ingredients: [
          {
            name: "Cabbage",
            amount: "2 cups",
            preparation: "shredded",
            order: 1,
          },
          {
            name: "Red onion",
            amount: "1/4 cup",
            preparation: "thinly sliced",
            order: 2,
          },
          { name: "Lime juice", amount: "2 tablespoons", order: 3 },
          { name: "Olive oil", amount: "1 tablespoon", order: 4 },
          { name: "Salt", amount: "1/2 teaspoon", order: 5 },
        ],
      },
      {
        name: "Sauce",
        order: 3,
        ingredients: [
          { name: "Sour cream", amount: "1/2 cup", order: 1 },
          { name: "Lime juice", amount: "1 tablespoon", order: 2 },
          { name: "Hot sauce", amount: "1 teaspoon", order: 3 },
          { name: "Salt", amount: "1/4 teaspoon", order: 4 },
        ],
      },
      {
        name: "For Serving",
        order: 4,
        ingredients: [
          {
            name: "Tortillas",
            amount: "8",
            preparation: "corn or flour",
            order: 1,
          },
          { name: "Lime wedges", amount: "2", order: 2 },
          {
            name: "Fresh cilantro",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 3,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Make slaw by combining cabbage, onion, lime juice, olive oil, and salt.",
            order: 1,
          },
          {
            text: "Make sauce by combining sour cream, lime juice, hot sauce, and salt.",
            order: 2,
          },
          {
            text: "In a shallow dish, combine flour, cornmeal, salt, and pepper.",
            order: 3,
          },
          {
            text: "Heat vegetable oil in large skillet over medium-high heat.",
            order: 4,
          },
          {
            text: "Dredge fish strips in flour mixture, shaking off excess.",
            order: 5,
          },
          {
            text: "Fry fish in batches until golden and crispy, about 3-4 minutes per side.",
            order: 6,
          },
          {
            text: "Drain on paper towels and season with additional salt if needed.",
            order: 7,
          },
          {
            text: "Serve fish in tortillas with slaw, sauce, and desired toppings.",
            order: 8,
          },
        ],
      },
    ],
  },
  {
    title: "French Dip Sandwiches",
    description:
      "Classic French dip sandwiches with tender roast beef and au jus for dipping.",
    servings: 4,
    prepTime: 15,
    cookTime: 10,
    tips: [
      "Use good quality roast beef from the deli",
      "Toast the bread for better texture",
      "Serve with extra au jus on the side",
    ],
    ingredientSections: [
      {
        name: "Sandwiches",
        order: 1,
        ingredients: [
          { name: "Hoagie rolls", amount: "4", preparation: "split", order: 1 },
          {
            name: "Roast beef",
            amount: "1 pound",
            preparation: "thinly sliced",
            order: 2,
          },
          { name: "Provolone cheese", amount: "8 slices", order: 3 },
          {
            name: "Butter",
            amount: "2 tablespoons",
            preparation: "softened",
            order: 4,
          },
        ],
      },
      {
        name: "Au Jus",
        order: 2,
        ingredients: [
          { name: "Beef broth", amount: "2 cups", order: 1 },
          { name: "Worcestershire sauce", amount: "1 tablespoon", order: 2 },
          { name: "Soy sauce", amount: "1 tablespoon", order: 3 },
          { name: "Garlic powder", amount: "1/2 teaspoon", order: 4 },
          { name: "Onion powder", amount: "1/2 teaspoon", order: 5 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 6 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 400°F and line a baking sheet with foil.",
            order: 1,
          },
          {
            text: "In a small saucepan, combine all au jus ingredients.",
            order: 2,
          },
          { text: "Bring au jus to simmer and keep warm.", order: 3 },
          { text: "Butter the cut sides of hoagie rolls.", order: 4 },
          {
            text: "Layer roast beef and cheese on bottom half of each roll.",
            order: 5,
          },
          { text: "Place sandwiches on prepared baking sheet.", order: 6 },
          {
            text: "Bake for 5-8 minutes until cheese melts and bread is toasted.",
            order: 7,
          },
          { text: "Serve hot with warm au jus for dipping.", order: 8 },
        ],
      },
    ],
  },
  {
    title: "Gochujang Sauce",
    description:
      "Spicy Korean chili sauce perfect for marinades, dipping, or glazing.",
    servings: 8,
    prepTime: 10,
    cookTime: 0,
    tips: [
      "Store in refrigerator for up to 2 weeks",
      "Adjust spice level by adding more or less gochujang",
      "Use as a marinade for meats or as a dipping sauce",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          { name: "Gochujang paste", amount: "1/4 cup", order: 1 },
          { name: "Soy sauce", amount: "2 tablespoons", order: 2 },
          { name: "Rice vinegar", amount: "2 tablespoons", order: 3 },
          { name: "Honey", amount: "2 tablespoons", order: 4 },
          { name: "Sesame oil", amount: "1 tablespoon", order: 5 },
          {
            name: "Garlic",
            amount: "2 cloves",
            preparation: "minced",
            order: 6,
          },
          {
            name: "Ginger",
            amount: "1 teaspoon",
            preparation: "minced",
            order: 7,
          },
          { name: "Sesame seeds", amount: "1 tablespoon", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a small bowl, whisk together gochujang and soy sauce.",
            order: 1,
          },
          { text: "Add rice vinegar and honey, whisk until smooth.", order: 2 },
          { text: "Stir in sesame oil, garlic, and ginger.", order: 3 },
          { text: "Add sesame seeds and stir to combine.", order: 4 },
          { text: "Taste and adjust seasoning as needed.", order: 5 },
          {
            text: "Transfer to a jar and refrigerate until ready to use.",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    title: "Guacamole",
    description:
      "Fresh and creamy guacamole perfect for chips, tacos, or as a topping.",
    servings: 6,
    prepTime: 15,
    cookTime: 0,
    tips: [
      "Use ripe avocados for the best texture",
      "Add lime juice to prevent browning",
      "Serve immediately for the freshest taste",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Ripe avocados",
            amount: "3",
            preparation: "peeled and pitted",
            order: 1,
          },
          { name: "Lime juice", amount: "2 tablespoons", order: 2 },
          {
            name: "Red onion",
            amount: "1/4 cup",
            preparation: "finely diced",
            order: 3,
          },
          {
            name: "Jalapeño",
            amount: "1",
            preparation: "seeded and minced",
            order: 4,
          },
          {
            name: "Fresh cilantro",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 5,
          },
          { name: "Salt", amount: "1/2 teaspoon", order: 6 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 7 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a medium bowl, mash avocados with a fork until smooth.",
            order: 1,
          },
          { text: "Stir in lime juice to prevent browning.", order: 2 },
          { text: "Add red onion, jalapeño, and cilantro.", order: 3 },
          { text: "Season with salt and pepper to taste.", order: 4 },
          { text: "Stir gently to combine all ingredients.", order: 5 },
          {
            text: "Serve immediately with tortilla chips or as a topping.",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    title: "Jamaican Jerk Chicken",
    description:
      "Spicy and flavorful Jamaican jerk chicken with authentic Caribbean spices.",
    servings: 4,
    prepTime: 20,
    cookTime: 25,
    tips: [
      "Marinate chicken for at least 4 hours for best flavor",
      "Use a grill for authentic smoky flavor",
      "Adjust spice level by adding more or less scotch bonnet peppers",
    ],
    ingredientSections: [
      {
        name: "Marinade",
        order: 1,
        ingredients: [
          {
            name: "Scotch bonnet peppers",
            amount: "2",
            preparation: "seeded and minced",
            order: 1,
          },
          {
            name: "Garlic",
            amount: "6 cloves",
            preparation: "minced",
            order: 2,
          },
          {
            name: "Ginger",
            amount: "2 tablespoons",
            preparation: "minced",
            order: 3,
          },
          {
            name: "Green onions",
            amount: "6",
            preparation: "chopped",
            order: 4,
          },
          {
            name: "Fresh thyme",
            amount: "2 tablespoons",
            preparation: "chopped",
            order: 5,
          },
          {
            name: "Allspice",
            amount: "1 tablespoon",
            preparation: "ground",
            order: 6,
          },
          { name: "Nutmeg", amount: "1/2 teaspoon", order: 7 },
          { name: "Cinnamon", amount: "1/2 teaspoon", order: 8 },
          { name: "Soy sauce", amount: "1/4 cup", order: 9 },
          { name: "Lime juice", amount: "1/4 cup", order: 10 },
          { name: "Brown sugar", amount: "2 tablespoons", order: 11 },
          { name: "Olive oil", amount: "1/4 cup", order: 12 },
        ],
      },
      {
        name: "Chicken",
        order: 2,
        ingredients: [
          {
            name: "Chicken pieces",
            amount: "4 pounds",
            preparation: "legs, thighs, or breasts",
            order: 1,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a food processor, combine all marinade ingredients until smooth.",
            order: 1,
          },
          {
            text: "Place chicken in a large resealable bag and pour marinade over.",
            order: 2,
          },
          {
            text: "Seal bag and refrigerate for at least 4 hours, up to overnight.",
            order: 3,
          },
          { text: "Preheat grill to medium-high heat.", order: 4 },
          {
            text: "Remove chicken from marinade and discard marinade.",
            order: 5,
          },
          {
            text: "Grill chicken for 20-25 minutes, turning occasionally.",
            order: 6,
          },
          { text: "Cook until internal temperature reaches 165°F.", order: 7 },
          { text: "Let rest for 5 minutes before serving.", order: 8 },
        ],
      },
    ],
  },
  {
    title: "KenZie's Dessert Dip",
    description:
      "Sweet and creamy dessert dip perfect for fruit, cookies, or pretzels.",
    servings: 8,
    prepTime: 10,
    cookTime: 0,
    tips: [
      "Use room temperature cream cheese for smooth mixing",
      "Serve with fresh fruit, cookies, or pretzels",
      "Can be made ahead and refrigerated",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Cream cheese",
            amount: "8 ounces",
            preparation: "softened",
            order: 1,
          },
          { name: "Powdered sugar", amount: "1 cup", order: 2 },
          { name: "Vanilla extract", amount: "1 teaspoon", order: 3 },
          { name: "Heavy cream", amount: "1/4 cup", order: 4 },
          {
            name: "Chocolate chips",
            amount: "1/2 cup",
            preparation: "mini",
            order: 5,
          },
          { name: "Sprinkles", amount: "1/4 cup", order: 6 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a large bowl, beat cream cheese until smooth.",
            order: 1,
          },
          {
            text: "Add powdered sugar and vanilla extract, beat until combined.",
            order: 2,
          },
          {
            text: "Gradually add heavy cream and beat until light and fluffy.",
            order: 3,
          },
          { text: "Fold in chocolate chips and sprinkles.", order: 4 },
          {
            text: "Transfer to serving bowl and refrigerate for 30 minutes.",
            order: 5,
          },
          { text: "Serve with fresh fruit, cookies, or pretzels.", order: 6 },
        ],
      },
    ],
  },
  {
    title: "Korean Beef Bowls",
    description:
      "Flavorful Korean-style beef bowls with rice and fresh vegetables.",
    servings: 4,
    prepTime: 15,
    cookTime: 15,
    tips: [
      "Use thinly sliced beef for quick cooking",
      "Don't overcook the beef to keep it tender",
      "Serve with kimchi for authentic Korean flavor",
    ],
    ingredientSections: [
      {
        name: "Beef",
        order: 1,
        ingredients: [
          { name: "Ground beef", amount: "1 pound", order: 1 },
          { name: "Soy sauce", amount: "3 tablespoons", order: 2 },
          { name: "Brown sugar", amount: "2 tablespoons", order: 3 },
          { name: "Sesame oil", amount: "1 tablespoon", order: 4 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 5,
          },
          {
            name: "Ginger",
            amount: "1 tablespoon",
            preparation: "minced",
            order: 6,
          },
          { name: "Gochujang", amount: "1 tablespoon", order: 7 },
        ],
      },
      {
        name: "For Serving",
        order: 2,
        ingredients: [
          {
            name: "White rice",
            amount: "2 cups",
            preparation: "cooked",
            order: 1,
          },
          { name: "Cucumber", amount: "1", preparation: "sliced", order: 2 },
          { name: "Carrots", amount: "2", preparation: "julienned", order: 3 },
          {
            name: "Green onions",
            amount: "4",
            preparation: "chopped",
            order: 4,
          },
          { name: "Sesame seeds", amount: "2 tablespoons", order: 5 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a small bowl, whisk together soy sauce, brown sugar, sesame oil, garlic, ginger, and gochujang.",
            order: 1,
          },
          { text: "Heat a large skillet over medium-high heat.", order: 2 },
          {
            text: "Add ground beef and cook, breaking up with spatula.",
            order: 3,
          },
          {
            text: "When beef is browned, add sauce mixture and stir to combine.",
            order: 4,
          },
          {
            text: "Cook for 2-3 minutes until sauce thickens and coats beef.",
            order: 5,
          },
          {
            text: "Serve beef over rice with cucumber, carrots, and green onions.",
            order: 6,
          },
          { text: "Garnish with sesame seeds and serve hot.", order: 7 },
        ],
      },
    ],
  },
  {
    title: "Lemon Garlic Shrimp",
    description:
      "Quick and easy lemon garlic shrimp perfect for pasta or as an appetizer.",
    servings: 4,
    prepTime: 10,
    cookTime: 8,
    tips: [
      "Don't overcook shrimp - they cook quickly",
      "Use fresh lemon juice for the best flavor",
      "Serve over pasta or with crusty bread",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Large shrimp",
            amount: "1 pound",
            preparation: "peeled and deveined",
            order: 1,
          },
          { name: "Olive oil", amount: "3 tablespoons", order: 2 },
          {
            name: "Garlic",
            amount: "4 cloves",
            preparation: "minced",
            order: 3,
          },
          { name: "Lemon juice", amount: "2 tablespoons", order: 4 },
          { name: "Lemon zest", amount: "1 tablespoon", order: 5 },
          {
            name: "Fresh parsley",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 6,
          },
          { name: "Salt", amount: "1/2 teaspoon", order: 7 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 8 },
          { name: "Red pepper flakes", amount: "1/4 teaspoon", order: 9 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Pat shrimp dry with paper towels and season with salt and pepper.",
            order: 1,
          },
          {
            text: "Heat olive oil in large skillet over medium-high heat.",
            order: 2,
          },
          {
            text: "Add garlic and cook until fragrant, about 30 seconds.",
            order: 3,
          },
          { text: "Add shrimp to skillet in single layer.", order: 4 },
          {
            text: "Cook shrimp for 2-3 minutes per side until pink and opaque.",
            order: 5,
          },
          {
            text: "Add lemon juice, lemon zest, and red pepper flakes.",
            order: 6,
          },
          { text: "Stir in fresh parsley and cook for 1 minute.", order: 7 },
          {
            text: "Serve hot with additional lemon wedges if desired.",
            order: 8,
          },
        ],
      },
    ],
  },
  {
    title: "Lemon Parmesan Broccoli",
    description:
      "Simple and flavorful broccoli with lemon and parmesan cheese.",
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    tips: [
      "Don't overcook broccoli to keep it crisp-tender",
      "Use freshly grated parmesan for best flavor",
      "Serve as a side dish with any main course",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Broccoli",
            amount: "1 head",
            preparation: "cut into florets",
            order: 1,
          },
          { name: "Olive oil", amount: "2 tablespoons", order: 2 },
          { name: "Lemon juice", amount: "2 tablespoons", order: 3 },
          { name: "Lemon zest", amount: "1 tablespoon", order: 4 },
          {
            name: "Parmesan cheese",
            amount: "1/2 cup",
            preparation: "freshly grated",
            order: 5,
          },
          {
            name: "Garlic",
            amount: "2 cloves",
            preparation: "minced",
            order: 6,
          },
          { name: "Salt", amount: "1/2 teaspoon", order: 7 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 425°F and line a baking sheet with parchment paper.",
            order: 1,
          },
          {
            text: "In a large bowl, toss broccoli with olive oil, lemon juice, and garlic.",
            order: 2,
          },
          {
            text: "Season with salt and pepper and spread on prepared baking sheet.",
            order: 3,
          },
          {
            text: "Roast broccoli for 12-15 minutes until tender and slightly charred.",
            order: 4,
          },
          {
            text: "Remove from oven and sprinkle with parmesan cheese and lemon zest.",
            order: 5,
          },
          { text: "Toss gently to combine and serve hot.", order: 6 },
        ],
      },
    ],
  },
  {
    title: "Lemon Parmesan Rice",
    description:
      "Flavorful rice dish with lemon and parmesan, perfect as a side dish.",
    servings: 6,
    prepTime: 10,
    cookTime: 20,
    tips: [
      "Use freshly grated parmesan for best flavor",
      "Add more lemon zest for extra brightness",
      "Serve with grilled chicken or fish",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "White rice",
            amount: "2 cups",
            preparation: "uncooked",
            order: 1,
          },
          { name: "Chicken broth", amount: "4 cups", order: 2 },
          { name: "Olive oil", amount: "2 tablespoons", order: 3 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 4,
          },
          { name: "Lemon zest", amount: "2 tablespoons", order: 5 },
          { name: "Lemon juice", amount: "2 tablespoons", order: 6 },
          {
            name: "Parmesan cheese",
            amount: "1 cup",
            preparation: "freshly grated",
            order: 7,
          },
          {
            name: "Fresh parsley",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 8,
          },
          { name: "Salt", amount: "1 teaspoon", order: 9 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 10 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          { text: "Rinse rice until water runs clear, then drain.", order: 1 },
          {
            text: "In a large pot, heat olive oil over medium heat.",
            order: 2,
          },
          {
            text: "Add garlic and cook until fragrant, about 30 seconds.",
            order: 3,
          },
          {
            text: "Add rice and stir for 1 minute until lightly toasted.",
            order: 4,
          },
          { text: "Add chicken broth, lemon zest, and salt.", order: 5 },
          {
            text: "Bring to boil, then reduce heat to low and cover.",
            order: 6,
          },
          { text: "Simmer for 18 minutes until rice is tender.", order: 7 },
          {
            text: "Remove from heat and stir in lemon juice, parmesan, and parsley.",
            order: 8,
          },
          {
            text: "Season with additional salt and pepper to taste.",
            order: 9,
          },
          { text: "Serve hot as a side dish.", order: 10 },
        ],
      },
    ],
  },
  {
    title: "Mediterranean Stir Fry",
    description:
      "Fresh Mediterranean-style stir fry with vegetables and herbs.",
    servings: 4,
    prepTime: 15,
    cookTime: 10,
    tips: [
      "Use high heat for authentic stir fry",
      "Don't overcrowd the pan",
      "Serve with rice or quinoa for a complete meal",
    ],
    ingredientSections: [
      {
        name: "Vegetables",
        order: 1,
        ingredients: [
          {
            name: "Broccoli",
            amount: "2 cups",
            preparation: "cut into florets",
            order: 1,
          },
          {
            name: "Bell peppers",
            amount: "2",
            preparation: "sliced",
            order: 2,
          },
          { name: "Zucchini", amount: "2", preparation: "sliced", order: 3 },
          {
            name: "Cherry tomatoes",
            amount: "1 cup",
            preparation: "halved",
            order: 4,
          },
          { name: "Red onion", amount: "1", preparation: "sliced", order: 5 },
        ],
      },
      {
        name: "Sauce",
        order: 2,
        ingredients: [
          { name: "Olive oil", amount: "3 tablespoons", order: 1 },
          {
            name: "Garlic",
            amount: "4 cloves",
            preparation: "minced",
            order: 2,
          },
          { name: "Lemon juice", amount: "2 tablespoons", order: 3 },
          {
            name: "Oregano",
            amount: "1 tablespoon",
            preparation: "dried",
            order: 4,
          },
          {
            name: "Basil",
            amount: "1 tablespoon",
            preparation: "dried",
            order: 5,
          },
          { name: "Salt", amount: "1 teaspoon", order: 6 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 7 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Heat olive oil in large wok or skillet over high heat.",
            order: 1,
          },
          {
            text: "Add garlic and cook until fragrant, about 30 seconds.",
            order: 2,
          },
          {
            text: "Add broccoli and bell peppers, stir-fry for 3 minutes.",
            order: 3,
          },
          {
            text: "Add zucchini and onion, continue stir-frying for 2 minutes.",
            order: 4,
          },
          { text: "Add cherry tomatoes and cook for 1 minute.", order: 5 },
          {
            text: "Stir in lemon juice, oregano, basil, salt, and pepper.",
            order: 6,
          },
          {
            text: "Cook for 1-2 minutes until vegetables are crisp-tender.",
            order: 7,
          },
          { text: "Serve hot with rice or quinoa.", order: 8 },
        ],
      },
    ],
  },
  {
    title: "Mexican Salad",
    description:
      "Fresh and vibrant Mexican salad with beans, corn, and lime dressing.",
    servings: 6,
    prepTime: 20,
    cookTime: 0,
    tips: [
      "Use fresh ingredients for the best flavor",
      "Let salad sit for 30 minutes to develop flavors",
      "Serve with tortilla chips on the side",
    ],
    ingredientSections: [
      {
        name: "Salad",
        order: 1,
        ingredients: [
          {
            name: "Romaine lettuce",
            amount: "1 head",
            preparation: "chopped",
            order: 1,
          },
          {
            name: "Black beans",
            amount: "1 can",
            preparation: "drained and rinsed",
            order: 2,
          },
          {
            name: "Corn kernels",
            amount: "1 cup",
            preparation: "fresh or frozen, thawed",
            order: 3,
          },
          {
            name: "Cherry tomatoes",
            amount: "1 cup",
            preparation: "halved",
            order: 4,
          },
          {
            name: "Red onion",
            amount: "1/2 cup",
            preparation: "diced",
            order: 5,
          },
          { name: "Avocado", amount: "1", preparation: "diced", order: 6 },
          {
            name: "Fresh cilantro",
            amount: "1/2 cup",
            preparation: "chopped",
            order: 7,
          },
        ],
      },
      {
        name: "Dressing",
        order: 2,
        ingredients: [
          { name: "Lime juice", amount: "3 tablespoons", order: 1 },
          { name: "Olive oil", amount: "2 tablespoons", order: 2 },
          { name: "Cumin", amount: "1 teaspoon", order: 3 },
          { name: "Chili powder", amount: "1/2 teaspoon", order: 4 },
          { name: "Salt", amount: "1/2 teaspoon", order: 5 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 6 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          { text: "In a large bowl, combine all salad ingredients.", order: 1 },
          {
            text: "In a small bowl, whisk together all dressing ingredients.",
            order: 2,
          },
          {
            text: "Pour dressing over salad and toss gently to combine.",
            order: 3,
          },
          {
            text: "Let salad sit for 30 minutes to develop flavors.",
            order: 4,
          },
          {
            text: "Serve chilled with additional lime wedges if desired.",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    title: "Orange Chicken",
    description:
      "Sweet and tangy orange chicken with crispy coating and sticky sauce.",
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    tips: [
      "Don't overcrowd the pan when frying chicken",
      "Use fresh orange juice for the best flavor",
      "Serve with steamed rice for a complete meal",
    ],
    ingredientSections: [
      {
        name: "Chicken",
        order: 1,
        ingredients: [
          {
            name: "Chicken breast",
            amount: "1 pound",
            preparation: "cut into 1-inch pieces",
            order: 1,
          },
          { name: "All-purpose flour", amount: "1/2 cup", order: 2 },
          { name: "Cornstarch", amount: "1/4 cup", order: 3 },
          { name: "Eggs", amount: "2", preparation: "beaten", order: 4 },
          { name: "Vegetable oil", amount: "1/2 cup", order: 5 },
          { name: "Salt", amount: "1 teaspoon", order: 6 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 7 },
        ],
      },
      {
        name: "Orange Sauce",
        order: 2,
        ingredients: [
          {
            name: "Orange juice",
            amount: "1 cup",
            preparation: "fresh",
            order: 1,
          },
          { name: "Orange zest", amount: "2 tablespoons", order: 2 },
          { name: "Soy sauce", amount: "2 tablespoons", order: 3 },
          { name: "Rice vinegar", amount: "1 tablespoon", order: 4 },
          { name: "Brown sugar", amount: "1/4 cup", order: 5 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 6,
          },
          {
            name: "Ginger",
            amount: "1 tablespoon",
            preparation: "minced",
            order: 7,
          },
          {
            name: "Cornstarch",
            amount: "1 tablespoon",
            preparation: "mixed with 2 tbsp water",
            order: 8,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a shallow dish, combine flour, cornstarch, salt, and pepper.",
            order: 1,
          },
          {
            text: "Dip chicken pieces in beaten eggs, then coat in flour mixture.",
            order: 2,
          },
          {
            text: "Heat vegetable oil in large skillet over medium-high heat.",
            order: 3,
          },
          {
            text: "Fry chicken in batches until golden and crispy, about 4-5 minutes.",
            order: 4,
          },
          { text: "Remove chicken and drain on paper towels.", order: 5 },
          {
            text: "In a saucepan, combine all sauce ingredients except cornstarch mixture.",
            order: 6,
          },
          { text: "Bring to simmer and cook for 5 minutes.", order: 7 },
          {
            text: "Stir in cornstarch mixture and cook until sauce thickens.",
            order: 8,
          },
          { text: "Return chicken to skillet and toss with sauce.", order: 9 },
          { text: "Serve hot over steamed rice.", order: 10 },
        ],
      },
    ],
  },
  {
    title: "Orzo with Zucchini & Tomato",
    description:
      "Simple and flavorful orzo pasta with fresh zucchini and tomatoes.",
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    tips: [
      "Don't overcook the orzo - it should be al dente",
      "Use fresh herbs for the best flavor",
      "Serve as a side dish or light main course",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          { name: "Orzo pasta", amount: "1 pound", order: 1 },
          { name: "Zucchini", amount: "2", preparation: "diced", order: 2 },
          {
            name: "Cherry tomatoes",
            amount: "1 cup",
            preparation: "halved",
            order: 3,
          },
          { name: "Olive oil", amount: "3 tablespoons", order: 4 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 5,
          },
          {
            name: "Fresh basil",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 6,
          },
          {
            name: "Parmesan cheese",
            amount: "1/2 cup",
            preparation: "freshly grated",
            order: 7,
          },
          { name: "Salt", amount: "1 teaspoon", order: 8 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 9 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Bring large pot of salted water to boil and cook orzo according to package directions.",
            order: 1,
          },
          {
            text: "While pasta cooks, heat olive oil in large skillet over medium heat.",
            order: 2,
          },
          {
            text: "Add garlic and cook until fragrant, about 30 seconds.",
            order: 3,
          },
          {
            text: "Add zucchini and cook for 3-4 minutes until tender.",
            order: 4,
          },
          {
            text: "Add cherry tomatoes and cook for 2 minutes until slightly softened.",
            order: 5,
          },
          { text: "Drain orzo and add to skillet with vegetables.", order: 6 },
          {
            text: "Stir in basil, parmesan cheese, salt, and pepper.",
            order: 7,
          },
          { text: "Toss gently to combine and serve hot.", order: 8 },
        ],
      },
    ],
  },
  {
    title: "Pico de Gallo",
    description: "Fresh Mexican salsa with tomatoes, onions, and cilantro.",
    servings: 6,
    prepTime: 15,
    cookTime: 0,
    tips: [
      "Use fresh, ripe tomatoes for the best flavor",
      "Let salsa sit for 30 minutes to develop flavors",
      "Serve with tortilla chips or as a topping",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Roma tomatoes",
            amount: "4",
            preparation: "diced",
            order: 1,
          },
          {
            name: "Red onion",
            amount: "1/2 cup",
            preparation: "finely diced",
            order: 2,
          },
          {
            name: "Jalapeño",
            amount: "1",
            preparation: "seeded and minced",
            order: 3,
          },
          {
            name: "Fresh cilantro",
            amount: "1/2 cup",
            preparation: "chopped",
            order: 4,
          },
          { name: "Lime juice", amount: "2 tablespoons", order: 5 },
          { name: "Salt", amount: "1/2 teaspoon", order: 6 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 7 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a medium bowl, combine tomatoes, red onion, and jalapeño.",
            order: 1,
          },
          { text: "Add cilantro, lime juice, salt, and pepper.", order: 2 },
          { text: "Stir gently to combine all ingredients.", order: 3 },
          {
            text: "Let salsa sit at room temperature for 30 minutes.",
            order: 4,
          },
          { text: "Taste and adjust seasoning as needed.", order: 5 },
          {
            text: "Serve with tortilla chips or as a topping for tacos.",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    title: "Ramen Salad Bowls with Grilled Chicken",
    description:
      "Fresh and crunchy ramen salad with grilled chicken and Asian-inspired dressing.",
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    tips: [
      "Use fresh vegetables for the best crunch",
      "Don't overcook the chicken to keep it juicy",
      "Serve immediately for the crispiest ramen noodles",
    ],
    ingredientSections: [
      {
        name: "Chicken",
        order: 1,
        ingredients: [
          {
            name: "Chicken breasts",
            amount: "2",
            preparation: "6-8 oz each",
            order: 1,
          },
          { name: "Soy sauce", amount: "2 tablespoons", order: 2 },
          { name: "Sesame oil", amount: "1 tablespoon", order: 3 },
          { name: "Garlic powder", amount: "1 teaspoon", order: 4 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 5 },
        ],
      },
      {
        name: "Salad",
        order: 2,
        ingredients: [
          {
            name: "Ramen noodles",
            amount: "2 packages",
            preparation: "crushed, uncooked",
            order: 1,
          },
          {
            name: "Cabbage",
            amount: "2 cups",
            preparation: "shredded",
            order: 2,
          },
          { name: "Carrots", amount: "2", preparation: "julienned", order: 3 },
          {
            name: "Green onions",
            amount: "4",
            preparation: "chopped",
            order: 4,
          },
          {
            name: "Almonds",
            amount: "1/2 cup",
            preparation: "sliced",
            order: 5,
          },
          { name: "Sesame seeds", amount: "2 tablespoons", order: 6 },
        ],
      },
      {
        name: "Dressing",
        order: 3,
        ingredients: [
          { name: "Rice vinegar", amount: "1/4 cup", order: 1 },
          { name: "Soy sauce", amount: "2 tablespoons", order: 2 },
          { name: "Sesame oil", amount: "2 tablespoons", order: 3 },
          { name: "Sugar", amount: "2 tablespoons", order: 4 },
          {
            name: "Garlic",
            amount: "2 cloves",
            preparation: "minced",
            order: 5,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Season chicken with soy sauce, sesame oil, garlic powder, and pepper.",
            order: 1,
          },
          {
            text: "Grill chicken for 6-8 minutes per side until cooked through.",
            order: 2,
          },
          {
            text: "Let chicken rest for 5 minutes, then slice thinly.",
            order: 3,
          },
          {
            text: "In a large bowl, combine all salad ingredients except almonds and sesame seeds.",
            order: 4,
          },
          {
            text: "In a small bowl, whisk together all dressing ingredients.",
            order: 5,
          },
          { text: "Pour dressing over salad and toss to combine.", order: 6 },
          {
            text: "Top with sliced chicken, almonds, and sesame seeds.",
            order: 7,
          },
          { text: "Serve immediately for best texture.", order: 8 },
        ],
      },
    ],
  },
  {
    title: "Roasted Broccolini",
    description:
      "Simple roasted broccolini with garlic and lemon, perfect as a side dish.",
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    tips: [
      "Don't overcrowd the baking sheet for even roasting",
      "Use fresh broccolini for the best flavor",
      "Serve immediately for the crispiest texture",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Broccolini",
            amount: "2 bunches",
            preparation: "trimmed",
            order: 1,
          },
          { name: "Olive oil", amount: "2 tablespoons", order: 2 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 3,
          },
          { name: "Lemon juice", amount: "1 tablespoon", order: 4 },
          { name: "Lemon zest", amount: "1 teaspoon", order: 5 },
          { name: "Salt", amount: "1/2 teaspoon", order: 6 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 7 },
          { name: "Red pepper flakes", amount: "1/4 teaspoon", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 425°F and line a baking sheet with parchment paper.",
            order: 1,
          },
          {
            text: "In a large bowl, toss broccolini with olive oil, garlic, and seasonings.",
            order: 2,
          },
          {
            text: "Spread broccolini in a single layer on prepared baking sheet.",
            order: 3,
          },
          {
            text: "Roast for 12-15 minutes until tender and slightly charred.",
            order: 4,
          },
          { text: "Remove from oven and drizzle with lemon juice.", order: 5 },
          { text: "Sprinkle with lemon zest and serve hot.", order: 6 },
        ],
      },
    ],
  },
  {
    title: "Roasted Potatoes",
    description:
      "Crispy roasted potatoes with herbs and garlic, perfect as a side dish.",
    servings: 6,
    prepTime: 15,
    cookTime: 35,
    tips: [
      "Cut potatoes in similar sizes for even cooking",
      "Don't overcrowd the baking sheet",
      "Use fresh herbs for the best flavor",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Potatoes",
            amount: "2 pounds",
            preparation: "cut into 1-inch pieces",
            order: 1,
          },
          { name: "Olive oil", amount: "3 tablespoons", order: 2 },
          {
            name: "Garlic",
            amount: "4 cloves",
            preparation: "minced",
            order: 3,
          },
          {
            name: "Fresh rosemary",
            amount: "2 tablespoons",
            preparation: "chopped",
            order: 4,
          },
          {
            name: "Fresh thyme",
            amount: "1 tablespoon",
            preparation: "chopped",
            order: 5,
          },
          { name: "Salt", amount: "1 teaspoon", order: 6 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 7 },
          { name: "Paprika", amount: "1/2 teaspoon", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 425°F and line a large baking sheet with parchment paper.",
            order: 1,
          },
          {
            text: "In a large bowl, toss potatoes with olive oil, garlic, and herbs.",
            order: 2,
          },
          { text: "Season with salt, pepper, and paprika.", order: 3 },
          {
            text: "Spread potatoes in a single layer on prepared baking sheet.",
            order: 4,
          },
          {
            text: "Roast for 30-35 minutes, stirring halfway through cooking time.",
            order: 5,
          },
          {
            text: "Cook until potatoes are golden and crispy on the outside.",
            order: 6,
          },
          { text: "Serve hot as a side dish.", order: 7 },
        ],
      },
    ],
  },
  {
    title: "Ropa Vieja",
    description:
      "Traditional Cuban shredded beef stew with peppers and onions.",
    servings: 6,
    prepTime: 20,
    cookTime: 180,
    tips: [
      "Use a tough cut of beef like flank steak for best results",
      "Cook low and slow for tender meat",
      "Serve with rice and black beans for a complete meal",
    ],
    ingredientSections: [
      {
        name: "Beef",
        order: 1,
        ingredients: [
          { name: "Flank steak", amount: "2 pounds", order: 1 },
          { name: "Beef broth", amount: "4 cups", order: 2 },
          { name: "Olive oil", amount: "2 tablespoons", order: 3 },
          { name: "Salt", amount: "1 teaspoon", order: 4 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 5 },
        ],
      },
      {
        name: "Sauce",
        order: 2,
        ingredients: [
          {
            name: "Bell peppers",
            amount: "2",
            preparation: "sliced",
            order: 1,
          },
          { name: "Onion", amount: "1 large", preparation: "sliced", order: 2 },
          {
            name: "Garlic",
            amount: "6 cloves",
            preparation: "minced",
            order: 3,
          },
          { name: "Tomato paste", amount: "2 tablespoons", order: 4 },
          { name: "Cumin", amount: "1 tablespoon", order: 5 },
          { name: "Oregano", amount: "1 teaspoon", order: 6 },
          { name: "Bay leaves", amount: "2", order: 7 },
          { name: "Olive oil", amount: "2 tablespoons", order: 8 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          { text: "Season flank steak with salt and pepper.", order: 1 },
          {
            text: "In a large pot, heat olive oil over medium-high heat.",
            order: 2,
          },
          {
            text: "Sear steak on both sides until browned, about 3-4 minutes per side.",
            order: 3,
          },
          {
            text: "Add beef broth and bring to boil, then reduce heat to low.",
            order: 4,
          },
          {
            text: "Cover and simmer for 2-3 hours until meat is very tender.",
            order: 5,
          },
          { text: "Remove meat from pot and shred with two forks.", order: 6 },
          {
            text: "In same pot, heat olive oil and sauté onions and peppers.",
            order: 7,
          },
          {
            text: "Add garlic, tomato paste, cumin, oregano, and bay leaves.",
            order: 8,
          },
          {
            text: "Return shredded beef to pot and simmer for 30 minutes.",
            order: 9,
          },
          { text: "Remove bay leaves and serve hot over rice.", order: 10 },
        ],
      },
    ],
  },
  {
    title: "Salmon Sushi Bake",
    description: "Baked sushi casserole with salmon, rice, and creamy sauce.",
    servings: 6,
    prepTime: 30,
    cookTime: 20,
    tips: [
      "Use sushi rice for authentic texture",
      "Don't overcook the salmon",
      "Serve with soy sauce and wasabi on the side",
    ],
    ingredientSections: [
      {
        name: "Rice",
        order: 1,
        ingredients: [
          {
            name: "Sushi rice",
            amount: "2 cups",
            preparation: "cooked",
            order: 1,
          },
          { name: "Rice vinegar", amount: "2 tablespoons", order: 2 },
          { name: "Sugar", amount: "1 tablespoon", order: 3 },
          { name: "Salt", amount: "1/2 teaspoon", order: 4 },
        ],
      },
      {
        name: "Salmon",
        order: 2,
        ingredients: [
          {
            name: "Salmon fillet",
            amount: "1 pound",
            preparation: "skin removed",
            order: 1,
          },
          { name: "Soy sauce", amount: "2 tablespoons", order: 2 },
          { name: "Sesame oil", amount: "1 tablespoon", order: 3 },
          { name: "Garlic powder", amount: "1 teaspoon", order: 4 },
        ],
      },
      {
        name: "Sauce",
        order: 3,
        ingredients: [
          { name: "Mayonnaise", amount: "1/2 cup", order: 1 },
          { name: "Sriracha", amount: "2 tablespoons", order: 2 },
          { name: "Soy sauce", amount: "1 tablespoon", order: 3 },
          { name: "Sesame oil", amount: "1 teaspoon", order: 4 },
        ],
      },
      {
        name: "Toppings",
        order: 4,
        ingredients: [
          { name: "Avocado", amount: "1", preparation: "sliced", order: 1 },
          { name: "Cucumber", amount: "1", preparation: "julienned", order: 2 },
          {
            name: "Green onions",
            amount: "2",
            preparation: "chopped",
            order: 3,
          },
          { name: "Sesame seeds", amount: "2 tablespoons", order: 4 },
          {
            name: "Nori sheets",
            amount: "2",
            preparation: "crumbled",
            order: 5,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 400°F and grease a 9x13 baking dish.",
            order: 1,
          },
          {
            text: "Mix cooked rice with rice vinegar, sugar, and salt.",
            order: 2,
          },
          {
            text: "Press rice mixture into bottom of prepared baking dish.",
            order: 3,
          },
          {
            text: "Season salmon with soy sauce, sesame oil, and garlic powder.",
            order: 4,
          },
          {
            text: "Place salmon on top of rice and bake for 15-20 minutes.",
            order: 5,
          },
          {
            text: "Make sauce by combining mayonnaise, sriracha, soy sauce, and sesame oil.",
            order: 6,
          },
          { text: "Remove from oven and flake salmon with a fork.", order: 7 },
          { text: "Spread sauce over salmon and add toppings.", order: 8 },
          { text: "Garnish with sesame seeds and nori, serve hot.", order: 9 },
        ],
      },
    ],
  },
  {
    title: "Salmon Sushi Bowls",
    description:
      "Fresh salmon sushi bowls with rice, vegetables, and spicy mayo.",
    servings: 4,
    prepTime: 25,
    cookTime: 0,
    tips: [
      "Use fresh, high-quality salmon",
      "Prepare all ingredients before assembling",
      "Serve immediately for the best texture",
    ],
    ingredientSections: [
      {
        name: "Rice",
        order: 1,
        ingredients: [
          {
            name: "Sushi rice",
            amount: "2 cups",
            preparation: "cooked",
            order: 1,
          },
          { name: "Rice vinegar", amount: "2 tablespoons", order: 2 },
          { name: "Sugar", amount: "1 tablespoon", order: 3 },
          { name: "Salt", amount: "1/2 teaspoon", order: 4 },
        ],
      },
      {
        name: "Salmon",
        order: 2,
        ingredients: [
          {
            name: "Fresh salmon",
            amount: "1 pound",
            preparation: "sashimi-grade, diced",
            order: 1,
          },
          { name: "Soy sauce", amount: "2 tablespoons", order: 2 },
          { name: "Sesame oil", amount: "1 tablespoon", order: 3 },
        ],
      },
      {
        name: "Toppings",
        order: 3,
        ingredients: [
          { name: "Avocado", amount: "1", preparation: "sliced", order: 1 },
          { name: "Cucumber", amount: "1", preparation: "julienned", order: 2 },
          { name: "Carrots", amount: "1", preparation: "julienned", order: 3 },
          {
            name: "Green onions",
            amount: "2",
            preparation: "chopped",
            order: 4,
          },
          { name: "Sesame seeds", amount: "2 tablespoons", order: 5 },
          {
            name: "Nori sheets",
            amount: "2",
            preparation: "crumbled",
            order: 6,
          },
        ],
      },
      {
        name: "Spicy Mayo",
        order: 4,
        ingredients: [
          { name: "Mayonnaise", amount: "1/2 cup", order: 1 },
          { name: "Sriracha", amount: "2 tablespoons", order: 2 },
          { name: "Soy sauce", amount: "1 tablespoon", order: 3 },
          { name: "Lime juice", amount: "1 tablespoon", order: 4 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Mix cooked rice with rice vinegar, sugar, and salt.",
            order: 1,
          },
          {
            text: "In a small bowl, combine salmon with soy sauce and sesame oil.",
            order: 2,
          },
          { text: "Make spicy mayo by combining all ingredients.", order: 3 },
          { text: "Divide rice among 4 bowls.", order: 4 },
          {
            text: "Top each bowl with salmon, avocado, cucumber, and carrots.",
            order: 5,
          },
          {
            text: "Drizzle with spicy mayo and garnish with green onions.",
            order: 6,
          },
          { text: "Sprinkle with sesame seeds and nori.", order: 7 },
          {
            text: "Serve immediately with additional soy sauce on the side.",
            order: 8,
          },
        ],
      },
    ],
  },
  {
    title: "Salsa Criolla",
    description: "Fresh Peruvian salsa with onions, tomatoes, and lime juice.",
    servings: 6,
    prepTime: 15,
    cookTime: 0,
    tips: [
      "Use red onions for authentic flavor",
      "Let salsa sit for 30 minutes to develop flavors",
      "Serve with grilled meats or as a topping",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          {
            name: "Red onions",
            amount: "2",
            preparation: "thinly sliced",
            order: 1,
          },
          {
            name: "Roma tomatoes",
            amount: "3",
            preparation: "diced",
            order: 2,
          },
          { name: "Lime juice", amount: "3 tablespoons", order: 3 },
          { name: "Olive oil", amount: "2 tablespoons", order: 4 },
          {
            name: "Fresh cilantro",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 5,
          },
          { name: "Salt", amount: "1/2 teaspoon", order: 6 },
          { name: "Black pepper", amount: "1/4 teaspoon", order: 7 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a medium bowl, combine red onions and lime juice.",
            order: 1,
          },
          {
            text: "Let onions marinate in lime juice for 10 minutes.",
            order: 2,
          },
          {
            text: "Add tomatoes, olive oil, cilantro, salt, and pepper.",
            order: 3,
          },
          { text: "Toss gently to combine all ingredients.", order: 4 },
          {
            text: "Let salsa sit at room temperature for 30 minutes.",
            order: 5,
          },
          {
            text: "Serve with grilled meats or as a topping for tacos.",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    title: "Sheet Pan Fajitas",
    description: "Easy sheet pan fajitas with chicken, peppers, and onions.",
    servings: 4,
    prepTime: 15,
    cookTime: 25,
    tips: [
      "Don't overcrowd the sheet pan for even cooking",
      "Use a mix of colorful bell peppers",
      "Serve with warm tortillas and your favorite toppings",
    ],
    ingredientSections: [
      {
        name: "Fajitas",
        order: 1,
        ingredients: [
          {
            name: "Chicken breasts",
            amount: "2",
            preparation: "cut into strips",
            order: 1,
          },
          {
            name: "Bell peppers",
            amount: "3",
            preparation: "sliced",
            order: 2,
          },
          { name: "Onion", amount: "1 large", preparation: "sliced", order: 3 },
          { name: "Olive oil", amount: "3 tablespoons", order: 4 },
          { name: "Fajita seasoning", amount: "2 tablespoons", order: 5 },
          { name: "Lime juice", amount: "2 tablespoons", order: 6 },
          { name: "Salt", amount: "1 teaspoon", order: 7 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 8 },
        ],
      },
      {
        name: "For Serving",
        order: 2,
        ingredients: [
          {
            name: "Tortillas",
            amount: "8",
            preparation: "flour or corn",
            order: 1,
          },
          { name: "Sour cream", amount: "1/2 cup", order: 2 },
          { name: "Salsa", amount: "1 cup", order: 3 },
          { name: "Shredded cheese", amount: "1 cup", order: 4 },
          {
            name: "Fresh cilantro",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 5,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 425°F and line a large baking sheet with parchment paper.",
            order: 1,
          },
          {
            text: "In a large bowl, combine chicken, peppers, and onion.",
            order: 2,
          },
          {
            text: "Add olive oil, fajita seasoning, lime juice, salt, and pepper.",
            order: 3,
          },
          {
            text: "Toss to coat evenly and spread on prepared baking sheet.",
            order: 4,
          },
          {
            text: "Bake for 20-25 minutes, stirring halfway through cooking time.",
            order: 5,
          },
          {
            text: "Cook until chicken is cooked through and vegetables are tender.",
            order: 6,
          },
          {
            text: "Serve hot with warm tortillas and desired toppings.",
            order: 7,
          },
        ],
      },
    ],
  },
  {
    title: "Stir Fry Sauce",
    description:
      "Versatile stir fry sauce perfect for any Asian-inspired dish.",
    servings: 8,
    prepTime: 10,
    cookTime: 0,
    tips: [
      "Store in refrigerator for up to 2 weeks",
      "Adjust spice level by adding more or less chili paste",
      "Use as a marinade or finishing sauce",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          { name: "Soy sauce", amount: "1/2 cup", order: 1 },
          { name: "Oyster sauce", amount: "1/4 cup", order: 2 },
          { name: "Rice vinegar", amount: "2 tablespoons", order: 3 },
          { name: "Sesame oil", amount: "1 tablespoon", order: 4 },
          { name: "Brown sugar", amount: "2 tablespoons", order: 5 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 6,
          },
          {
            name: "Ginger",
            amount: "1 tablespoon",
            preparation: "minced",
            order: 7,
          },
          {
            name: "Cornstarch",
            amount: "1 tablespoon",
            preparation: "mixed with 2 tbsp water",
            order: 8,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a small bowl, whisk together soy sauce, oyster sauce, and rice vinegar.",
            order: 1,
          },
          {
            text: "Add sesame oil, brown sugar, garlic, and ginger.",
            order: 2,
          },
          {
            text: "Stir in cornstarch mixture and whisk until smooth.",
            order: 3,
          },
          {
            text: "Transfer to a jar and refrigerate until ready to use.",
            order: 4,
          },
          {
            text: "Shake well before using as marinade or finishing sauce.",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    title: "Street Corn Chicken Rice Bowls",
    description:
      "Mexican street corn-inspired rice bowls with grilled chicken.",
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    tips: [
      "Use fresh corn when in season for best flavor",
      "Don't overcook the chicken to keep it juicy",
      "Serve with lime wedges for extra brightness",
    ],
    ingredientSections: [
      {
        name: "Chicken",
        order: 1,
        ingredients: [
          {
            name: "Chicken breasts",
            amount: "2",
            preparation: "6-8 oz each",
            order: 1,
          },
          { name: "Chili powder", amount: "1 tablespoon", order: 2 },
          { name: "Cumin", amount: "1 teaspoon", order: 3 },
          { name: "Salt", amount: "1 teaspoon", order: 4 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 5 },
          { name: "Olive oil", amount: "2 tablespoons", order: 6 },
        ],
      },
      {
        name: "Street Corn",
        order: 2,
        ingredients: [
          {
            name: "Corn kernels",
            amount: "2 cups",
            preparation: "fresh or frozen",
            order: 1,
          },
          { name: "Mayonnaise", amount: "1/4 cup", order: 2 },
          { name: "Sour cream", amount: "1/4 cup", order: 3 },
          { name: "Lime juice", amount: "2 tablespoons", order: 4 },
          { name: "Chili powder", amount: "1 teaspoon", order: 5 },
          {
            name: "Cotija cheese",
            amount: "1/2 cup",
            preparation: "crumbled",
            order: 6,
          },
          {
            name: "Fresh cilantro",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 7,
          },
        ],
      },
      {
        name: "For Serving",
        order: 3,
        ingredients: [
          {
            name: "White rice",
            amount: "2 cups",
            preparation: "cooked",
            order: 1,
          },
          { name: "Lime wedges", amount: "2", order: 2 },
          {
            name: "Additional cotija cheese",
            amount: "1/4 cup",
            preparation: "for garnish",
            order: 3,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Season chicken with chili powder, cumin, salt, and pepper.",
            order: 1,
          },
          {
            text: "Grill chicken for 6-8 minutes per side until cooked through.",
            order: 2,
          },
          {
            text: "Let chicken rest for 5 minutes, then slice thinly.",
            order: 3,
          },
          {
            text: "In a large bowl, combine corn with mayonnaise, sour cream, and lime juice.",
            order: 4,
          },
          {
            text: "Stir in chili powder, cotija cheese, and cilantro.",
            order: 5,
          },
          { text: "Divide rice among 4 bowls.", order: 6 },
          {
            text: "Top each bowl with street corn mixture and sliced chicken.",
            order: 7,
          },
          {
            text: "Garnish with additional cotija cheese and lime wedges.",
            order: 8,
          },
        ],
      },
    ],
  },
  {
    title: "Teriyaki Sauce",
    description: "Homemade teriyaki sauce perfect for marinades and glazes.",
    servings: 8,
    prepTime: 10,
    cookTime: 10,
    tips: [
      "Store in refrigerator for up to 2 weeks",
      "Use as a marinade or finishing sauce",
      "Adjust sweetness by adding more or less brown sugar",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          { name: "Soy sauce", amount: "1/2 cup", order: 1 },
          { name: "Brown sugar", amount: "1/4 cup", order: 2 },
          { name: "Honey", amount: "2 tablespoons", order: 3 },
          { name: "Rice vinegar", amount: "2 tablespoons", order: 4 },
          { name: "Sesame oil", amount: "1 tablespoon", order: 5 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 6,
          },
          {
            name: "Ginger",
            amount: "1 tablespoon",
            preparation: "minced",
            order: 7,
          },
          {
            name: "Cornstarch",
            amount: "1 tablespoon",
            preparation: "mixed with 2 tbsp water",
            order: 8,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "In a small saucepan, combine soy sauce, brown sugar, honey, and rice vinegar.",
            order: 1,
          },
          { text: "Add sesame oil, garlic, and ginger.", order: 2 },
          {
            text: "Bring to simmer over medium heat and cook for 5 minutes.",
            order: 3,
          },
          {
            text: "Stir in cornstarch mixture and cook until sauce thickens.",
            order: 4,
          },
          { text: "Remove from heat and let cool slightly.", order: 5 },
          {
            text: "Transfer to a jar and refrigerate until ready to use.",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    title: "Turkey Meatballs",
    description:
      "Lean turkey meatballs with herbs and parmesan, perfect for pasta or sandwiches.",
    servings: 6,
    prepTime: 20,
    cookTime: 20,
    tips: [
      "Don't overmix the meatball mixture",
      "Use a cookie scoop for uniform meatballs",
      "Serve with marinara sauce and pasta",
    ],
    ingredientSections: [
      {
        name: "Meatballs",
        order: 1,
        ingredients: [
          { name: "Ground turkey", amount: "1 pound", order: 1 },
          { name: "Breadcrumbs", amount: "1/2 cup", order: 2 },
          {
            name: "Parmesan cheese",
            amount: "1/2 cup",
            preparation: "freshly grated",
            order: 3,
          },
          { name: "Egg", amount: "1", preparation: "beaten", order: 4 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 5,
          },
          {
            name: "Fresh parsley",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 6,
          },
          {
            name: "Oregano",
            amount: "1 teaspoon",
            preparation: "dried",
            order: 7,
          },
          { name: "Salt", amount: "1 teaspoon", order: 8 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 9 },
          { name: "Olive oil", amount: "2 tablespoons", order: 10 },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Preheat oven to 400°F and line a baking sheet with parchment paper.",
            order: 1,
          },
          {
            text: "In a large bowl, combine ground turkey, breadcrumbs, parmesan, and egg.",
            order: 2,
          },
          { text: "Add garlic, parsley, oregano, salt, and pepper.", order: 3 },
          {
            text: "Mix gently until just combined, being careful not to overmix.",
            order: 4,
          },
          {
            text: "Form mixture into 1-inch meatballs and place on prepared baking sheet.",
            order: 5,
          },
          {
            text: "Drizzle with olive oil and bake for 18-20 minutes until cooked through.",
            order: 6,
          },
          { text: "Serve hot with marinara sauce and pasta.", order: 7 },
        ],
      },
    ],
  },
  {
    title: "Turkey Potato Skillet",
    description: "One-pan turkey and potato skillet with vegetables and herbs.",
    servings: 4,
    prepTime: 15,
    cookTime: 25,
    tips: [
      "Cut potatoes in similar sizes for even cooking",
      "Don't overcrowd the skillet",
      "Serve with a fresh green salad for a complete meal",
    ],
    ingredientSections: [
      {
        name: "Ingredients",
        order: 1,
        ingredients: [
          { name: "Ground turkey", amount: "1 pound", order: 1 },
          { name: "Potatoes", amount: "4", preparation: "diced", order: 2 },
          { name: "Bell pepper", amount: "1", preparation: "diced", order: 3 },
          { name: "Onion", amount: "1", preparation: "diced", order: 4 },
          {
            name: "Garlic",
            amount: "3 cloves",
            preparation: "minced",
            order: 5,
          },
          { name: "Olive oil", amount: "2 tablespoons", order: 6 },
          { name: "Italian seasoning", amount: "1 tablespoon", order: 7 },
          { name: "Salt", amount: "1 teaspoon", order: 8 },
          { name: "Black pepper", amount: "1/2 teaspoon", order: 9 },
          {
            name: "Fresh parsley",
            amount: "1/4 cup",
            preparation: "chopped",
            order: 10,
          },
        ],
      },
    ],
    instructionSections: [
      {
        name: "Instructions",
        order: 1,
        instructions: [
          {
            text: "Heat olive oil in large skillet over medium-high heat.",
            order: 1,
          },
          {
            text: "Add potatoes and cook for 8-10 minutes until starting to brown.",
            order: 2,
          },
          {
            text: "Add bell pepper and onion, cook for 3-4 minutes.",
            order: 3,
          },
          {
            text: "Push vegetables to one side and add ground turkey.",
            order: 4,
          },
          {
            text: "Cook turkey, breaking up with spatula, until browned.",
            order: 5,
          },
          {
            text: "Add garlic, Italian seasoning, salt, and pepper.",
            order: 6,
          },
          {
            text: "Stir everything together and cook for 5 minutes until potatoes are tender.",
            order: 7,
          },
          { text: "Garnish with fresh parsley and serve hot.", order: 8 },
        ],
      },
    ],
  },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

  console.log("Creating recipes from denmandines.com...");

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const slug = generateSlug(recipe.title);

    await prisma.recipe.create({
      data: {
        title: recipe.title,
        slug: `${slug}-${i + 1}`,
        description: recipe.description,
        userId: user.id,
        servings: recipe.servings,
        tips: recipe.tips,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
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
