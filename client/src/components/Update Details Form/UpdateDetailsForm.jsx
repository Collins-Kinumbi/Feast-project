import { useState } from "react";

function UpdateDetailsForm({ closeForm }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/users/updateDetails",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, email }),
        }
      );
      const data = await response.json();

      if (data.status === "Success!") {
        alert("Profile updated successfully!");
        closeForm();
        window.location.reload(); // refresh to get updated details
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Update details error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Update Details</h2>
      <label>
        Username:
        <input
          type="text"
          placeholder="Enter new username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          placeholder="Enter new email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <div className="form-actions">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={closeForm}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UpdateDetailsForm;
