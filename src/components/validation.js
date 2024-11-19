import { validationSettings } from '../index.js';

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function toggleSubmitButtonState(inputList, submitButtonElement, validationSettings) {
    if (hasInvalidInput(inputList)) {
        submitButtonElement.disabled = true;
        submitButtonElement.classList.add(validationSettings.inactiveButtonClass);
    } else {
        submitButtonElement.disabled = false;
        submitButtonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
};

function showInputError(inputErrorSettings) {
    const errorElement = inputErrorSettings.formElement.querySelector(`.${inputErrorSettings.inputElement.id}-error`);

    inputErrorSettings.inputElement.classList.add(inputErrorSettings.validationSettings.inputErrorClass);
    errorElement.textContent = inputErrorSettings.errorMessage;
    errorElement.classList.add(inputErrorSettings.validationSettings.errorClass);
};

function hideInputError(inputErrorSettings) {
    const errorElement = inputErrorSettings.formElement.querySelector(`.${inputErrorSettings.inputElement.id}-error`);

    inputErrorSettings.inputElement.classList.remove(inputErrorSettings.validationSettings.inputErrorClass);
    errorElement.classList.remove(inputErrorSettings.validationSettings.errorClass);
    errorElement.textContent = '';
};

function isValid(formElement, inputElement, validationSettings) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError({formElement: formElement, 
            inputElement: inputElement, 
            errorMessage: inputElement.validationMessage, 
            validationSettings: validationSettings});
    } else {
        hideInputError({formElement: formElement, 
            inputElement: inputElement, 
            validationSettings: validationSettings});
    }
};

function setEventListeners(formElement, validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const submitButtonElement = formElement.querySelector(validationSettings.submitButtonSelector);

    toggleSubmitButtonState(inputList, submitButtonElement, validationSettings)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationSettings);
            toggleSubmitButtonState(inputList, submitButtonElement, validationSettings)
        });
    });
};

function enableValidation(validationSettings) {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationSettings);
    });
};

function clearValidation(formElement, validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const submitButtonElement = formElement.querySelector(validationSettings.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError({formElement: formElement, 
            inputElement: inputElement, 
            validationSettings: validationSettings});
    })

    toggleSubmitButtonState(inputList, submitButtonElement, validationSettings)
}

export { toggleSubmitButtonState, enableValidation, clearValidation }
