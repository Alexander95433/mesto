import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._buttonElement = this._popup.querySelector('.popup__form-button');
    };

    callbackDeleteCard(submit) {
        this._deleteCardCallbeck = submit
    }

    setEventListeners() {
        super.setEventListeners()
        this._buttonElement.addEventListener('click', (evt) => {
            evt.preventDefault();
            //функция удаления карточки из класса Card
            this._deleteCardCallbeck()
            this.close();

        })
    };



};