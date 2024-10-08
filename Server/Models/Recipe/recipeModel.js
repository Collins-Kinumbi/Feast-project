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
    tags: {
      type: [String],
      required: [true, "Tags field is required!"],
      enum: [
        "Vegan",
        "Vegetarian",
        "Gluten-Free",
        "Dairy-Free",
        "Quick",
        "Dessert",
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
