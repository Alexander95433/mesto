//для popup-edit-profile// popup__form
const buttonPopupOn = document.querySelector('.profile__info-button');
const popupEdit = document.querySelector('.popup-edit-profile');
const popupFormEdit = document.querySelector('.popup__form-edit-profile');
const formNameEdit = popupFormEdit.querySelector('.popup__form-input_name-edit-profile');
const formDescriptionEdit = popupFormEdit.querySelector('.popup__form-input_description-edit-profile');
//Заполнение профиля// 
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoDescription = document.querySelector('.profile__info-description');
//Для popup add-a-card// 
const popupCard = document.querySelector('.popup-add-a-card');
const buttonCard = document.querySelector('.profile__picture-cross-box');
const popupFormCard = document.querySelector('.popup__form-add-a-card');
const popupFormNameCard = document.querySelector('.popup__form-input_name-add-a-card');
const popupFormDescriptionCard = document.querySelector('.popup__form-input_description-add-a-card');
//popup zoom picture cards
const popupZoomCards = document.querySelector('.popup_zoom-cards');
const popupZoomCardsPicture = document.querySelector('.popup__picture-zoom-cards');
const popupZoomCardsSubtitle = document.querySelector('.popup__subtitle-zoom-cards');
//popup для закрытия по click на overlay  
const popups = document.querySelectorAll('.popup');
//переменные для template//
const cardsContainer = document.querySelector('.element');

const config = {
    //Для класса CreateCard
    elementTemplate: '#element-template',
    likeButton: '.element__content-button-like',
    deleteIcon: '.element__trash',
    popupZoomCardsPictureWraper: '.element__picture-wrapper',
    popupZoomCardsSubtitle: '.popup__subtitle-zoom-cards',
    popups: '.popup',
    //для класса FormValidator
    formSelector: '.popup__form',
    formFieldset: '.popup__fieldset',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-button',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__span-input-error',
    
};



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

export { buttonPopupOn, popupEdit, popupFormEdit, formNameEdit, formDescriptionEdit, profileInfoName, profileInfoDescription, popupCard,
    buttonCard, popupFormCard, popupFormNameCard, popupFormDescriptionCard, popupZoomCards, popupZoomCardsPicture, popupZoomCardsSubtitle,
    popups, cardsContainer, config, initialCards };