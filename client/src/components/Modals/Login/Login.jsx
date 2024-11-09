function Login({ onClose }) {
  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={onClose}></div>
        <div className="modal-content">
          <h2>Login</h2>
          {/* login form fields here */}
          <button className="close-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
