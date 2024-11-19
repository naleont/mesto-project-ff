import './styles/index.css';
import { openPopup, closePopup } from './components/modal.js'
import { addCard, setCardDeleteHandler, setLikeButtonHandler } from './components/card.js'
import { validationSettings, toggleSubmitButtonState, enableValidation, clearValidation } from './components/validation.js'
import { profileInfoPromise, cardsInfoPromise, saveProfileRequest, addCardRequest, saveAvatarRequest } from './components/api.js'

export const profileInfo = {}

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

// Вывод карточек на страницу
function renderCard(item, method = "prepend") {
    const addCardArgument = {
        cardInformation: item,
        cardDeleteHandler: setCardDeleteHandler,
        imageClickHandler: setImageClickHandler,
        likeButtonHandler: setLikeButtonHandler,
    };
    const cardElement = addCard(addCardArgument);
    placesList[ method ](cardElement);
}

// Работа с модальными окнами
function getUserValues() {
    formProfile.elements.name.value = profileTitle.textContent;
    formProfile.elements.description.value = profileDescription.textContent;
}

editButton.addEventListener('click', () => {
    openPopup(editPopup);
    getUserValues();
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

function setImageClickHandler(cardImage) {
    cardImage.addEventListener('click', () => {

        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        popupText.textContent = cardImage.alt;

        openPopup(imagePopup);
    })
}

// Работа с формами
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    dataLoading(buttonLoadingProfile, true)
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    saveProfileRequest(nameValue, jobValue)
    .then((res) => {
        if (res.ok) {
            profileTitle.textContent = nameValue;
            profileDescription.textContent = jobValue;
            closePopup(editPopup);
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        dataLoading(buttonLoading, false)
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
    .finally(() => {
        dataLoading(buttonLoading, false)
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
    .finally(() => {
        dataLoading(buttonLoading, false)
    })
}

formProfile.addEventListener('submit', handleProfileFormSubmit);
formPlaces.addEventListener('submit', handleCardFormSubmit);
formProfilePhoto.addEventListener('submit', handleProfilePhotoSubmit);

enableValidation(validationSettings);

Promise.all([profileInfoPromise, cardsInfoPromise])
.then((data) => {
    profileInfo.name = data[0].name;
    profileInfo.about = data[0].about;
    profileInfo.avatar = data[0].avatar;
    profileInfo._id = data[0]._id;

    profileTitle.textContent = profileInfo.name;
    profileDescription.textContent = profileInfo.about;
    profileAvatar.style.backgroundImage = `url('${profileInfo.avatar}')`

    data[1].forEach ((item) => {
        renderCard(item, "append");
    });
})
    
function dataLoading(buttonLoading, isLoading) {
    if (isLoading){
        buttonLoading.textContent = 'Сохранение...'
    } else {
        buttonLoading.textContent = 'Сохранить'
    }
}
