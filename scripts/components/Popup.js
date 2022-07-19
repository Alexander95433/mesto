export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    };

    //универсальная функция для открытия popup//
    open() {
        this._popupSelector.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose.bind(this))
    };

    //универсальная функция для закрытия popup//
    close() {
        this._popupSelector.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose)
    };

    //Закрываю popup кнопкой Escape
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        };
    };





    //Закрываю popup по click на overlay
    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_visible')) {
                this.close();
            };
            if (evt.target.classList.contains('popup__close'))
                this.close();
        });

    };

};