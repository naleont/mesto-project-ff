import './styles/index.css';
import { initialCards } from './cards.js';
import { openPopup, closePopup, closePopupClick, closePopupKey } from './components/modal.js'
import { addCard, setCardDeleteHandler, setLikeButtonHandler } from './components/card.js'

const placesList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');

const formProfile = document.forms.edit_profile
const formPlaces = document.forms['new-place']

const nameInput = formProfile.name
const jobInput = formProfile.description
const profileTitle = document.querySelector('.profile__title');
const profileDcription = document.querySelector('.profile__description');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupText = imagePopup.querySelector('.popup__caption');

// Вывод карточек на страницу
function renderCard(cardElement, method = "prepend") {
    placesList[ method ](cardElement);
};

initialCards.forEach (function (item) {
    const addCardArgument = {cardInformation: item, 
        cardDeleteHandler: setCardDeleteHandler, 
        imageClickHandler: setImageClickHandler, 
        likeButtonHandler: setLikeButtonHandler
    }
    const cardElement = addCard(addCardArgument);
    renderCard(cardElement, "append");
});

// Работа с модальными окнами
function getUserValues() {
    formProfile.elements.name.value = profileTitle.textContent;
    formProfile.elements.description.value = profileDcription.textContent;
}

editButton.addEventListener('click', function() {
    openPopup(editPopup);
    getUserValues();
})

addButton.addEventListener('click', function() {
    openPopup(addPopup);
})

function setImageClickHandler(cardElement) {
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', function() {

        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        popupText.textContent = cardImage.alt;

        openPopup(imagePopup);
        imagePopup.addEventListener('click', closePopupClick);
        document.addEventListener('keydown', closePopupKey);
})}

// Работа с формами
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileTitle.textContent = nameValue;
    profileDcription.textContent = jobValue;
    closePopup(editPopup);
}

function handleCardFormSubmit(evt) {
    // прошлое название функции addPlaceSubmit начинается с глагола в начальной форме: add - добавлять
    evt.preventDefault();
    const cardInfo = {
        name: formPlaces['place-name'].value,
        link: formPlaces.link.value
    }
    const addCardArgument = {cardInformation: cardInfo, 
        cardDeleteHandler: setCardDeleteHandler, 
        imageClickHandler: setImageClickHandler, 
        likeButtonHandler: setLikeButtonHandler
    }
    const cardElement = addCard(addCardArgument);
    renderCard(cardElement);
    formPlaces.reset()
    closePopup(addPopup);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);
formPlaces.addEventListener('submit', handleCardFormSubmit);