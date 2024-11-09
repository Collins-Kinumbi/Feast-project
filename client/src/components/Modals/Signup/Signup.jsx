function Signup({ onClose }) {
  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={onClose}></div>
        <div className="modal-content">
          <h2>Signup</h2>
          {/* Signup form fields here */}
          <button className="close-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
