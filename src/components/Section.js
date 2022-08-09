export default class Section {
    constructor({ renderer }, cardsContainer) {
        this._renderer = renderer;
        this._cardsContainer = document.querySelector(cardsContainer);
    };

    //создал новую карточку 
    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item)
        });

    };

    //Разложить массив карточек 
    addItem(element) {
        this._cardsContainer.append(element)
    };

    addItemNewCard(element) {
        this._cardsContainer.prepend(element)
    };

};

