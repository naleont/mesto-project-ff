import './styles/index.css';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardInformation, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardImage = cardElement.querySelector('.card__image')
    cardImage.src = cardInformation.link;
    cardImage.alt = 'Фотография. ' + cardInformation.name;

    cardText = cardElement.querySelector('.card__title');
    cardText.textContent = cardInformation.name;

    deleteCard(cardElement);
    return cardElement;
}

// @todo: Функция удаления карточn.ки
function deleteCard (cardElement) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.places__item');
        listItem.remove();
    });
}

function renderCard(cardElement) {
    placesList.append(cardElement);
};

// @todo: Вывести карточки на страницу
initialCards.forEach (function (item) {
    cardElement = addCard(item, deleteCard);
    renderCard(cardElement);
});
