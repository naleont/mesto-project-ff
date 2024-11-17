const cardTemplate = document.querySelector('#card-template').content;

function addCard(addCardArgument) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = addCardArgument.cardInformation.link;
    cardImage.alt = addCardArgument.cardInformation.name;

    const cardText = cardElement.querySelector('.card__title');
    cardText.textContent = addCardArgument.cardInformation.name;

    addCardArgument.cardDeleteHandler(cardElement);
    addCardArgument.imageClickHandler(cardImage);
    addCardArgument.likeButtonHandler(cardElement);
    return cardElement;
}

function setCardDeleteHandler (cardElement) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.places__item');
        listItem.remove();
    });
}

function setLikeButtonHandler(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('card__like-button_is-active');
    });
}


export { addCard, setCardDeleteHandler, setLikeButtonHandler };