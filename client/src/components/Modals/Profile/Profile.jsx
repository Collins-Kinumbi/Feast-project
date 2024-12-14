import { useContext } from "react";
import { Link } from "react-router-dom";
import { modalContext } from "../../../contexts/Modal/modalContext";
import { authContext } from "../../../contexts/Auth/authContext";

function Profile() {
  const { closeModal } = useContext(modalContext);
  const { logout } = useContext(authContext);
  return (
    <div className="profile-modal">
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
