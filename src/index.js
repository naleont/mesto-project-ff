import './styles/index.css';
import { openPopup, closePopup } from './components/modal.js'
import { confirmationButton, addCard, cardDeleteHandler, deleteCard, setLikeButtonHandler } from './components/card.js'
import { toggleSubmitButtonState, enableValidation, clearValidation } from './components/validation.js'
import { profileInfoPromise, cardsInfoPromise, saveProfileRequest, addCardRequest, saveAvatarRequest } from './components/api.js'

export let profileInfo = {}

const placesList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const profilePhotoPopup = document.querySelector('.popup_type_profile-photo ');

const formProfile = document.forms.edit_profile
const formPlaces = document.forms['new-place']
const formProfilePhoto = document.forms['profile-photo']

const nameInput = formProfile.name
const jobInput = formProfile.description
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const inputListPlaces = Array.from(formPlaces.querySelectorAll('.popup__input'));
const submitButtonElementPlaces = formPlaces.querySelector('.popup__button');

const buttonLoadingProfile = formProfile.querySelector('.popup__button')
const buttonLoadingPlaces = formProfile.querySelector('.popup__button')
const buttonLoadingAvatar = formProfile.querySelector('.popup__button')

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupText = imagePopup.querySelector('.popup__caption');

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'input-error-is-active'
}

// Вывод карточек на страницу
function renderCard(item, method = "prepend") {
    const addCardArgument = {
        cardInformation: item,
        profileInfo: profileInfo,
        cardDeleteHandler: cardDeleteHandler,
        imageClickHandler: setImageClickHandler,
        likeButtonHandler: setLikeButtonHandler,
    };
    const cardElement = addCard(addCardArgument);
    placesList[ method ](cardElement);
}

// Работа с модальными окнами
function fillProfileFormInputs() {
    formProfile.elements.name.value = profileTitle.textContent;
    formProfile.elements.description.value = profileDescription.textContent;
}

editButton.addEventListener('click', () => {
    openPopup(editPopup);
    fillProfileFormInputs();
    clearValidation(formProfile, validationSettings)
})

addButton.addEventListener('click', () => {
    formPlaces.reset()
    openPopup(addPopup);
    clearValidation(formPlaces, validationSettings)
    toggleSubmitButtonState(inputListPlaces, submitButtonElementPlaces, validationSettings)
})

profileAvatar.addEventListener('click', () => {
    formProfilePhoto.reset()
    openPopup(profilePhotoPopup);
    clearValidation(formProfilePhoto, validationSettings)
})

confirmationButton.addEventListener('click', deleteCard)

function openImage(cardImage) {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupText.textContent = cardImage.alt;

    openPopup(imagePopup);
}

function setImageClickHandler(cardImage) {
    cardImage.addEventListener('click', () => {
        openImage(cardImage)
    })
}

// Работа с формами
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    dataLoading(buttonLoadingProfile, true)
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    saveProfileRequest(nameValue, jobValue)
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closePopup(editPopup);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        dataLoading(buttonLoadingProfile, false)
    })
}


function handleCardFormSubmit(evt) {
    evt.preventDefault();
    dataLoading(buttonLoadingPlaces, true)
    const cardInfo = {
        name: formPlaces['place-name'].value,
        link: formPlaces.link.value
    }
    addCardRequest(cardInfo)
    .then((data) => {
        renderCard(data);
        formPlaces.reset();
        closePopup(addPopup);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        dataLoading(buttonLoadingPlaces, false)
    })
}

function handleProfilePhotoSubmit(evt) {
    evt.preventDefault();
    dataLoading(buttonLoadingAvatar, true)
    const newPhoto = formProfilePhoto.elements.link.value

    saveAvatarRequest(newPhoto)
    .then((data) => {
        profileAvatar.style.backgroundImage = `url('${data.avatar}')`
        closePopup(profilePhotoPopup)
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        dataLoading(buttonLoadingAvatar, false)
    })
}

formProfile.addEventListener('submit', handleProfileFormSubmit);
formPlaces.addEventListener('submit', handleCardFormSubmit);
formProfilePhoto.addEventListener('submit', handleProfilePhotoSubmit);

enableValidation(validationSettings);

Promise.all([profileInfoPromise, cardsInfoPromise])
.then(([profile, cards]) => {
    profileInfo = profile;

    profileTitle.textContent = profileInfo.name;
    profileDescription.textContent = profileInfo.about;
    profileAvatar.style.backgroundImage = `url('${profileInfo.avatar}')`

    cards.forEach ((item) => {
        renderCard(item, "append");
    });
})
.catch((err) => {
    console.log(err);
})
    
function dataLoading(buttonLoading, isLoading) {
    buttonLoading.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
}
