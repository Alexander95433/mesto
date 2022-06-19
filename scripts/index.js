
//для popup-edit-profile// 
const buttonPopupOn = document.querySelector('.profile__info-button')
const popupClassOn = document.querySelector('.popup_visible')
const popupCloseEdit = document.querySelector('.popup__close-edit-profile')
const popupEdit = document.querySelector('.popup-edit-profile')
//Заполнение popup form-edit-profile// 
const popupFormEdit = document.querySelector('.popup__form-edit-profile')
const formNameEdit = popupFormEdit.querySelector('.popup__form-input_name-edit-profile')
const formDescriptionEdit = popupFormEdit.querySelector('.popup__form-input_description-edit-profile')
//Заполнение профиля// 
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoDescription = document.querySelector('.profile__info-description')
//переменные для template//
const elementTemplate = document.querySelector('#element-template').content
const cardsContainer = document.querySelector('.element')
//Для popup add-a-card// 
const popupCard = document.querySelector('.popup-add-a-card')
const buttonCard = document.querySelector('.profile__picture-cross-box')
const popupCloseCard = document.querySelector('.popup__close-add-a-card')
const buttonCreatePopupCard = document.querySelector('.popup__form-button')
const popupFormCard = document.querySelector('.popup__form-add-a-card')
const popupFormNameCard = document.querySelector('.popup__form-input_name-add-a-card')
const popupFormDescriptionCard = document.querySelector('.popup__form-input_description-add-a-card')
//popup zoom picture cards
const popupZoomCards = document.querySelector('.popup_zoom-cards')
const popupZoomCardsPicture = document.querySelector('.popup__picture-zoom-cards ')
const popupZoomCardsSubtitle = document.querySelector('.popup__subtitle-zoom-cards ')
const popupCloseZoomCards = document.querySelector('.popup__close_zoom-cards')
//popup для закрытия по click на overlay
const popups = document.querySelectorAll('.popup')


//универсальная функция для открытия popup//
function openPopup(popup) {
    popup.classList.add('popup_visible')
}
//универсальная функция для закрытия popup//
function closePopup(popup) {
    popup.classList.remove('popup_visible')
}

//открытие popup// 
function openPopupEdit() {
    //Синхронизирует поля формы и профиля в случае если из popup вышли через popup__close// 
    formNameEdit.value = profileInfoName.textContent
    formDescriptionEdit.value = profileInfoDescription.textContent
    openPopup(popupEdit)

}
// закрывает popup// 
function closePopupEdit() {
    closePopup(popupEdit)
}
//Кнопка "сохранить" в popup//
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileInfoName.textContent = formNameEdit.value
    profileInfoDescription.textContent = formDescriptionEdit.value
    closePopupEdit()
}

//открыть popup add-a-card//
function openPopupCard() {
    openPopup(popupCard)
}

//закрыть popup add-a-card//
function closePopupCard() {
    closePopup(popupCard)
    popupFormNameCard.value = ''
    popupFormDescriptionCard.value = ''
}

//Закрываю popup по click на overlay
popups.forEach((popupElement) => {
    popupElement.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            closePopup(popupElement);
            
        };
    })
})
//Закрываю popup кнопкой Escape
popups.forEach((popupElement)=> {
    document.addEventListener('keydown',(evt)=>{
        if(evt.key === 'Escape') {
         closePopup(popupElement) 
        }
    })
  })


//подключаю активацию кнопки лайк//
function handleLikeCard(event) {
    event.target.classList.toggle('element__content-button-like-picture_active')
}

//удаляю карточку//
function deleteCard(event) {
    event.target.closest('.element__card').remove();
}

//Открываю popup zoom //
function zoomPictureCardsOn() {
    openPopup(popupZoomCards)
}

//закрываю popup с zoom//
function zoomPictureCardsOff() {
    closePopup(popupZoomCards)
}

//Привязываю карточки к popup zoom
function popupZoom(card) {
    popupZoomCardsPicture.src = card.link;
    popupZoomCardsPicture.alt = card.name;
    popupZoomCardsSubtitle.textContent = card.name;
    //Открываю popup zoom //
    zoomPictureCardsOn();
}

//создаю карточки  //
function createCard(card) {
    //переменные для clone//
    const elementTemplateClone = elementTemplate.cloneNode(true)
    const elementPictureClone = elementTemplateClone.querySelector('.element__picture')
    const elementTitleClone = elementTemplateClone.querySelector('.element__content-title')
    const likeButtonClone = elementTemplateClone.querySelector('.element__content-button-like')
    const buttonTrashElement = elementTemplateClone.querySelector('.element__trash')
    //наполняю template//
    elementPictureClone.src = card.link
    elementPictureClone.alt = card.name
    elementTitleClone.textContent = card.name

    //подключаю активацию кнопки лайк//
    likeButtonClone.addEventListener('click', handleLikeCard)
    //удаляю карточку//
    buttonTrashElement.addEventListener('click', deleteCard)
    //открываю popup увеличение изображения карточки//
    elementPictureClone.addEventListener('click', function () { popupZoom(card) })
    // возвращаю значение склонированной переменной //
    return elementTemplateClone
}

//расскладываю массив карточек  //
initialCards.forEach((card) => {
    cardsContainer.append(createCard(card))
})

//Добавить новую карточку//
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const nevCardElement = createCard({
        name: popupFormNameCard.value,
        alt: popupFormNameCard.value,
        link: popupFormDescriptionCard.value
    })
    cardsContainer.prepend(nevCardElement)
    popupFormCard.reset();
    closePopupCard()
}



//слушатели//
buttonPopupOn.addEventListener('click', openPopupEdit)
popupCloseEdit.addEventListener('click', closePopupEdit)
popupFormEdit.addEventListener('submit', handleProfileFormSubmit)
buttonCard.addEventListener('click', openPopupCard)
popupCloseCard.addEventListener('click', closePopupCard)
popupFormCard.addEventListener('submit', handleCardFormSubmit)
popupCloseZoomCards.addEventListener('click', zoomPictureCardsOff)

