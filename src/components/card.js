import { openPopup, closePopupClick, closePopupKey } from './modal.js'

const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup_type_image');

function addCard(cardInformation, deleteCard, addImageButton, likeButtonHandler) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = cardInformation.link;
    cardImage.alt = cardInformation.name;

    const cardText = cardElement.querySelector('.card__title');
    cardText.textContent = cardInformation.name;

    deleteCard(cardElement);
    addImageButton(cardElement);
    likeButtonHandler(cardElement);
    return cardElement;
}

function deleteCard (cardElement) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.places__item');
        listItem.remove();
    });
}

function addImageButton(cardElement) {
    const imageButton = cardElement.querySelector('.card__image');
    imageButton.addEventListener('click', function() {
        const imageClicked = event.target;
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupText = imagePopup.querySelector('.popup__caption');

        popupImage.src = imageClicked.src;
        popupImage.alt = imageClicked.alt;
        popupText.textContent = imageClicked.alt;

        openPopup(imagePopup);
        imagePopup.addEventListener('click', closePopupClick);
        document.addEventListener('keydown', closePopupKey);
})}

function likeButtonHandler(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('card__like-button_is-active');
    });
}


export { addCard, deleteCard, addImageButton, likeButtonHandler };