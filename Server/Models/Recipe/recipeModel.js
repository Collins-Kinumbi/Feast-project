import mongoose from "mongoose";

// Recipe schema
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Title field is required!"],
      unique: true,
      maxlength: [100, "Recipe name must not be more that 100 characters long"],
      minlength: [2, "Recipe name must not be less that 2 characters long"],
    },
    image: {
      type: String,
      required: [true, "Image field is required!"],
    },
    description: {
      type: String,
      required: [true, "Description field is required!"],
      maxlength: 500,
      trim: true,
    },
    nutrition: {
      calories: Number,
      fats: Number,
      carbohydrates: Number,
      proteins: Number,
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients field is required!"],
    },
    instructions: {
      type: [String],
      required: [true, "Instructions field is required!"],
    },
    ratings: {
      type: Number,
      min: [1, "Ratings must be 1.0 or above"],
      max: [5, "Ratings must be 5.0 or below"],
    },
    totalRatings: {
      type: Number,
    },
    categories: {
      type: [String],
      required: [true, "Tags field is required!"],
      enum: [
        "Vegan",
        "Vegetarian",
        "Gluten-Free",
        "Dairy-Free",
        "Quick",
        "Dessert",
        "Low-Carb",
        "High-Protein",
        "Paleo",
        "Keto",
        "Whole30",
        "Low-Fat",
        "Sugar-Free",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Appetizer",
        "Salad",
        "Soup",
        "Side Dish",
        "Main Course",
        "Beverage",
        "Holiday",
        "Spicy",
        "Comfort Food",
        "Baked",
        "Grilled",
        "Raw",
        "Slow Cooker",
        "Instant Pot",
        "Healthy",
        "Kid-Friendly",
        "Party",
        "BBQ",
        "Frozen",
        "Quick & Easy",
        "Carnivore",
        "Nutrient-Dense",
      ],
    },
    serving: {
      type: Number,
      required: [true, "Serving field is required!"],
    },
    servingYield: {
      type: Number,
      required: [true, "Yield field is required!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //Links Recipe model to User model,
      required: true,
    },
  },
  { timestamps: true }
);

// Recipe model
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
