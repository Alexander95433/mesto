export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    //универсальная функция для открытия popup//
    open() {
        this._popup.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose)
    };

    //универсальная функция для закрытия popup//
    close() {
        this._popup.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose)
    };

    //Закрываю popup кнопкой Escape
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        };
    };

    
    setEventListeners() {
        //Закрываю popup по click на overlay
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_visible')) {
                this.close();
            };
            if (evt.target.classList.contains('popup__close'))
                this.close();
        });

    };

};