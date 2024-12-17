import { useState } from "react";

function UpdateDetailsForm({ closeForm }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdateField = async (field, value) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/users/updateDetails",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ [field]: value }), // Dynamic field update
        }
      );

      const data = await response.json();

      if (data.status === "Success!") {
        alert(
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } updated successfully!`
        );
        closeForm();
        window.location.reload(); // Refresh page to reflect changes
      } else {
        alert(`Failed to update ${field}.`);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      alert(`Something went wrong while updating the ${field}.`);
    }
  };

  return (
    <div className="form-card">
      <h2>Update Details</h2>

      {/* Form to update Username */}
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
        <button type="submit">Update Username</button>
      </form>

      <hr />

      {/* Form to update Email */}
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
