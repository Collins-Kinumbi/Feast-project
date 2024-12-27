import { useContext, useState } from "react";
import { modalContext } from "../../../contexts/Modal/modalContext";
import { authContext } from "../../../contexts/Auth/authContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, isLoading, error } = useContext(authContext);
  const { closeModal: onClose } = useContext(modalContext);

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
    </>
  );
}

export default Signup;
