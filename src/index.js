import './styles/index.css';
import { initialCards } from './cards.js';
import { openPopup, closePopup, closePopupClick, closePopupKey } from './components/modal.js'
import { addCard, deleteCard, addImageButton, likeButtonHandler } from './components/card.js'

const placesList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');

const formProfile = document.forms.edit_profile
const formPlaces = document.forms['new-place']

const nameInput = formProfile.name
const jobInput = formProfile.description

// Вывод карточек на страницу
function renderCard(cardElement) {
    placesList.append(cardElement);
};

initialCards.forEach (function (item) {
    const cardElement = addCard(item, deleteCard, addImageButton, likeButtonHandler);
    renderCard(cardElement);
});

// Работа с модальными окнами
function getUserValues() {
    const userName = document.querySelector('.profile__title').textContent;
    const userDecription = document.querySelector('.profile__description').textContent;
    const userForm = document.forms.edit_profile;
    userForm.elements.name.value = userName;
    userForm.elements.description.value = userDecription;
}

editButton.addEventListener('click', function() {
    // const currentPopup = editPopup;
    openPopup(editPopup);
    getUserValues();
    editPopup.addEventListener('click', closePopupClick);
    document.addEventListener('keydown', closePopupKey);
})

addButton.addEventListener('click', function() {
    // const currentPopup = addPopup;
    openPopup(addPopup);
    addPopup.addEventListener('click', closePopupClick);
    document.addEventListener('keydown', closePopupKey);
})

// Работа с формами
function editProfileSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    const profileTitle = document.querySelector('.profile__title');
    const profileDcription = document.querySelector('.profile__description');
    profileTitle.textContent = nameValue;
    profileDcription.textContent = jobValue;
    closePopup(editPopup);
}

function addPlaceSubmit(evt) {
    evt.preventDefault();
    const cardInfo = {
        name: formPlaces['place-name'].value,
        link: formPlaces.link.value
    }
    const cardElement = addCard(cardInfo, deleteCard, addImageButton, likeButtonHandler);
    placesList.prepend(cardElement);
    formPlaces['place-name'].value = '';
    formPlaces.link.value = '';
    closePopup(addPopup);
}

formProfile.addEventListener('submit', editProfileSubmit);
formPlaces.addEventListener('submit', addPlaceSubmit);