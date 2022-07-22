export default class Section {
    constructor({ data, renderer }, cardsContainer) {
        this._items = data;
        this._renderer = renderer;
        this._cardsContainer = document.querySelector(cardsContainer);
    };

    //Разложить массив карточек 
    addItem(element) { 
        this._cardsContainer.prepend(element)
    };
    
    //создал новую карточку 
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item)
            
        });

    };
};

