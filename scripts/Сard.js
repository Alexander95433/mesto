//popup zoom picture cards
const popupZoomCards = document.querySelector('.popup_zoom-cards');
const popupZoomCardsPicture = document.querySelector('.popup__picture-zoom-cards');
const popupZoomCardsSubtitle = document.querySelector('.popup__subtitle-zoom-cards');

class CreateCard {
    constructor(item, config) {
        this._config = config;
        this._name = item.name;
        this._link = item.link;
        this._alt = item.alt;
    };

    //Клонирование разметки template
    _getTemplate() {
        const cardElement = document.querySelector(this._config.elementTemplate)
            .content
            .querySelector('.element__card')
            .cloneNode(true);
        return cardElement;
    };

    //функция удаления карточки
    _deleteCard(event) {
        event.target.closest('.element__card').remove();
    };

    //Привязываю карточки к popup zoom
    _popupZoom() {
        popupZoomCardsPicture.src = this._link;
        popupZoomCardsPicture.alt = this._alt;
        popupZoomCardsSubtitle.textContent = this._name;
        //Открываю popup zoom //
        popupZoomCards.classList.add('popup_visible');;
    };

    //Заполнение карточки
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__picture').src = this._link;
        this._element.querySelector('.element__content-title').textContent = this._name;
        this._element.querySelector('.element__picture').alt = this._name;
        return this._element;
    };

    //Слушатели
    _setEventListeners() {
        //удаление карточки
        this._element.querySelector(this._config.deleteIcon).addEventListener('click', this._deleteCard);
        //like
        this._element.querySelector(this._config.likeButton).addEventListener('click', (evt) => {
            if (evt.target.classList.contains('element__content-button-like')) {
                evt.target.classList.toggle('element__content-button-like-picture_active')
            };
        });
        //открыть popup с увеличенным изображением
        this._element.querySelector(this._config.popupZoomCardsPictureWraper).addEventListener('click', () => this._popupZoom());
    };
};
export default CreateCard;