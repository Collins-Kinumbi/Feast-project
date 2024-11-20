import { useState } from "react";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function login(email, password) {
    setError(null); //Reset any existing errors

    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //Include cookies
        body: JSON.stringify({ email, password }),
      });

      // console.log(response);

      const resData = await response.json();
      console.log(resData);

      if (!response.ok) {
        throw new Error(resData.message);
      }
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
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
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error">{error}</p>}
              <button type="submit">Login</button>

              <div className="queries">
                <p className="forgot-password">
                  Forgot <span>Password?</span>
                </p>

                <p className="no-account">
                  Don't have an account? <span>Sign up</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
