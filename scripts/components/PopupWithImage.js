import Popup from "./Popup.js";
import { popupZoomCardsPicture, popupZoomCardsSubtitle } from '../utils/constants-array.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(card) {
        popupZoomCardsPicture.src = card.link;
        popupZoomCardsPicture.alt = card.name;
        popupZoomCardsSubtitle.textContent = card.name;
        //Открываю popup zoom //
        super.open();
    };
}