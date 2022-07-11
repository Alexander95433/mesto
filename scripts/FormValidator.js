class FormValidator {
    constructor(config) {
        this.config = config;
    };
    //Подключаю обработчик ко всем form
    enableValidation() {
        const formList = Array.from(document.querySelectorAll(`${this.config.formSelector}`));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => evt.preventDefault());
            this._addListener(formElement);
            //Работает с филдсетами  
            const fieldsetList = Array.from(formElement.querySelectorAll(`${this.config.formFieldset}`))
            fieldsetList.forEach((fieldsetElement) => this._addListener(fieldsetElement));
        });
    };

    //Добавляю слушателей к каждому input
    _addListener(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(`${this.config.inputSelector}`));
        const buttonElement = formElement.querySelector(`${this.config.submitButtonSelector}`);
        this._disablSubmit(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checksValidation(formElement, inputElement, inputList);
                this._disablSubmit(inputList, buttonElement);
            });
        });
    };

    //Проверка всех полей на валидность
    _checkingInputValidity(inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid)
    };

    //Проверяю валидны ли все поля ввода , и после этого включаю кнопку submit
    _disablSubmit(inputList, buttonElement) {
        this._checkingInputValidity(inputList) ? this._disableSubmitButton(buttonElement) : this._enableSubmitButton(buttonElement);
    };

    //Проверил валидацию
    _checksValidation(formElement, inputElement) {
        const buttonElement = formElement.querySelector(`${this.config.submitButtonSelector}`);
        if (!inputElement.validity.valid) {
            this._addErrorClass(formElement, inputElement, inputElement.validationMessage, buttonElement);
        } else {
            this._removeErrorClass(formElement, inputElement, buttonElement);
        }
    };

    //Добавил класс ошибки
    _addErrorClass(formElement, inputElement, errorMessege) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        //const buttonElement = formElement.querySelector(`${this.config.submitButtonSelector}`);
        errorElement.textContent = errorMessege;
        inputElement.classList.add(`${this.config.inputErrorClass}`);
        errorElement.classList.add(`${this.config.errorClass}`);
        errorElement.hidden = false;
    };

    //Убрал класс ошибки
    _removeErrorClass(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.hidden = true;
        errorElement.textContent = '';
        inputElement.classList.remove(`${this.config.inputErrorClass}`);
    };

    //Включаю и выключаю кнопку submit
    _disableSubmitButton(buttonElement) { buttonElement.disabled = true; };
    _enableSubmitButton(buttonElement) { buttonElement.disabled = false; };

    //Сбрасываю ошибки с полей input и ставлю неактивный статус submit button
    resetFormValidation(formElement, inputList) {
        const buttonElement = formElement.querySelector(`${this.config.submitButtonSelector}`);
        inputList.forEach((inputElement) => {
            this._removeErrorClass(formElement, inputElement, buttonElement);
        });
        this._disableSubmitButton(buttonElement);
    };

};

export default FormValidator;


