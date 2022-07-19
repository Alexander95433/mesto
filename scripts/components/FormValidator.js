class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(`${this.config.inputSelector}`));
        this._buttonElement = this._formElement.querySelector(`${this.config.submitButtonSelector}`);
    };

    //Подключаю обработчик ко всем form formList
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
        this._addListener();
        //Работает с филдсетами  
        const fieldsetList = Array.from(this._formElement.querySelectorAll(`${this.config.formFieldset}`))
        fieldsetList.forEach((fieldsetElement) => this._addListener(fieldsetElement));
    };

    //Добавляю слушателей к каждому input  
    _addListener() {
        this._disablSubmit();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checksValidation(inputElement);
                this._disablSubmit();
            });
        });
    };

    //Проверка всех полей на валидность
    _checkingInputValidity(inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid)
    };

    //Проверяю валидны ли все поля ввода , и после этого включаю кнопку submit
    _disablSubmit() {
        this._checkingInputValidity(this._inputList) ? this._disableSubmitButton() : this._enableSubmitButton();
    };

    //Проверил валидацию
    _checksValidation(inputElement) {
        if (!inputElement.validity.valid) {
            this._addErrorClass(inputElement, inputElement.validationMessage);
        } else {
            this._removeErrorClass(inputElement);
        }
    };

    //Добавил класс ошибки
    _addErrorClass(inputElement, errorMessege) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessege;
        inputElement.classList.add(`${this.config.inputErrorClass}`);
        errorElement.classList.add(`${this.config.errorClass}`);
        errorElement.hidden = false;
    };

    //Убрал класс ошибки
    _removeErrorClass(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.hidden = true;
        errorElement.textContent = '';
        inputElement.classList.remove(`${this.config.inputErrorClass}`);
    };

    //Включаю и выключаю кнопку submit
    _disableSubmitButton() { this._buttonElement.disabled = true; };
    _enableSubmitButton() { this._buttonElement.disabled = false; };

    //Сбрасываю ошибки с полей input и ставлю неактивный статус submit button
    resetFormValidation() {
        this._inputList.forEach((inputElement) => {
            this._removeErrorClass(inputElement);
        });
        this._disableSubmitButton();
    };
};

export default FormValidator;


