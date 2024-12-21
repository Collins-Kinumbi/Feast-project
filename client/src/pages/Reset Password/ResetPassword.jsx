import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/Auth/authContext";

function ResetPassword() {
  const { token } = useParams(); // Get the token from URL params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setUser } = useContext(authContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/auth/resetPassword/${token}`,
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
        throw new Error(data.message || "Something went wrong!");
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
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
