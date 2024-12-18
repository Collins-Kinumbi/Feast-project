import { useState } from "react";

function UpdateAvatarForm({ closeForm }) {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    if (!avatar) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:4000/api/v1/users/updateAvatar",
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.status === "Success!") {
        alert("Avatar updated successfully!");
        closeForm();
        window.location.reload();
      } else {
        alert("Failed to update avatar.");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Something went wrong while uploading the avatar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Upload Avatar</h2>
      <form onSubmit={handleAvatarUpload}>
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={(e) => setAvatar(e.target.files[0])}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Avatar"}
        </button>
      </form>
      <button type="button" onClick={closeForm} className="close-button">
        Close
      </button>
    </div>
  );
}

export default UpdateAvatarForm;
