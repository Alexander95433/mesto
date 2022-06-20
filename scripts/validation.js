const elementsStack = {
    formSelector: '.popup__form',
    formFieldset: '.popup__fieldset',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-button',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__span-input-error'
};


//Добавил класс ошибки
function addErrorClass(formElement, inputElement, errorMessege, ElementsHtmlList) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessege;
    inputElement.classList.add(`${ElementsHtmlList.inputErrorClass}`);
    errorElement.classList.add(`${ElementsHtmlList.errorClass}`);
    errorElement.hidden = false;
}

//Убрал класс ошибки
function removeErrorClass(formElement, inputElement, ElementsHtmlList) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.hidden = true;
    errorElement.textContent = '';
    inputElement.classList.remove(`${ElementsHtmlList.inputErrorClass}`);

}

//Проверил валидацию
function checksValidation(formElement, inputElement, ElementsHtmlList) {
    if (!inputElement.validity.valid) {
        addErrorClass(formElement, inputElement, inputElement.validationMessage, ElementsHtmlList);
    } else {
        removeErrorClass(formElement, inputElement, ElementsHtmlList);
    }
};

//Добавляю слушателей к каждому input
function addListener(formElement, ElementsHtmlList) {
    const inputList = Array.from(formElement.querySelectorAll(`${ElementsHtmlList.inputSelector}`));
    const submitButton = formElement.querySelector(`${ElementsHtmlList.submitButtonSelector}`);
    disablSubmit(inputList, submitButton);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checksValidation(formElement, inputElement, ElementsHtmlList);
            disablSubmit(inputList, submitButton);
        });
    });
};

//Подключаю обработчик ко всем form
function enableValidation(ElementsHtmlList) {
    const formList = Array.from(document.querySelectorAll(`${ElementsHtmlList.formSelector}`));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => evt.preventDefault());
        addListener(formElement, ElementsHtmlList);
        //Работает с филдсетами
        const fieldsetList = Array.from(formElement.querySelectorAll(`${ElementsHtmlList.formFieldset}`))
        fieldsetList.forEach((fieldsetElement) => addListener(fieldsetElement, ElementsHtmlList));
    });
};

//Проверка всех полей на валидность
function checkingInputValidity(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid)
};

//Включаю и выключаю кнопку submit
function disableSubmitButton(buttonElement) { buttonElement.disabled = true; }
function enableSubmitButton(buttonElement) { buttonElement.disabled = false; }

//Проверяю валидны ли все поля ввода , и после этого включаю кнопку submit
function disablSubmit(inputList, buttonElement) {
    checkingInputValidity(inputList) ? disableSubmitButton(buttonElement) : enableSubmitButton(buttonElement);
};

//Сбрасываю ошибки с полей input и ставлю неактивный статус submit button
function resetFormValidation(form, inputList, ElementsHtmlList) {
    const buttonElement = form.querySelector(`${ElementsHtmlList.submitButtonSelector}`);
    inputList.forEach((inputElement) => {
        removeErrorClass(form, inputElement, ElementsHtmlList);
    });
    disableSubmitButton(buttonElement);
};

//Включаю валидацию
enableValidation(elementsStack);




