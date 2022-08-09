class Card {
    constructor(item, config, userId, { handleCardClick, popupDeleteCardSubmit }) {
        this._config = config;
        this._name = item.name;
        this._link = item.link;
        this._handleCardClick = handleCardClick;
        this._popupDeleteCardSubmit = popupDeleteCardSubmit;
        this._cardId = item._id
        this._item = item;
        this._likes = item.likes;
        this._userId = userId;
        this._cardOwnerId = item.owner._id;
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
    deleteCard() {
        this._element.remove();
        //this._element = null;
    };

    //Заполнение карточки
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__picture')
        this._likeBox = this._element.querySelector('.element__content-like-number')
        this._trashIcon = this._element.querySelector('.element__trash')
        this._setEventListeners();
        this._checkTheCardholder()


        this._cardImage.src = this._link;
        this._element.querySelector('.element__content-title').textContent = this._name;
        this._cardImage.alt = this._name;
        this._likeBox.textContent = this._likes.length;
        return this._element;
    };

    _isCardLiked(evt) { evt.target.classList.toggle('element__content-button-like-picture_active') };

    //проверить владельца карточки
    _checkTheCardholder() {
        if (this._userId !== this._cardOwnerId) {
            this._trashIcon.remove()
        }
    };

    //Слушатели
    _setEventListeners() {
        //открывает слушатель кнопри submit
        this._element.querySelector(this._config.deleteIcon).addEventListener('click', () => { this._popupDeleteCardSubmit(this._cardId) });
        //открыть popup с увеличенным изображением
        this._element.querySelector(this._config.popupZoomCardsPictureWraper).addEventListener('click', () => this._handleCardClick(this._item));
        //like
        this._element.querySelector(this._config.likeButton).addEventListener('click', this._isCardLiked);
    };
};
export default Card;