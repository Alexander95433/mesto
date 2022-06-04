
//для popup-edit-profile// 
const buttonPopupOn = document.querySelector('.profile__info-button')
const popupClassOn = document.querySelector('.popup_visible')
const popupCloseEdit = document.querySelector('.popup__close-edit-profile')
const popupEdit = document.querySelector('.popup-edit-profile')

//popupClose popup

//Заполнение popup form-edit-profile// 
const popupFormEdit = document.querySelector('.popup__form-edit-profile')
const formNameEdit = popupFormEdit.querySelector('.popup__form-name-edit-profile')
const formDescriptionEdit = popupFormEdit.querySelector('.popup__form-description-edit-profile')

//formName formDescription formButton const formButtonEdit = popupFormEdit.querySelector('.popup__form-button-edit-profile')

//Заполнение профиля// 
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoDescription = document.querySelector('.profile__info-description')
//переменные для template//
const cardsContainer = document.querySelector('.element')
//elementHtml
//Для popup add-a-card// 
const popupCard = document.querySelector('.popup-add-a-card')
const buttonCard = document.querySelector('.profile__picture-cross-box')
const popupCloseCard = document.querySelector('.popup__close-add-a-card')
const buttonCreatePopupCard = document.querySelector('.popup__form-button-add-a-card')
const popupFormCard = document.querySelector('.popup__form-add-a-card')
const popupFormNameCard = document.querySelector('.popup__form-name-add-a-card')
const popupFormDescriptionCard = document.querySelector('.popup__form-description-add-a-card')

//popup zoom picture cards
const popupZoomCards = document.querySelector('.popup_zoom-cards')
const popupZoomCardsPicture = document.querySelector('.popup__picture-zoom-cards ')
const popupZoomCardsSubtitle = document.querySelector('.popup__subtitle-zoom-cards ')
const popupCloseZoomCards = document.querySelector('.popup__close_zoom-cards')

function openPopup (popup) {
    popup.classList.add('popup_opened');
 }  
 
//открытие popup// 
function openPopup() {
    //Синхронизирует поля формы и профиля в случае если из popup вышли через popup__close// 
    formNameEdit.value = profileInfoName.textContent
    formDescriptionEdit.value = profileInfoDescription.textContent
    popupEdit.classList.add('popup_visible')
}
// закрывает popup// 
function closePopup() {
    popupEdit.classList.remove('popup_visible')
}
//Кнопка "сохранить" в popup//
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileInfoName.textContent = formNameEdit.value
    profileInfoDescription.textContent = formDescriptionEdit.value
    closePopup()
}

//открыть popup add-a-card//
function openPopupCard() {
    popupCard.classList.add('popup_visible')
}

//закрыть popup add-a-card//
function closePopupCard() {
    popupCard.classList.remove('popup_visible')
}

//подключаю активацию кнопки лайк//
function like(event) {
    event.target.classList.toggle('element__content-button-like-picture_active')
}

//удаляю карточку//
function dellCard(event) {
    event.target.closest('.element__card').remove();
}

//Открываю popup zoom //
function zoomPictureCardsOn() {
    popupZoomCards.classList.add('popup_visible')
}

//закрываю popup с zoom//
function zoomPictureCardsOff() {
    popupZoomCards.classList.remove('popup_visible')
}

//Привязываю карточки к popup zoom
function popupZoom (Cards) {
    popupZoomCardsPicture.src = Cards.link
    popupZoomCardsSubtitle.textContent = Cards.name
    //Открываю popup zoom //
    zoomPictureCardsOn()
}

//создаю карточки  //
function createCards(Cards) {
    //переменные для clone//
    const elementTemplate = document.querySelector('#element-template').content
    const elementTemplateClone = elementTemplate.cloneNode(true)
    const elementPictureClone = elementTemplateClone.querySelector('.element__picture')
    const elementTitleClone = elementTemplateClone.querySelector('.element__content-title')
    const likeButtonClone = elementTemplateClone.querySelector('.element__content-button-like')
    const buttonTrashElement = elementTemplateClone.querySelector('.element__trash')
    //наполняю template//
    elementPictureClone.src = Cards.link
    elementTitleClone.textContent = Cards.name
    //подключаю активацию кнопки лайк//
    likeButtonClone.addEventListener('click', like)
    //удаляю карточку//
    buttonTrashElement.addEventListener('click', dellCard)
    //открываю popup увеличение изображения карточки//
    elementPictureClone.addEventListener('click',function () {popupZoom(Cards)} )
    // возвращаю значение склонированной переменной //
    return elementTemplateClone
}

//расскладываю массив карточек  //
initialCards.forEach((Cards) => {
    cardsContainer.append(createCards(Cards))
})

//Добавить новую карточку//
function formSubmitHandlerCard(evt) {
    evt.preventDefault();
    const nevCardElement = createCards({
        name: popupFormNameCard.value,
        link: popupFormDescriptionCard.value
    })
    cardsContainer.prepend(nevCardElement)
    closePopupCard()
}

//слушатели//
buttonPopupOn.addEventListener('click', openPopup)
popupCloseEdit.addEventListener('click', closePopup)
popupFormEdit.addEventListener('submit', formSubmitHandler)
buttonCard.addEventListener('click', openPopupCard)
popupCloseCard.addEventListener('click', closePopupCard)
popupFormCard.addEventListener('submit', formSubmitHandlerCard)
popupCloseZoomCards.addEventListener('click', zoomPictureCardsOff)














