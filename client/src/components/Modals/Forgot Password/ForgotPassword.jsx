import { useContext, useState } from "react";
import { modalContext } from "../../../contexts/Modal/modalContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { closeModal: onClose } = useContext(modalContext);
  return (
    <div className="modal">
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          X
        </button>
        <div className="form-content">
          <h2>Forgot password</h2>
          <form>
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
