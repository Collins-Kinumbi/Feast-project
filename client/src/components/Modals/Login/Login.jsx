function Login({ onClose }) {
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
            <form action="">
              <input type="email" required placeholder="Email" />

              <input type="password" required placeholder="Password" />

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
