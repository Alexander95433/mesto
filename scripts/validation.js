const elementsStack = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__span-input-error'
});



//Добавил класс ошибки
function addErrorClass(formElement, inputElement, errorMessege) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessege;
    inputElement.classList.add('popup__form-input_error');
    errorElement.classList.add('popup__span-input-error');
    errorElement.hidden = false;
}

//Убрал класс ошибки
function removeErrorClass(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = ' ';
    inputElement.classList.remove('popup__form-input_error');
    errorElement.hidden = true;

}

//Проверил валидацию
function checksValidation(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        addErrorClass(formElement, inputElement, inputElement.validationMessage);
    } else {
        removeErrorClass(formElement, inputElement);
    }
}

//Добавляю слушателей к каждому input
function addListener(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
    const submitButton =Array.from(formElement.querySelectorAll('.popup__form-button'));
    disablSubmit(inputList, submitButton)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checksValidation(formElement, inputElement);
            disablSubmit(inputList, submitButton)
        });
    });
}

//Подключаю обработчик ко всем form
function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => evt.preventDefault());
        addListener(formElement);
        //Работает с филдсетами
        const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'))
        fieldsetList.forEach((fieldsetElement) => addListener(fieldsetElement))
    });
}

//Проверка всех полей на валидность
function checkingInputValidity(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
      })
}
const fff = document.querySelector('.popup__form-button')
function son (ffff) {
    ffff.classList.add('popup__form-button-disabled');
}

function sonn (ffff) {
    ffff.classList.remove('popup__form-button-disabled');
}
//Отключает submit
function disablSubmit(inputList, buttonElement) {
    if (checkingInputValidity(inputList, buttonElement)) {
        son (fff)
    } else {
        sonn (fff)
    }
}






















enableValidation()







