export function openPopup(modal) {
  modal.classList.add("popup-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(modal) {
  modal.classList.remove("popup-opened");
  document.removeEventListener("keydown", handleEscClose);
}

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

export const closePopupByOverlay = (evt) => {
  if (evt.target.classList.contains("popup-opened")) {
    closePopup(evt.target);
  }
};
