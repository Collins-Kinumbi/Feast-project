import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import About from "./pages/About/About";
import Create from "./pages/Create/Create";
import RecipeDetails from "./pages/Recipe Details/RecipeDetails";
import ProtectedRoute from "./components/Protected Routes/ProtectedRoutes";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyRecipes from "./pages/MyRecipes/MyRecipes";
import EditRecipe from "./pages/Edit/EditRecipe";
import ResetPassword from "./pages/Reset Password/ResetPassword";
import NotFound from "./pages/Not Found/NotFound";
import { SkeletonTheme } from "react-loading-skeleton";
import Categories from "./pages/Categories/Categories";

function App() {
  return (
    <div className="App">
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#c0c0c0">
        <BrowserRouter
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <Navbar />
          <main>
            <div className="pages">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories/:category" element={<Categories />} />
                <Route path="/search" element={<Search />} />

                <Route path="/about" element={<About />} />

                <Route path="/recipe/:id" element={<RecipeDetails />} />

                <Route
                  path="/resetPassword/:token"
                  element={<ResetPassword />}
                />

                <Route element={<ProtectedRoute />}>
                  <Route path="/create" element={<Create />} />
                  <Route path="/profile" element={<MyProfile />} />
                  <Route path="/my-recipes" element={<MyRecipes />} />
                  <Route path="edit-recipe/:id" element={<EditRecipe />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </BrowserRouter>
      </SkeletonTheme>
      <footer>
        <p>
          <span>Collins Kinumbi</span> Feast App @ {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
