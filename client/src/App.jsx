import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import About from "./pages/About/About";
import Create from "./pages/Create/Create";
import RecipeDetails from "./pages/Recipe/RecipeDetails";
import ProtectedRoute from "./components/Protected Routes/ProtectedRoutes";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyRecipes from "./pages/MyRecipes/MyRecipes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <main>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/search" element={<Search />} />

              <Route path="/about" element={<About />} />

              <Route path="/recipe/:id" element={<RecipeDetails />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/create" element={<Create />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/my-recipes" element={<MyRecipes />} />
              </Route>
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
