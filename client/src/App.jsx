import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";

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
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
