import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import About from "./pages/About/About";
import Create from "./pages/Create/Create";

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

              <Route path="/create" element={<Create />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
