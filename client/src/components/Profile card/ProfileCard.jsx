import "./profile-card.css";
import { useContext } from "react";
import { authContext } from "../../contexts/Auth/authContext";
import LazyLoadedImage from "../Lazy Load Image/LazyLoadedImage";

function ProfileCard() {
  const { user } = useContext(authContext);
  return (
    <div className="profile-card">
      <div>
        {user.avatar && (
          <LazyLoadedImage
            src={user.avatar}
            alt={user.username}
            className="avatar"
          />
        )}
      </div>
      <div>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Bio:</strong> {user.bio || "No bio added yet."}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
