import { createContext, useState } from "react";

export const modalContext = createContext();

function ModalContextProvider({ children }) {
  const [openModal, setOpenModal] = useState(null);

  function toggleModal(type) {
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
    document.body.classList.remove("no-scroll");
  }

  return (
    <modalContext.Provider
      value={{ openModal, toggleModal, closeModal, setOpenModal }}
    >
      {children}
    </modalContext.Provider>
  );
}

export default ModalContextProvider;
