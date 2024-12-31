import "./profile.css";
import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { modalContext } from "../../../contexts/Modal/modalContext";
import { authContext } from "../../../contexts/Auth/authContext";

function Profile() {
  const { closeModal } = useContext(modalContext);
  const { logout } = useContext(authContext);

  const modalRef = useRef(null);

  // Handle click outside to close profile modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="profile-modal" ref={modalRef}>
      <ul>
        <li>
          <Link to="/profile" onClick={closeModal}>
            View Profile
          </Link>
        </li>
        <li>
          <Link to="/my-recipes" onClick={closeModal}>
            My Recipes
          </Link>
        </li>
        <li
          className="logout"
          onClick={() => {
            closeModal();
            logout();
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Profile;
