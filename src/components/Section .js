export default class Section {
    constructor({ renderer }, cardsContainer) {
        this._renderer = renderer;
        this._cardsContainer = document.querySelector(cardsContainer);
    };

    //Разложить массив карточек 
    addItem(element) {
        this._cardsContainer.prepend(element)
    };

    //создал новую карточку 
    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item)
        });

    };
};

