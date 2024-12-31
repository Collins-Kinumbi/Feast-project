import "./navbar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "../Modals/Login/Login";
import Signup from "../Modals/Signup/Signup";
import Profile from "../Modals/Profile/Profile";
import { modalContext } from "../../contexts/Modal/modalContext";
import { authContext } from "../../contexts/Auth/authContext";
import ForgotPassword from "../Modals/Forgot Password/ForgotPassword";
import LazyLoadedImage from "../Lazy Load Image/LazyLoadedImage";
import Feedback from "../Modals/Feedback/Feedback";

function Navbar() {
  const { openModal, toggleModal } = useContext(modalContext);
  const { user, isLoading } = useContext(authContext);
  return (
    <header className="navbar-wrapper">
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
            <p onClick={() => toggleModal("profile")}>
              {user.avatar ? (
                <LazyLoadedImage
                  className="nav-avatar"
                  src={user.avatar}
                  alt={user.username}
                />
              ) : (
                <span className="username">
                  {user.username.length > 10
                    ? `${user.username.substring(0, 10)}...`
                    : user.username}
                </span>
              )}
            </p>
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
      {openModal === "forgotPassoword" && <ForgotPassword />}
      {openModal === "signup" && <Signup />}
      {openModal === "profile" && <Profile />}
      {openModal === "feedback" && <Feedback />}
    </header>
  );
}

export default Navbar;
