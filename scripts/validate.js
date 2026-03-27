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
