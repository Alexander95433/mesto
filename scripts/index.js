
//для popup-edit-profile// 
const buttonPopupOn = document.querySelector('.profile__info-button');
const popupClassOn = document.querySelector('.popup_visible');
const popupEdit = document.querySelector('.popup-edit-profile');
const popupFormEdit = document.querySelector('.popup__form-edit-profile');
const formNameEdit = popupFormEdit.querySelector('.popup__form-input_name-edit-profile');
const formDescriptionEdit = popupFormEdit.querySelector('.popup__form-input_description-edit-profile');
//Заполнение профиля// 
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoDescription = document.querySelector('.profile__info-description');
//переменные для template//
const elementTemplate = document.querySelector('#element-template').content;
const cardsContainer = document.querySelector('.element');
//Для popup add-a-card// 
const popupCard = document.querySelector('.popup-add-a-card');
const buttonCard = document.querySelector('.profile__picture-cross-box');
const buttonCreatePopupCard = document.querySelector('.popup__form-button');
const popupFormCard = document.querySelector('.popup__form-add-a-card');
const popupFormNameCard = document.querySelector('.popup__form-input_name-add-a-card');
const popupFormDescriptionCard = document.querySelector('.popup__form-input_description-add-a-card');
//popup zoom picture cards
const popupZoomCards = document.querySelector('.popup_zoom-cards');
const popupZoomCardsPicture = document.querySelector('.popup__picture-zoom-cards');
const popupZoomCardsSubtitle = document.querySelector('.popup__subtitle-zoom-cards');
const popupCloseZoomCards = document.querySelector('.popup__close_zoom-cards');
//popup для закрытия по click на overlay
const popups = document.querySelectorAll('.popup');
const closePopupGlobal = document.querySelector('.popup__close')

//универсальная функция для открытия popup//
function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closeByEscape)
};

//универсальная функция для закрытия popup//
function closePopup(popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', closeByEscape)
};

//открытие popup// 
function openPopupEdit() {
    //Синхронизирует поля формы и профиля в случае если из popup вышли через popup__close// 
    formNameEdit.value = profileInfoName.textContent;
    formDescriptionEdit.value = profileInfoDescription.textContent;
    resetFormValidation(popupFormEdit, [formNameEdit, formDescriptionEdit], elementsStack);
    openPopup(popupEdit);
};

//Кнопка "сохранить" в popup//
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileInfoName.textContent = formNameEdit.value;
    profileInfoDescription.textContent = formDescriptionEdit.value;
    closePopup(popupEdit);
};

//открыть popup add-a-card//
function openPopupCard() {
    popupFormCard.reset();
    resetFormValidation(popupFormCard, [popupFormNameCard, popupFormDescriptionCard], elementsStack);
    openPopup(popupCard);
};

//Закрывает все popup по клику на кнопку закрытия и на overlay
popups.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_visible')) {
            closePopup(popupElement);
        };
        if (evt.target.classList.contains('popup__close'))
            closePopup(popupElement);
    });
});

//Закрываю popup по click на overlay
popups.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup')) {
            closePopup(popupElement);
        };
    });
});

//Закрываю popup кнопкой Escape
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_visible');
        closePopup(openPopup);
    };
};

//подключаю активацию кнопки лайк//
function handleLikeCard(event) {
    event.target.classList.toggle('element__content-button-like-picture_active');
};

//удаляю карточку//
function deleteCard(event) {
    event.target.closest('.element__card').remove();
};

//Привязываю карточки к popup zoom
function openPopupZoom(card) {
    popupZoomCardsPicture.src = card.link;
    popupZoomCardsPicture.alt = card.name;
    popupZoomCardsSubtitle.textContent = card.name;
    //Открываю popup zoom //
    openPopup(popupZoomCards);
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
    //подключаю активацию кнопки лайк//
    likeButtonClone.addEventListener('click', handleLikeCard);
    //удаляю карточку//
    buttonTrashElement.addEventListener('click', deleteCard);
    //открываю popup увеличение изображения карточки//
    elementPictureClone.addEventListener('click', function () { openPopupZoom(card) });
    // возвращаю значение склонированной переменной //
    return elementTemplateClone;
};

//расскладываю массив карточек  //
initialCards.forEach((card) => {
    cardsContainer.append(createCard(card));
});

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
    closePopup(popupCard);
};

//слушатели//
buttonPopupOn.addEventListener('click', openPopupEdit);
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);
buttonCard.addEventListener('click', openPopupCard);
popupFormCard.addEventListener('submit', handleCardFormSubmit);

