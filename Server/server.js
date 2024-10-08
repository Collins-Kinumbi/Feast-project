import "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 8000;

async function connect() {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("Connection to database successfull...");
}
connect().catch((err) => {
  console.log(err.message);
});

// Creating server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
