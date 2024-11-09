import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Modals/Login/Login";
import Signup from "../Modals/Signup/Signup";

function Navbar() {
  const [openModal, setOpenModal] = useState(null);

  function toggleModal(type) {
    setOpenModal((prev) => (prev === type ? null : type));
    if (openModal !== type) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }
  return (
    <header>
      <div className="navbar">
        <Link to="/" className="logo">
          Feast
        </Link>

        <div>
          <Link to="/search">
            <img src="images/search_icon.png" alt="Search" className="search" />
          </Link>
          <Link to="/about" className="about">
            About
          </Link>
          <p className="login" onClick={() => toggleModal("login")}>
            Login
          </p>
          <p className="signup" onClick={() => toggleModal("signup")}>
            Sign up
          </p>
        </div>
      </div>

      {/* Modals */}
      {openModal === "login" && <Login onClose={() => toggleModal("login")} />}
      {openModal === "signup" && (
        <Signup onClose={() => toggleModal("signup")} />
      )}
    </header>
  );
}

export default Navbar;
