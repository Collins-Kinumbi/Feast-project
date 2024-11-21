import { useContext, useState } from "react";
import { authContext } from "../../../contexts/Auth/authContext";
import { modalContext } from "../../../contexts/Modal/modalContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { closeModal: onClose } = useContext(modalContext);
  const { login, isLoading, error } = useContext(authContext);

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
              <button type="submit" className="button" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>

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
