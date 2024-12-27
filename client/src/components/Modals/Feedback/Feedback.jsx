import { useContext } from "react";
import { modalContext } from "../../../contexts/Modal/modalContext";

function Feedback() {
  const { openModal, closeModal, modalContent } = useContext(modalContext);

  if (!openModal) return null; // Do not render if no modal is open

  return (
    <div className="modal">
      <div className="overlay" onClick={closeModal}></div>
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          X
        </button>

        <h2>{modalContent.title || "Notification"}</h2>
        <p className={`message ${modalContent.class}`}>
          {modalContent.message || ""}
        </p>

        {/* Render dynamic actions */}
        {modalContent.actions ? (
          <div className="modal-actions">
            {modalContent.actions.map((action, idx) => (
              <button
                key={idx}
                className="button"
                onClick={action.onClick || closeModal}
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : (
          <button className="button" onClick={closeModal}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export default Feedback;
