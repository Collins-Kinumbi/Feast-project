import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Connect to database
// mongoose
//   .connect(process.env.CONNECTION_STRING)
//   .then((req) => {
//     console.log("Connection to database successfull...");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

async function connect() {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("Connection to database successfull...");
}
connect().catch((err) => {
  console.log(err.message);
});

app.get("/", (req, res) => {
  res.send("hello");
});

export default app;
