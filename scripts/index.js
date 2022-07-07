
import { initialCards, config } from './array.js';
import CreateCard from './Сard.js';
//для popup-edit-profile// 
const buttonPopupOn = document.querySelector('.profile__info-button');
const popupClassOn = document.querySelector('.popup_visible');
const popupCloseEdit = document.querySelector('.popup__close-edit-profile');
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
const popupCloseCard = document.querySelector('.popup__close-add-a-card');
const buttonCreatePopupCard = document.querySelector('.popup__form-button');
const popupFormCard = document.querySelector('.popup__form-add-a-card');
const popupFormNameCard = document.querySelector('.popup__form-input_name-add-a-card');
const popupFormDescriptionCard = document.querySelector('.popup__form-input_description-add-a-card');
//popup zoom picture cards
const popupZoomCards = document.querySelector('.popup_zoom-cards');
const popupZoomCardsPicture = document.querySelector('.popup__picture-zoom-cards');
const popupZoomCardsSubtitle = document.querySelector('.popup__subtitle-zoom-cards');
const popupCloseZoomCards = document.querySelector('.popup__close_zoom-cards');
//popup для закрытия по click на overlay
const popups = document.querySelectorAll('.popup');
const popupGlobal = document.querySelector('.popup');
//переменные для template//
const elementTemplate = document.querySelector('#element-template').content;
const cardsContainer = document.querySelector('.element');

//универсальная функция для открытия popup//
function openPopup(popup) {
    popup.classList.add('popup_visible');
};

//универсальная функция для закрытия popup//
function closePopup(popup) {
    popup.classList.remove('popup_visible');
};

initialCards.forEach((item) => {
    const card = new CreateCard(item, config)
    const elementCard = card.generateCard()
    document.querySelector('.element').append(elementCard)
})


//открытие popup// 
function openPopupEdit() {
    //Синхронизирует поля формы и профиля в случае если из popup вышли через popup__close// 
    formNameEdit.value = profileInfoName.textContent;
    formDescriptionEdit.value = profileInfoDescription.textContent;
    //resetFormValidation(popupFormEdit, [formNameEdit, formDescriptionEdit], elementsStack);
    openPopup(popupEdit);
};

//Кнопка "сохранить" в popup//
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileInfoName.textContent = formNameEdit.value;
    profileInfoDescription.textContent = formDescriptionEdit.value;
    closePopup(popupEdit);
};

//открыть popup add-a-card//
function openPopupCard() {
    popupFormCard.reset();
   // resetFormValidation(popupFormCard, [popupFormNameCard, popupFormDescriptionCard], elementsStack);
    openPopup(popupCard);
};

//Добавить новую карточку//
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const CardElement = new CreateCard({
        name: popupFormNameCard.value,
        alt: popupFormNameCard.value,
        link: popupFormDescriptionCard.value
    }, config)
    const nevCardElement = CardElement.generateCard()
    cardsContainer.prepend(nevCardElement);
    popupFormCard.reset();
    closePopup(popupCard)
};

//Закрываю popup по click на overlay
popups.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup')) {
            closePopup(popupElement);
        };
    });
});

//Закрываю popup кнопкой Escape
popups.forEach((popupElement) => {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopup(popupElement);
        };
    });
});












//слушатели//
buttonPopupOn.addEventListener('click', openPopupEdit);
popupCloseEdit.addEventListener('click', () => closePopup(popupEdit));
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);
buttonCard.addEventListener('click', openPopupCard);
popupCloseCard.addEventListener('click',  ()=> closePopup(popupCard));
popupFormCard.addEventListener('submit', handleCardFormSubmit);
popupCloseZoomCards.addEventListener('click', zoomPictureCardsOff);

