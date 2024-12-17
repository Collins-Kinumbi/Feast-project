import { useState } from "react";

function UpdatePasswordForm({ closeForm }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        alert("Password updated successfully!");
        closeForm();
      } else {
        alert(data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Update password error:", error);
      alert("Something went wrong!");
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
        <button type="submit">Update Password</button>
        <button type="button" onClick={closeForm}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
