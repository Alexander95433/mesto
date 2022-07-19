//Привязываю карточки к popup zoom
function popupZoom(card) {
    popupZoomCardsPicture.src = card.link;
    popupZoomCardsPicture.alt = card.name;
    popupZoomCardsSubtitle.textContent = card.name;
    //Открываю popup zoom //
    openPopup(popupZoomCards)
};

//Закрываю popup по click на overlay
popups.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_visible')) {
            closePopup(popupElement);
        };
        if (evt.target.classList.contains('popup__close'))
            closePopup(popupElement);
    });
});

//Закрываю popup кнопкой Escape
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_visible');
        closePopup(openPopup);
    };
};

// //универсальная функция для открытия popup//
function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closeByEscape)
};

// //универсальная функция для закрытия popup//
function closePopup(popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', closeByEscape)
};

//Разложить массив карточек 
initialCards.forEach((item) => {
    cardsContainer.append(createCard(item))
});

//Добавить новую карточку//
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    cardsContainer.prepend(createCard({
        name: popupFormNameCard.value,
        alt: popupFormNameCard.value,
        link: popupFormDescriptionCard.value
    }));
    popupFormCard.reset();
    closePopup(popupCard)
};

//Создать карточку Card 
function createCard(item) {
    const card = new Card(item, config, popupZoom)
    const elementCard = card.generateCard()
    return elementCard
};