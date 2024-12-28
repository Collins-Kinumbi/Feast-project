import { useContext, useState } from "react";
import { authContext } from "../../contexts/Auth/authContext";
import { modalContext } from "../../contexts/Modal/modalContext";
import UpdateDetailsForm from "../../components/Update Details Form/UpdateDetailsForm";
import UpdatePasswordForm from "../../components/Update Password Form/UpdatePasswordForm";
import UpdateAvatarForm from "../../components/Update Avatar Form/UpdateAvatarForm";
import ProfileCard from "../../components/Profile card/ProfileCard";

function MyProfile() {
  const { logout } = useContext(authContext);
  const { toggleModal } = useContext(modalContext);
  const [showUpdateDetails, setShowUpdateDetails] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showUpdateAvatar, setShowUpdateAvatar] = useState(false);

  const handleDeactivateAccount = async () => {
    toggleModal("feedback", {
      title: "Confirm Deactivation",
      message:
        "Are you sure you want to deactivate your account? You can log in again to reactivate it.",
      actions: [
        {
          label: "Cancel",
          onClick: () => toggleModal(null), // Close modal
        },
        {
          label: "Deactivate",
          className: "deactivate-btn",
          onClick: async () => {
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
                toggleModal("feedback", {
                  title: "Success",
                  message: "Your account has been deactivated successfully.",
                  className: "success",
                });
                logout();
              } else {
                toggleModal("feedback", {
                  title: "Error",
                  message: "Failed to deactivate account.",
                  className: "error",
                });
              }
            } catch (error) {
              console.error("Error deactivating account:", error);
              toggleModal("feedback", {
                title: "Error",
                message: "Something went wrong while deactivating the account.",
                className: "error",
              });
            }
          },
        },
      ],
    });
  };

  return (
    <div className="profile-container">
      <div>
        <h1 className="heading">My Profile</h1>
        <ProfileCard />
      </div>
      <div className="profile-actions">
        <button onClick={() => setShowUpdateAvatar(!showUpdateAvatar)}>
          Upload Avatar
        </button>
        {showUpdateAvatar && (
          <UpdateAvatarForm closeForm={() => setShowUpdateAvatar(false)} />
        )}

        <button onClick={() => setShowUpdateDetails(!showUpdateDetails)}>
          Edit Profile
        </button>
        {showUpdateDetails && (
          <UpdateDetailsForm closeForm={() => setShowUpdateDetails(false)} />
        )}

        <button onClick={() => setShowUpdatePassword(!showUpdatePassword)}>
          Update Password
        </button>
        {showUpdatePassword && (
          <UpdatePasswordForm closeForm={() => setShowUpdatePassword(false)} />
        )}

        <button className="delete-btn" onClick={handleDeactivateAccount}>
          Deactivate Account
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
