//для popup//
let buttonPopupOn = document.querySelector('.profile__info-button')
let popup = document.querySelector('.popup')
let popupClassOn = document.querySelector('.popup_visible')
let popupClose = document.querySelector('.popup__close')

//открытие popup//
function openPopup() {
    popup.classList.toggle('popup_visible')
}
buttonPopupOn.addEventListener('click', openPopup)

// закрытие popup  и синхронизировать value с содержанием строк popup//
function closePopup() {

    popup.classList.remove('popup_visible')
    formName.value = profileInfoName.textContent
    formDescription.value = profileInfoDescription.textContent

}
popupClose.addEventListener('click', closePopup)


//Заполнение popup form//
let popupForm = document.querySelector('.popup__form')
let formName = popupForm.querySelector('.popup__form-name')
let formDescription = popupForm.querySelector('.popup__form-description')
let formButton = popupForm.querySelector('.popup__form-button')

//Заполнение профиля//
let profileInfoName = document.querySelector('.profile__info-name')
let profileInfoDescription = document.querySelector('.profile__info-description')


//Не даёт перезаписать value если длинна строки меньше 0//
function buttonActive() {
    if (formName.value.length > 0) {
        if (formDescription.value.length > 0) {
            profileInfoName.textContent = formName.value
            profileInfoDescription.textContent = formDescription.value

            closePopup()
        } else {
            alert('Ошибка: Заполните все поля ввода')
        }
    } else {
        alert('Ошибка: Заполните все поля ввода')
    }
}
formButton.addEventListener('click', buttonActive)

//добавляет plasceholder с подсказкой//
formName.setAttribute('placeholder', 'Поле не должно быть пустым')
formDescription.setAttribute('placeholder', 'Поле не должно быть пустым')













