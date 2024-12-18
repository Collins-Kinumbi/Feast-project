import { useContext, useState } from "react";
import { authContext } from "../../contexts/Auth/authContext";
import UpdateDetailsForm from "../../components/Update Details Form/UpdateDetailsForm";
import UpdatePasswordForm from "../../components/Update Password Form/UpdatePasswordForm";
import UpdateAvatarForm from "../../components/Update Avatar Form/UpdateAvatarForm";

function MyProfile() {
  const { user, logout } = useContext(authContext);
  const [showUpdateDetails, setShowUpdateDetails] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showUpdateAvatar, setShowUpdateAvatar] = useState(false);

  const handleDeactivateAccount = async () => {
    const confimDeactivate = window.confirm(
      "Are you sure you want to Deactivate your account? You can login again to reactive it."
    );
    if (confimDeactivate) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/users/deleteAccount",
          {
            method: "DELETE",
            credentials: "include", // to send cookies
          }
        );
        const data = await response.json();
        if (data.status === "Success!") {
          alert("Your account has been deactivated successfully.");
          logout();
        } else {
          alert("Failed to deactivate account.");
        }
      } catch (error) {
        console.error("Error deactivate account:", error);
        alert("Something went wrong while deactivating the account.");
      }
    }
  };

  return (
    <div className="profile-container">
      <div>
        <h1>My Profile</h1>
        <div className="profile-card">
          <div>
            {user.avatar && (
              <img src={user.avatar} alt="User Avatar" className="avatar" />
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
      </div>
      <div className="profile-actions">
        {/* Upload/Update Avatar */}
        <button onClick={() => setShowUpdateAvatar(!showUpdateAvatar)}>
          Upload Avatar
        </button>
        {showUpdateAvatar && (
          <UpdateAvatarForm closeForm={() => setShowUpdateAvatar(false)} />
        )}

        {/* Update details */}
        <button onClick={() => setShowUpdateDetails(!showUpdateDetails)}>
          Edit Profile
        </button>
        {showUpdateDetails && (
          <UpdateDetailsForm closeForm={() => setShowUpdateDetails(false)} />
        )}

        {/* Update password */}
        <button onClick={() => setShowUpdatePassword(!showUpdatePassword)}>
          Update Password
        </button>
        {showUpdatePassword && (
          <UpdatePasswordForm closeForm={() => setShowUpdatePassword(false)} />
        )}

        {/* Deactivate account */}
        <button className="delete-btn" onClick={handleDeactivateAccount}>
          Deactivate Account
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
