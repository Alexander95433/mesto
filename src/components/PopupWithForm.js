import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(config, { handleProfileFormSubmit }, popupSelector) {
        super(popupSelector);
        this._config = config;
        this._handleProfileFormSubmit = handleProfileFormSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll(this._config.inputSelector));
        this._popupForm = this._popup.querySelector(this._config.formSelector)
    };
    //Собирает данные со всех полей формы
    _getInputValues() {
       this._formValues = {};
        this._inputList.forEach((inputElement) => {
            this._formValues[inputElement.name] = inputElement.value;
        })

        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit',(evt) => {
            evt.preventDefault();
            this._handleProfileFormSubmit(this._getInputValues())
        });
    };
    close() {
        super.close();
        this._popupForm.reset();
        }

};