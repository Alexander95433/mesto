
import { initialCards, config } from './array.js';
import Card from './Сard.js';
import FormValidator from './FormValidator.js';

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

//универсальная функция для открытия popup//
function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closeByEscape)
};

//универсальная функция для закрытия popup//
function closePopup(popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', closeByEscape)
};

//Разложить массив карточек 
initialCards.forEach((item) => {
    cardsContainer.append(createCard(item))
});

//Создать карточку Card CreateCard
function createCard(item) {
    const card = new Card(item, config, popupZoom)
    const elementCard = card.generateCard()
    return elementCard
};

//Подключить к валидации универсальные формы
const formValidators = {};
const connectFormsToValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        validator.enableValidation()
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
    });
};
connectFormsToValidation(config)

//открытие popup// 
function openPopupEdit() {
    //Синхронизирует поля формы и профиля в случае если из popup вышли через popup__close// 
    formNameEdit.value = profileInfoName.textContent;
    formDescriptionEdit.value = profileInfoDescription.textContent;
    formValidators['profile-edit'].resetFormValidation();
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
    //Валидация формы редактирования профиля
    formValidators['add-a-card'].resetFormValidation();
    openPopup(popupCard);
};

//Добавить новую карточку//
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    cardsContainer.prepend(createCard({
        name: popupFormNameCard.value,
        alt: popupFormNameCard.value,
        link: popupFormDescriptionCard.value
    }));
    popupFormCard.reset();
    closePopup(popupCard)
};

//Привязываю карточки к popup zoom
function popupZoom(card) {
    popupZoomCardsPicture.src = card.link;
    popupZoomCardsPicture.alt = card.name;
    popupZoomCardsSubtitle.textContent = card.name;
    //Открываю popup zoom //
    openPopup(popupZoomCards)
};

//Закрываю popup по click на overlay
popups.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_visible')) {
            closePopup(popupElement);
        };
        if (evt.target.classList.contains('popup__close'))
            closePopup(popupElement);
    });
});

//Закрываю popup кнопкой Escape
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_visible');
        closePopup(openPopup);
    };
};

//слушатели//
buttonPopupOn.addEventListener('click', openPopupEdit);
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);
buttonCard.addEventListener('click', openPopupCard);
popupFormCard.addEventListener('submit', handleCardFormSubmit);



