import { profileInfo } from "../index.js";
import { closePopup, openPopup } from "./modal";
import { likeCardRequest, deleteCardRequest } from './api.js'

const cardTemplate = document.querySelector('#card-template').content;
const deletePopup = document.querySelector('.popup_type_delete');
const confirmationButton = deletePopup.querySelector('.popup__button')

function countLikes(cardInformation, cardElement) {
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    if (cardInformation.likes) {
        cardLikeCounter.textContent = cardInformation.likes.length
    } else {
        cardLikeCounter.textContent = 0
    }
}

function addCard(addCardArgument) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardText = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.id = `id_${addCardArgument.cardInformation._id}`;

    cardImage.src = addCardArgument.cardInformation.link;
    cardImage.alt = addCardArgument.cardInformation.name;

    cardText.textContent = addCardArgument.cardInformation.name;

    countLikes(addCardArgument.cardInformation, cardElement)

    if (addCardArgument.cardInformation.likes.some((element) => {
        return element._id === profileInfo._id
    })) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (addCardArgument.cardInformation.owner._id === profileInfo._id) {
        deleteButton.addEventListener('click', () => {
            addCardArgument.cardDeleteHandler();
            openPopup(deletePopup);
            confirmationButton.dataset.cardId = addCardArgument.cardInformation._id;
        })
    } else {
        deleteButton.classList.add('card__delete-button-inactive')
    }

    addCardArgument.imageClickHandler(cardImage);
    addCardArgument.likeButtonHandler(cardElement);
    return cardElement;
}

function deleteCard(evt) {
    const cardId = evt.target.dataset.cardId;
    const listItem = document.querySelector(`#id_${cardId}`);

    deleteCardRequest(cardId)
    .then((res) => {
        if (res.ok) {
            listItem.remove();
            closePopup(deletePopup)
            confirmationButton.removeEventListener('click', deleteCard)
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

function setCardDeleteHandler() {
    confirmationButton.addEventListener('click', deleteCard)
}

function toggleLike(cardElement, method) {
    const cardId = cardElement.id.replace(/^id\_/, '')
    
    likeCardRequest(cardId, method)
    .then((data) => {
        countLikes(data, cardElement)
    })
}

function setLikeButtonHandler(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        if (!likeButton.classList.contains('card__like-button_is-active')) {
            toggleLike(cardElement, 'PUT')
            likeButton.classList.add('card__like-button_is-active');
        } else {
            toggleLike(cardElement, 'DELETE')
            likeButton.classList.remove('card__like-button_is-active');
        }
    });
}


export { addCard, setCardDeleteHandler, setLikeButtonHandler };