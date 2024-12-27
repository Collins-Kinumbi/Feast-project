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
        {modalContent.actions?.map((action, idx) => (
          <button
            key={idx}
            className="button"
            onClick={action.onClick || closeModal}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
