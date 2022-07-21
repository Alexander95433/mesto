export default class Section {
    constructor({ data, renderer }, cardsContainer) {
        this._items = data;
        this._renderer = renderer;
        this._cardsContainer = cardsContainer;
    };

    //Разложить массив карточек 
    setItem(element) { 
        this._cardsContainer.prepend(element)
    };
    
    //создал новую карточку 
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item)
            
        });

    };
};

