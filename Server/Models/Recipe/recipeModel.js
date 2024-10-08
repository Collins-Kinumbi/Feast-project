import mongoose from "mongoose";

// Recipe schema
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  ingredients: {
    type: [String],
    required: [true, "Title is required!"],
  },
  instructions: {
    type: String,
    required: [true, "Title is required!"],
  },
  tags: [String],
});

// movie model
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
