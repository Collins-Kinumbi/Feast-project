import { useContext, useState } from "react";
import { authContext } from "../../contexts/Auth/authContext";
import UpdateDetailsForm from "../../components/Update Details Form/UpdateDetailsForm";
import UpdatePasswordForm from "../../components/Update Password Form/UpdatePasswordForm";

function MyProfile() {
  const { user, logout } = useContext(authContext);
  const [showUpdateDetails, setShowUpdateDetails] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

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
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
      <div className="profile-actions">
        <button onClick={() => setShowUpdateDetails(!showUpdateDetails)}>
          Edit Profile
        </button>
        <button onClick={() => setShowUpdatePassword(!showUpdatePassword)}>
          Update Password
        </button>
        <button className="delete-btn" onClick={handleDeactivateAccount}>
          Deactivate Account
        </button>
      </div>

      {showUpdateDetails && (
        <UpdateDetailsForm closeForm={() => setShowUpdateDetails(false)} />
      )}
      {showUpdatePassword && (
        <UpdatePasswordForm closeForm={() => setShowUpdatePassword(false)} />
      )}
    </div>
  );
}

export default MyProfile;
