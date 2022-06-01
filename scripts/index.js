//для popup// 
const buttonPopupOn = document.querySelector('.profile__info-button')
const popup = document.querySelector('.popup')
const popupClassOn = document.querySelector('.popup_visible')
const popupClose = document.querySelector('.popup__close')
//Заполнение popup form// 
const popupForm = document.querySelector('.popup__form')
const formName = popupForm.querySelector('.popup__form-name')
const formDescription = popupForm.querySelector('.popup__form-description')
const formButton = popupForm.querySelector('.popup__form-button')
//Заполнение профиля// 
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoDescription = document.querySelector('.profile__info-description')
//переменные для template//
const elementHtml = document.querySelector('.element')
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

//принимает как аргумент массив карточек по умолчанию  //
function cards(initialCards) {
    const elementTemplate = document.querySelector('#element-template').content
    const elementTemplateClone = elementTemplate.cloneNode(true)
    const elementPictureClone = elementTemplateClone.querySelector('.element__picture')
    const elementTitleClone = elementTemplateClone.querySelector('.element__content-title')
    const likeButtonClone = elementTemplateClone.querySelector('.element__content-button-like')
    //наполняю template//
    elementPictureClone.src = initialCards.link
    elementTitleClone.textContent = initialCards.name
    //подключаю активацию кнопки лайк//
    likeButtonClone.addEventListener('click', (event) => {
        event.target.classList.toggle('element__content-button-like-picture_active')
    })
    // возвращаю значение склонированной переменной //
    return elementTemplateClone
}
//расскладываю массив карточек  //
initialCards.forEach((initialCards) => {
    elementHtml.append(cards(initialCards))
})



//експиримент с темплайт попап//
const popupClone = document.querySelector('.popup')





buttonPopupOn.addEventListener('click', openPopup)
popupClose.addEventListener('click', closePopup)
popupForm.addEventListener('submit', formSubmitHandler);











