import "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 8000;

async function connect() {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("Connection to database successfull...");
}

connect().catch((error) => {
  console.log(`${error.name}: ${error.message}`);
});

// Creating server
const server = app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// Handling rejected promises
process.on("unhandledRejection", (error) => {
  console.log(`${error.name}: ${error.message}`);
  console.log("Unhandled rejection occured, shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
