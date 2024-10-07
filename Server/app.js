import express from "express";
import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

/* API recipe routes */
// All recipes
app
  .route("/api/v1/recipes")
  // GET all recipes
  .get((req, res) => {
    res.status(200).json({ message: "All gotten!" });
  })
  // POST/ADD a recipe
  .post((req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "Posted!" });
  });

//Single recipe
app
  .route("/api/v1/recipes/:id")
  // GET a recipe
  .get((req, res) => {
    console.log(req.params);
    res.status(200).json({ message: "Gotten by id!" });
  })
  // UPDATE a recipe
  .patch((req, res) => {
    console.log(req.params);
    console.log(req.body);
    res.status(200).json({ message: "Patch!" });
  })
  // Delete a recipe
  .delete((req, res) => {
    console.log(req.params);
    res.status(200).json({ message: "Deleted!" });
  });

export default app;
