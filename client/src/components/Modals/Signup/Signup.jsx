function Signup({ onClose }) {
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
            <form action="">
              <input type="email" required placeholder="Email" />
              <input type="text" required placeholder="Username" />

              <input type="password" required placeholder="Password" />
              <input type="password" required placeholder="Confirm password" />

              <button type="submit" className="sign-up-btn">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
