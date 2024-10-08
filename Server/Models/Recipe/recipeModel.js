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
    },
    nutrition: [
      {
        calories: {
          type: Number,
          required: [true, "Calories field is required!"],
        },
        fats: {
          type: Number,
          required: [true, "Fats field is required!"],
        },
        carbohydrates: {
          type: Number,
          required: [true, "Carbohydrates field is required!"],
        },
        fibers: {
          type: Number,
          required: [true, "Fibers field is required!"],
        },
        sodium: {
          type: Number,
          required: [true, "Sodium field is required!"],
        },
        vitamins: {
          type: Number,
          required: [true, "Vitamins field is required!"],
        },
        minerals: {
          type: Number,
          required: [true, "Minerals field is required!"],
        },
      },
    ],
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
    },
    serving: {
      type: Number,
      required: [true, "Serving field is required!"],
    },
    yield: {
      type: Number,
      required: [true, "yield field is required!"],
    },
  },
  { timestamps: true }
);

// movie model
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
