import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, closePopupByOverlay } from "./utils.js";

// --- CONSTANTES ---

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

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__form-error_visible",
};

// Seletores de elementos DOM
const cardList = document.querySelector(".cards__list");
const profilePopup = document.querySelector(".popup-profile");
const newCardPopup = document.querySelector(".popup-newlocal");
const imagePopup = document.querySelector(".popup__image");
const popupImageEnlarge = document.querySelector(".popup__image-enlarge");
const popupImageTitle = document.querySelector(".popup__image-title");

const editProfileButton = document.querySelector(".profile__info-edit");
const addCardButton = document.querySelector(".profile__info-add");

const nameInput = document.querySelector(".popup__form-input-name");
const jobInput = document.querySelector(".popup__form-input-profession");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");

const cardTitleInput = document.querySelector(".popup__form-input-title");
const cardLinkInput = document.querySelector(".popup__form-input-link");

const profileForm = document.querySelector(".popup__form-person");
const cardForm = document.querySelector(".popup__form-local");

// --- FUNÇÕES DE MANIPULAÇÃO ---

function handleCardClick(name, link) {
  popupImageEnlarge.src = link;
  popupImageEnlarge.alt = name;
  popupImageTitle.textContent = name;
  openPopup(imagePopup);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.generateCard();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardList.prepend(cardElement);
}

// --- HANDLERS DE FORMULÁRIO ---

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };
  renderCard(newCardData);
  closePopup(newCardPopup);
  cardForm.reset();
}

// --- EVENT LISTENERS ---

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  profileFormValidator.resetValidation();
  openPopup(profilePopup);
});

addCardButton.addEventListener("click", () => {
  cardForm.reset();
  cardFormValidator.resetValidation();
  openPopup(newCardPopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

// Fechamento de popups (overlay e botão fechar)
[profilePopup, newCardPopup, imagePopup].forEach((popup) => {
  popup.addEventListener("mousedown", closePopupByOverlay);
  const closeButton = popup.querySelector(".popup__button-close");
  closeButton.addEventListener("click", () => closePopup(popup));
});

// --- INICIALIZAÇÃO ---

// Renderizar cartões iniciais
initialCards.forEach((card) => {
  renderCard(card);
});

// Inicialização da validação
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
