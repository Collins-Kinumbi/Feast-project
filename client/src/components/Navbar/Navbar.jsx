import { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "../Modals/Login/Login";
import Signup from "../Modals/Signup/Signup";
import { modalContext } from "../../contexts/Modal/modalContext";

function Navbar() {
  const { openModal, toggleModal } = useContext(modalContext);
  return (
    <header>
      <div className="navbar">
        <Link to="/" className="logo">
          Feast
        </Link>

        <div>
          <Link to="/search">
            <img
              src="/images/search_icon.png"
              alt="Search"
              className="search"
            />
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
      {openModal === "login" && <Login />}
      {openModal === "signup" && <Signup />}
    </header>
  );
}

export default Navbar;
