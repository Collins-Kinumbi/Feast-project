import "./reset-form.css";
import { useContext, useState } from "react";
import { authContext } from "../../contexts/Auth/authContext";
import { useNavigate } from "react-router-dom";
import Error from "../Error/Error";

export default function ResetForm({ token }) {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { setUser } = useContext(authContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/auth/resetPassword/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ password, confirmPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong!");
        return;
      }

      // Update the user state in auth context
      setUser(data.data.user);

      setSuccess("Password reset successful! You are now logged in.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message || "Unable to reset password.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="form-content">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Error message={error} />}
        {success && <p className="success">{success}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
