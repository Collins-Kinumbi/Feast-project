import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import Recipe from "../Models/Recipe/recipeModel.js";

// Connect to database
async function connect() {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("Connection to database successfull...");
}
connect().catch((err) => {
  console.log(err.message);
});

// Read recipe.json file
const recipes = JSON.parse(fs.readFileSync("./data/recipes.json"));

// Delete all existing documents from recipes collection
async function deleteAll() {
  try {
    await Recipe.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
}

// Import recipe data
async function importData() {
  try {
    await Recipe.create(recipes);
    console.log("Data successfully imported!");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
}

console.log(process.argv);

if (process.argv[2] === "--delete") {
  deleteAll();
}
if (process.argv[2] === "--import") {
  importData();
}

//run node ./data/seed.js --delete/--import
