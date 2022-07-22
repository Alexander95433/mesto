import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._zoomCardsPicture = this._popup.querySelector('.popup__picture-zoom-cards');
        this._zoomCardsSubtitle = this._popup.querySelector('.popup__subtitle-zoom-cards');
    }
//дополняю родительский метод open  вставляет в попап картинку с src изображения и подписью к картинке
    open(card) {
        this._zoomCardsPicture.src = card.link;
        this._zoomCardsPicture.alt = card.name;
        this._zoomCardsSubtitle.textContent = card.name;
        //Открываю popup zoom //
        super.open();
    };
}