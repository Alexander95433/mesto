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