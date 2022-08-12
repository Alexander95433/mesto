class Card {
    constructor(item, config, userId, { handleCardClick, popupDeleteCardSubmit, clickOnLike, clickDeleteLike }) {
        this._config = config;
        this._name = item.name;
        this._link = item.link;
        this._handleCardClick = handleCardClick;
        this._popupDeleteCardSubmit = popupDeleteCardSubmit;
        this._clickOnLike = clickOnLike;
        // колбэк функция для промиса удаления лайка
        this._clickDeleteLike = clickDeleteLike;

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
            .querySelector(this._config.cardBody)
            .cloneNode(true);
        return cardElement;
    };

    //функция удаления карточки
    deleteCard() { this._element.remove() };

    //Заполнение карточки
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(this._config.picture)
        this._likeBox = this._element.querySelector(this._config.likeContainer)
        this._trashIcon = this._element.querySelector(this._config.trashButton)
        this._likeButton = this._element.querySelector(this._config.likeButton)
        this._deleteIcon = this._element.querySelector(this._config.deleteIcon)
        this._pictureWrapper = this._element.querySelector(this._config.popupZoomCardsPictureWraper)
        this._setEventListeners();
        this._checkTheCardholder()
        this._checkLike()


        this._cardImage.src = this._link;
        this._element.querySelector(this._config.contentTitle).textContent = this._name;
        this._cardImage.alt = this._name;
        this._like(this._likes.length)
        return this._element;
    };
    // полученное kоличество лайков с сервера вставляет в счётчик лайков
    _like(elementLikelength) {
        this._likeBox.textContent = elementLikelength
    }

    //проверяю стоит ли лайк
    _checkLike() {
        if (this._likes.some(user => this._userId === user._id)) {
            this._likeButton.classList.add(this._config.likeButtonActive)
        }
    };

    changingStatusLikeButton(data) {
        this._likes = data.likes
        this._like(this._likes.length)
        this._likeButton.classList.toggle(this._config.likeButtonActive)

    }

    //если стоит лайк удаляет его, если нет то ставит
    likeAlgorithm() {
        if (this._likeButton.classList.contains(this._config.likeButtonActive)) {
            this._clickDeleteLike(this._cardId)
        } else { this._clickOnLike(this._cardId) }
    };

    //проверить владельца карточки
    _checkTheCardholder() {
        if (this._userId !== this._cardOwnerId) { this._trashIcon.remove() }
    };

    //Слушатели
    _setEventListeners() {
        //открывает слушатель кнопри submit
        this._deleteIcon.addEventListener('click', () => { this._popupDeleteCardSubmit(this._cardId) });
        //открыть popup с увеличенным изображением
        this._pictureWrapper.addEventListener('click', () => this._handleCardClick(this._item));
        //like
        this._likeButton.addEventListener('click', () => this.likeAlgorithm());

    };
};
export default Card;