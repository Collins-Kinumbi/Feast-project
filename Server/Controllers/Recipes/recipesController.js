// Route handlers
export function getRecipes(req, res) {
  res.status(200).json({ message: "All gotten!" });
}

export function getRecipe(req, res) {
  console.log(req.params);
  res.status(200).json({ message: "Gotten by id!" });
}

export function addRecipe(req, res) {
  console.log(req.body);
  res.status(200).json({ message: "Posted!" });
}

export function updateRecipe(req, res) {
  console.log(req.params);
  console.log(req.body);
  res.status(200).json({ message: "Patch!" });
}

export function deleteRecipe(req, res) {
  console.log(req.params);
  res.status(200).json({ message: "Deleted!" });
}
