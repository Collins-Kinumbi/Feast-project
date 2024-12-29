import { useContext, useState } from "react";
import { modalContext } from "../../contexts/Modal/modalContext";

function UpdateDetailsForm({ closeForm }) {
  const { toggleModal } = useContext(modalContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateField = async (field, value) => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/api/v1/users/updateDetails",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ [field]: value }),
        }
      );

      const data = await response.json();

      if (data.status === "Success!") {
        // alert(`${field.charAt(0).toUpperCase() + field.slice(1)} updated!`);
        window.location.reload(); // Refresh to reflect changes
      } else {
        toggleModal("feedback", {
          title: "Error",
          message: `Failed to update ${field}. ${data.message}`,
          className: "error",
        });
      }
    } catch (error) {
      // console.error(`Error updating ${field}:`, error);
      toggleModal("feedback", {
        title: "Error",
        message: `Something went wrong while updating the ${field}.`,
        className: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Update Details</h2>

      {/* Update Username */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateField("username", username);
        }}
      >
        <label>
          New Username:
          <input
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Username"}
        </button>
      </form>

      <hr />

      {/* Update Email */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateField("email", email);
        }}
      >
        <label>
          New Email:
          <input
            type="email"
            placeholder="Enter new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Email"}
        </button>
      </form>

      <hr />

      {/* Update Bio */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateField("bio", bio);
        }}
      >
        <label>
          Update Bio:
          <textarea
            className="bio-field"
            placeholder="Add a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={150}
            rows="3"
            required
          ></textarea>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Bio"}
        </button>
      </form>

      {/* Close Form */}
      <button type="button" onClick={closeForm} className="close-button">
        Close
      </button>
    </div>
  );
}

export default UpdateDetailsForm;
