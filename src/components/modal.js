function openPopup(elementToOpen) {
    elementToOpen.classList.add('popup_is-opened');
    elementToOpen.classList.remove('popup_is-animated');
}

function closePopup(elementToOpen) {
    elementToOpen.classList.remove('popup_is-opened');
    elementToOpen.classList.add('popup_is-animated');
}

function closePopupClick(evt) {
    const currentPopup = document.querySelector('.popup_is-opened');
    const popupCloseButton = currentPopup.querySelector('.popup__close');
    if (currentPopup === evt.target || popupCloseButton === evt.target) {
        closePopup(currentPopup);
        currentPopup.removeEventListener('click', closePopupClick);
        document.removeEventListener('keydown', closePopupKey);
    };
}

function closePopupKey(evt) {
    const currentPopup = document.querySelector('.popup_is-opened');
    if (evt.key === "Escape") {
        closePopup(currentPopup);
        currentPopup.removeEventListener('click', closePopupClick);
        document.removeEventListener('keydown', closePopupKey);
    };
}

export { openPopup, closePopup, closePopupClick, closePopupKey };