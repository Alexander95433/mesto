class Card {
    constructor(item, config, { handleCardClick }) {
        this._config = config;
        this._name = item.name;
        this._link = item.link;
        this._handleCardClick = handleCardClick;
        this._item = item;
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

    //Заполнение карточки
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__picture')
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._element.querySelector('.element__content-title').textContent = this._name;
        this._cardImage.alt = this._name;
        return this._element;
    };

    _isCardLiked(evt) {
        evt.target.classList.toggle('element__content-button-like-picture_active')
    }

    //Слушатели
    _setEventListeners() {
        //удаление карточки
        this._element.querySelector(this._config.deleteIcon).addEventListener('click', this._deleteCard);
        //открыть popup с увеличенным изображением
        this._element.querySelector(this._config.popupZoomCardsPictureWraper).addEventListener('click', () => this._handleCardClick(this._item));
        //like
        this._element.querySelector(this._config.likeButton).addEventListener('click', this._isCardLiked);
    };
};
export default Card;