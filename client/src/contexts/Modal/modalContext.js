import { createContext, useState } from "react";

export const modalContext = createContext();

function ModalContextProvider({ children }) {
  const [openModal, setOpenModal] = useState(null);
  const [modalContent, setModalContent] = useState({});

  function toggleModal(type, content = {}) {
    setModalContent(content); // Save content for the modal
    setOpenModal((prev) => {
      const isClosing = prev === type;
      if (isClosing) {
        document.body.classList.remove("no-scroll");
      } else {
        document.body.classList.add("no-scroll");
      }
      return isClosing ? null : type;
    });
  }

  function closeModal() {
    setOpenModal(null);
    setModalContent({}); // Clear content when modal closes
    document.body.classList.remove("no-scroll");
  }

  return (
    <modalContext.Provider
      value={{ openModal, modalContent, toggleModal, closeModal, setOpenModal }}
    >
      {children}
    </modalContext.Provider>
  );
}

export default ModalContextProvider;
