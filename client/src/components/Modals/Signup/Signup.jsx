import { useState } from "react";

function Signup({ onClose }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function signup(email, username, password, confirmPassword) {
    setError(null);
    setIsLoading(true);
    const userData = {
      email,
      username,
      password,
      confirmPassword,
    };
    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", //include cookies
      });
      // console.log(response);

      const resData = await response.json();
      console.log(resData);

      if (!response.ok) {
        throw new Error(resData.message);
      }
      onClose();
    } catch (error) {
      // console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(
    //   `Email: ${email}, Username: ${username}, Password: ${password}, confirmPassword: ${confirmPassword}`
    // );
    signup(email, username, password, confirmPassword);
  }
  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={onClose}></div>
        <div className="modal-content">
          <button className="close-modal" onClick={onClose}>
            X
          </button>
          <div className="form-content">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                required
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <p className="error">{error}</p>}
              <button type="submit" className="button" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
