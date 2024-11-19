function openPopup(elementToOpen) {
    elementToOpen.classList.add('popup_is-opened');
    elementToOpen.addEventListener('click', closePopupClick);
    document.addEventListener('keydown', closePopupKey);
}

function closePopup(elementToClose) {
    elementToClose.classList.remove('popup_is-opened');
    elementToClose.removeEventListener('click', closePopupClick);
    document.removeEventListener('keydown', closePopupKey);
}

function closePopupClick(evt) {
    if (
        evt.target.classList.contains("popup_is-opened") ||
        evt.target.classList.contains("popup__close")
    ) {
        closePopup(evt.currentTarget);
    }
}

function closePopupKey(evt) {
    if (evt.key === "Escape") {
        const currentPopup = document.querySelector('.popup_is-opened');
        
        closePopup(currentPopup);
    };
}

export { openPopup, closePopup, closePopupClick, closePopupKey };