import { closePopup, openPopup } from "./modal";
import { likeCardRequest, deleteCardRequest } from './api.js'

const cardTemplate = document.querySelector('#card-template').content;
const deletePopup = document.querySelector('.popup_type_delete');
const confirmationButton = deletePopup.querySelector('.popup__button')

function countLikes(cardInformation, cardElement) {
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    cardLikeCounter.textContent = cardInformation?.likes.length ?? 0
}

function addCard(addCardArgument) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardText = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardId = addCardArgument.cardInformation._id

    cardElement.id = `id_${cardId}`;

    cardImage.src = addCardArgument.cardInformation.link;
    cardImage.alt = addCardArgument.cardInformation.name;

    cardText.textContent = addCardArgument.cardInformation.name;

    countLikes(addCardArgument.cardInformation, cardElement)

    if (addCardArgument.cardInformation.likes.some((element) => {
        return element._id === addCardArgument.profileInfo._id
    })) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (addCardArgument.cardInformation.owner._id === addCardArgument.profileInfo._id) {
        deleteButton.addEventListener('click', () => {
            addCardArgument.cardDeleteHandler(addCardArgument.cardInformation._id)
        })
    } else {
        deleteButton.classList.add('card__delete-button-inactive')
    }

    addCardArgument.imageClickHandler(cardImage);
    addCardArgument.likeButtonHandler(cardElement, cardId);
    return cardElement;
}

function cardDeleteHandler(cardId) {
    openPopup(deletePopup);
    confirmationButton.dataset.cardId = cardId;
}

function deleteCard(evt) {
    const cardId = evt.target.dataset.cardId;
    const listItem = document.querySelector(`#id_${cardId}`);

    deleteCardRequest(cardId)
    .then((data) => {
        listItem.remove();
        closePopup(deletePopup)
        confirmationButton.removeEventListener('click', deleteCard)
    })
    .catch((err) => {
        console.log(err);
    })
}

function likeButtonHandler(cardElement, cardId, likeButton) { 
    const isLiked = !likeButton.classList.contains('card__like-button_is-active') ? true : false
    likeCardRequest(cardId, isLiked)
    .then((data) => {
        countLikes(data, cardElement);
        likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
        console.log(err);
    })
}

function setLikeButtonHandler(cardElement, cardId) {
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButtonHandler(cardElement, cardId, likeButton)
    });
}

export { confirmationButton, addCard, cardDeleteHandler, deleteCard, setLikeButtonHandler };