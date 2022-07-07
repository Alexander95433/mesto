
//Добавить новую карточку//
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const nevCardElement = createCard({
        name: popupFormNameCard.value,
        alt: popupFormNameCard.value,
        link: popupFormDescriptionCard.value
    });
    cardsContainer.prepend(nevCardElement);
    popupFormCard.reset();
    closePopupCard();
};



//Привязываю карточки к popup zoom
function popupZoom(card) {
    popupZoomCardsPicture.src = card.link;
    popupZoomCardsPicture.alt = card.name;
    popupZoomCardsSubtitle.textContent = card.name;
    //Открываю popup zoom //
    zoomPictureCardsOn();
};

//создаю карточки  //
function createCard(card) {
    //переменные для clone//
    const elementTemplateClone = elementTemplate.cloneNode(true);
    const elementPictureClone = elementTemplateClone.querySelector('.element__picture');
    const elementTitleClone = elementTemplateClone.querySelector('.element__content-title');
    const likeButtonClone = elementTemplateClone.querySelector('.element__content-button-like');
    const buttonTrashElement = elementTemplateClone.querySelector('.element__trash');
    //наполняю template//
    elementPictureClone.src = card.link;
    elementPictureClone.alt = card.name;
    elementTitleClone.textContent = card.name;

    //Добавляю слушателя к карточке кнопки лайк//
    likeButtonClone.addEventListener('click', handleLikeCard);
    //Добавляю слушателя к карточке кнопки удаления карточки//
    buttonTrashElement.addEventListener('click', deleteCard);
    //Добавляю слушателя popup увеличение изображения карточки//
    elementPictureClone.addEventListener('click', function () { popupZoom(card) });
    // возвращаю значение склонированной переменной //
    return elementTemplateClone;
};
//Открываю popup zoom //
function zoomPictureCardsOn() {
    openPopup(popupZoomCards);
};

//расскладываю массив карточек  //
initialCards.forEach((card) => {
    cardsContainer.append(createCard(card));
});

//переменные для template//
const elementTemplate = document.querySelector('#element-template').content;
const cardsContainer = document.querySelector('.element');

//закрыть popup add-a-card//
function closePopupCard() {
    closePopup(popupCard);
};

//подключаю активацию кнопки лайк//
function handleLikeCard(event) {
    event.target.classList.toggle('element__content-button-like-picture_active');
};

//удаляю карточку//
function deleteCard(event) {
    event.target.closest('.element__card').remove();
};
//закрываю popup с zoom//
function zoomPictureCardsOff() {
    closePopup(popupZoomCards);
};

// закрывает popup// 
function closePopupEdit() {
    closePopup(popupEdit);
};