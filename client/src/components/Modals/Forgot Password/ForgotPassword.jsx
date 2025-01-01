import "../modal.css";
import { useContext, useState } from "react";
import { modalContext } from "../../../contexts/Modal/modalContext";
import Error from "../../Error/Error";

function ForgotPassword() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { closeModal: onClose } = useContext(modalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong!");
        return;
      }

      // Show success message
      setSuccess(data.message);

      // Close the modal after 5 seconds
      setTimeout(() => {
        onClose();
      }, 5000);
    } catch (err) {
      setError(err.message || "Unable to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          X
        </button>
        <h2>Forgot password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <Error message={error} />}
          {success && <p className="success">{success}</p>}
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
