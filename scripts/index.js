const popup = document.querySelector(".popup");
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

function openPopup(modal) {
  modal.classList.add("popup-opened");
  if (modal === personPopup) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  }
}
function closePopup(modal) {
  modal.classList.remove("popup-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(personPopup);
}

editButton.addEventListener("click", () => openPopup(personPopup));
addButton.addEventListener("click", () => openPopup(newLocalPopup));
closePersonButton.addEventListener("click", () => closePopup(personPopup));
closeNewLocal.addEventListener("click", () => closePopup(newLocalPopup));
formPerson.addEventListener("submit", handleProfileFormSubmit);
formNewLocal.addEventListener("submit", handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(titleInput.value, linkInput.value, cardWrapper);
  closePopup(newLocalPopup);
}

document.addEventListener("DOMContentLoaded", function () {
  const likeButtons = document.querySelectorAll(".card__button-like");
  likeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const likeIcon = this.querySelector(".card__like-icon");

      if (likeIcon.src.includes("Like.png")) {
        likeIcon.src = "./images/Like-dark.png";
      } else {
        likeIcon.src = "./images/Like.png";
      }
    });
  });
});

function getCardElement(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTrash = cardElement.querySelector(".card__trash");
  const popup = document.querySelector(".popup__image");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardTrash.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openPopup(popup);
    popupImage.src = link;
    const popupTitle = popup.querySelector(".popup__image-title");
    popupTitle.textContent = name;
  });

  const closeButton = popup.querySelector(".popup__button-close");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  container.prepend(getCardElement(name, link));
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardWrapper);
});
