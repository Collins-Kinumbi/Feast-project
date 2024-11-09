import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Modals/Login/Login";
import Signup from "../Modals/Signup/Signup";

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  function toggleLogin() {
    setShowLoginModal(!showLoginModal);
    if (!showLoginModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }

  function toggleSignup() {
    setShowSignupModal(!showSignupModal);
    if (!showSignupModal) {
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
          <p className="login" onClick={toggleLogin}>
            Login
          </p>
          <p className="signup" onClick={toggleSignup}>
            Sign up
          </p>
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && <Login onClose={toggleLogin} />}
      {showSignupModal && <Signup onClose={toggleSignup} />}
    </header>
  );
}

export default Navbar;
