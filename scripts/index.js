//для popup-edit-profile// 
const buttonPopupOn = document.querySelector('.profile__info-button')
const popup = document.querySelector('.popup-edit-profile')
const popupClassOn = document.querySelector('.popup_visible')
const popupClose = document.querySelector('.popup__close-edit-profile')
//Заполнение popup form-edit-profile// 
const popupForm = document.querySelector('.popup__form-edit-profile')
const formName = popupForm.querySelector('.popup__form-name-edit-profile')
const formDescription = popupForm.querySelector('.popup__form-description-edit-profile')
const formButton = popupForm.querySelector('.popup__form-button-edit-profile')

//Заполнение профиля// 
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoDescription = document.querySelector('.profile__info-description')
//переменные для template//
const elementHtml = document.querySelector('.element')

//Для popup add-a-card// 
const popupCard = document.querySelector('.popup-add-a-card')
const buttonCard = document.querySelector('.profile__picture-cross-box')
const popupCloseCard = document.querySelector('.popup__close-add-a-card')
const buttonCreatePopupCard = document.querySelector('.popup__form-button-add-a-card')
const popupFormCard = document.querySelector('.popup__form-add-a-card')
const popupFormNameCard = document.querySelector('.popup__form-name-add-a-card')
const popupFormDescriptionCard = document.querySelector('.popup__form-description-add-a-card')

//popup zoom picture cards
const elementCard = document.querySelector('.element__card')
const elementPicture = document.querySelector('.sss')
const popupZoomCards = document.querySelector('.popup_zoom-cards')
const popupZoomCardsPicture = document.querySelector('.popup-zoom-cards__picture')
const popupZoomCardsSubtitle = document.querySelector('.popup-zoom-cards__subtitle')
const popupCloseZoomCards = document.querySelector('.popup__close_zoom-cards')

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]

//открытие popup// 
function openPopup() {
    //Синхронизирует поля формы и профиля в случае если из popup вышли через popup__close// 
    formName.value = profileInfoName.textContent
    formDescription.value = profileInfoDescription.textContent
    popup.classList.add('popup_visible')
}
// закрывает popup// 
function closePopup() {
    popup.classList.remove('popup_visible')
}
//Кнопка "сохранить" в popup//
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileInfoName.textContent = formName.value
    profileInfoDescription.textContent = formDescription.value
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
function nevCards(Cards) {
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
//Добавить новую карточку//
function formSubmitHandlerCard(evt) {
    evt.preventDefault();
    const nevCardElement = nevCards({
        name: popupFormNameCard.value,
        link: popupFormDescriptionCard.value
    })
    elementHtml.prepend(nevCardElement)
    closePopupCard()
}

//расскладываю массив карточек  //
initialCards.forEach((cards) => {
    elementHtml.append(nevCards(cards))
})

//слушатели//
buttonPopupOn.addEventListener('click', openPopup)
popupClose.addEventListener('click', closePopup)
popupForm.addEventListener('submit', formSubmitHandler)
buttonCard.addEventListener('click', openPopupCard)
popupCloseCard.addEventListener('click', closePopupCard)
popupFormCard.addEventListener('submit', formSubmitHandlerCard)
popupCloseZoomCards.addEventListener('click', zoomPictureCardsOff)













