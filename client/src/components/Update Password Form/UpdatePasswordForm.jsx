import { useContext, useState } from "react";
import { modalContext } from "../../contexts/Modal/modalContext";

function UpdatePasswordForm({ closeForm }) {
  const { toggleModal } = useContext(modalContext);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (newPassword !== confirmNewPassword) {
        throw new Error("New password and confirm new password do not match!");
      }

      const response = await fetch(
        "http://localhost:4000/api/v1/users/updatePassword",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmNewPassword,
          }),
        }
      );
      const data = await response.json();

      if (data.status === "Success!") {
        toggleModal("feedback", {
          title: "Success",
          message: "Password updated!",
          className: "success",
        });
        closeForm();
      } else {
        toggleModal("feedback", {
          title: "Error",
          message: `${data.message}`,
          className: "error",
        });
      }
    } catch (error) {
      toggleModal("feedback", {
        title: "Error",
        message: `${error.message}`,
        className: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Update Password</h2>
      <label>
        Current Password:
        <input
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </label>
      <label>
        New Password:
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm New Password:
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
      </label>
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
        <button type="button" onClick={closeForm}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
