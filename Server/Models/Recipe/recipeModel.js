import mongoose from "mongoose";

// Recipe schema
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Title field is required!"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Image field is required!"],
    },
    description: {
      type: String,
      required: [true, "Description field is required!"],
      maxlength: 500,
    },
    nutrition: {
      calories: Number,
      fats: Number,
      carbohydrates: Number,
      fibers: Number,
      sodium: Number,
      vitamins: Number,
      minerals: Number,
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients field is required!"],
    },
    instructions: {
      type: String,
      required: [true, "Instructions field is required!"],
    },
    ratings: {
      type: Number,
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
      ],
    },
    serving: {
      type: Number,
      required: [true, "Serving field is required!"],
    },
    yield: {
      type: Number,
      required: [true, "Yield field is required!"],
    },
  },
  { timestamps: true }
);

// movie model
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
