import { useContext, useState } from "react";
import { authContext } from "../../../contexts/Auth/authContext";
import { modalContext } from "../../../contexts/Modal/modalContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { closeModal: onClose, toggleModal } = useContext(modalContext);
  const { login, isLoading, loginError } = useContext(authContext);

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
            {loginError && <p className="error">{loginError}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="queries">
              <div>
                <p className="forgot-password">
                  Forgot{" "}
                  <span
                    onClick={() => {
                      toggleModal("forgotPassoword");
                    }}
                  >
                    Password?
                  </span>
                </p>
              </div>
              <div>
                <p className="no-account">
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      toggleModal("signup");
                    }}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
