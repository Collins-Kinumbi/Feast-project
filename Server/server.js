import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT || 8000;

// Creating server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
