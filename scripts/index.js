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

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileInfoName.textContent = formName.value
    profileInfoDescription.textContent = formDescription.value
    closePopup()

}

buttonPopupOn.addEventListener('click', openPopup)
popupClose.addEventListener('click', closePopup)
popupForm.addEventListener('submit', formSubmitHandler);











