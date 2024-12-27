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
        <div className="feedback">
          <h2 className={modalContent.className}>
            {modalContent.title || "Notification"}
          </h2>
          <hr />
          <p className={"message"}>{modalContent.message || ""}</p>

          {/* Render dynamic actions */}
          {modalContent.actions && (
            <>
              <hr />
              <div className="actions">
                {modalContent.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={action.onClick}
                    className={action.className}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
