import { useState } from "react";

function UpdateDetailsForm({ closeForm }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/users/updateDetails",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username }),
        }
      );
      const data = await response.json();

      if (data.status === "Success!") {
        alert("Username updated successfully!");
        closeForm();
        window.location.reload(); // Refresh page to reflect changes
      } else {
        alert("Failed to update username.");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      alert("Something went wrong while updating the username.");
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/users/updateDetails",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (data.status === "Success!") {
        alert("Email updated successfully!");
        closeForm();
        window.location.reload(); // Refresh page to reflect changes
      } else {
        alert("Failed to update email.");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      alert("Something went wrong while updating the email.");
    }
  };

  return (
    <div className="form-card">
      <h2>Update Details</h2>

      {/* Form to update Username */}
      <form onSubmit={handleUpdateUsername}>
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
        <button type="submit">Update Username</button>
      </form>

      <hr />

      {/* Form to update Email */}
      <form onSubmit={handleUpdateEmail}>
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
        <button type="submit">Update Email</button>
      </form>

      {/* Close Form Button */}
      <button type="button" onClick={closeForm} className="close-button">
        Close
      </button>
    </div>
  );
}

export default UpdateDetailsForm;
