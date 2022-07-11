
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const config = {
    //Для класса CreateCard
    elementTemplate: '#element-template',
    likeButton: '.element__content-button-like',
    deleteIcon: '.element__trash',
    popupZoomCardsPictureWraper: '.element__picture-wrapper',
    popupZoomCardsSubtitle: '.popup__subtitle-zoom-cards',

    //для класса FormValidator
    formSelector: '.popup__form',
    formFieldset: '.popup__fieldset',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-button',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__span-input-error'

};


export { initialCards, config };