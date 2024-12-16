import { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "../Modals/Login/Login";
import Signup from "../Modals/Signup/Signup";
import Profile from "../Modals/Profile/Profile";
import { modalContext } from "../../contexts/Modal/modalContext";
import { authContext } from "../../contexts/Auth/authContext";

function Navbar() {
  const { openModal, toggleModal } = useContext(modalContext);
  const { user, isLoading } = useContext(authContext);
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
          {isLoading ? (
            <p></p>
          ) : user ? (
            <p onClick={() => toggleModal("profile")}>{user.username}</p>
          ) : (
            <>
              <p className="login" onClick={() => toggleModal("login")}>
                Login
              </p>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {openModal === "login" && <Login />}
      {openModal === "signup" && <Signup />}
      {openModal === "profile" && <Profile />}
    </header>
  );
}

export default Navbar;
