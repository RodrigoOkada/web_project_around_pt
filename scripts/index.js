const popupImage = document.querySelector(".popup__image-enlarge");
const editButton = document.querySelector(".profile__info-edit");
const formPerson = document.querySelector(".popup__form-person");
const formNewLocal = document.querySelector(".popup__form-local");
const nameInput = document.querySelector(".popup__form-input-name");
const jobInput = document.querySelector(".popup__form-input-profession");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://images.unsplash.com/photo-1670844677439-98dca0d1983f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
const cardWrapper = document.querySelector(".cards__list");
const titleInput = document.querySelector(".popup__form-input-title");
const linkInput = document.querySelector(".popup__form-input-link");
const personPopup = document.querySelector(".popup-profile");
const newLocalPopup = document.querySelector(".popup-newlocal");
const addButton = document.querySelector(".profile__info-add");
const closePersonButton = personPopup.querySelector(".popup__button-close");
const closeNewLocal = newLocalPopup.querySelector(".popup__button-close");

// --- LÓGICA DE VALIDAÇÃO ---

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__form-input_type_error");
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__form-input_type_error");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__form-button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__form-button_disabled");
    buttonElement.disabled = false;
  }
};

const resetValidation = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__form-input"),
  );
  const buttonElement = formElement.querySelector(".popup__form-button");

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__form-input"),
  );
  const buttonElement = formElement.querySelector(".popup__form-button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

// --- FUNÇÕES DE POPUP ---

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

function openPopup(modal) {
  modal.classList.add("popup-opened");
  document.addEventListener("keydown", handleEscClose);

  if (modal === personPopup) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    resetValidation(formPerson);
  } else if (modal === newLocalPopup) {
    formNewLocal.reset();
    resetValidation(formNewLocal);
  }
}
function closePopup(modal) {
  modal.classList.remove("popup-opened");
  document.removeEventListener("keydown", handleEscClose);
}

const closePopupByOverlay = (evt) => {
  if (evt.target.classList.contains("popup-opened")) {
    closePopup(evt.target);
  }
};

// Ouvintes de fechamento por sobreposição a todos os popups
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", closePopupByOverlay);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(personPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(titleInput.value, linkInput.value, cardWrapper);
  closePopup(newLocalPopup);
}

editButton.addEventListener("click", () => openPopup(personPopup));
addButton.addEventListener("click", () => openPopup(newLocalPopup));
closePersonButton.addEventListener("click", () => closePopup(personPopup));
closeNewLocal.addEventListener("click", () => closePopup(newLocalPopup));
formPerson.addEventListener("submit", handleProfileFormSubmit);
formNewLocal.addEventListener("submit", handleCardFormSubmit);

// --- FUNÇÕES DE CARD ---

function getCardElement(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTrash = cardElement.querySelector(".card__trash");
  const cardLikeButton = cardElement.querySelector(".card__button-like");
  const imagePopup = document.querySelector(".popup__image");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardTrash.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openPopup(imagePopup);
    popupImage.src = link;
    popupImage.alt = name;
    const popupTitle = imagePopup.querySelector(".popup__image-title");
    popupTitle.textContent = name;
  });

  cardLikeButton.addEventListener("click", function () {
    const likeIcon = this.querySelector(".card__like-icon");
    if (likeIcon.src.includes("Like.png")) {
      likeIcon.src = "./images/Like-dark.png";
    } else {
      likeIcon.src = "./images/Like.png";
    }
  });

  const closeImageButton = imagePopup.querySelector(".popup__button-close");
  closeImageButton.addEventListener("click", () => {
    closePopup(imagePopup);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  container.prepend(getCardElement(name, link));
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardWrapper);
});
