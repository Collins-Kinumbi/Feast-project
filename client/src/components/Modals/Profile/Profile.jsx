import { useContext } from "react";
import { Link } from "react-router-dom";
import { modalContext } from "../../../contexts/Modal/modalContext";

function Profile() {
  const { closeModal } = useContext(modalContext);
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
        <li className="logout" onClick={closeModal}>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Profile;
