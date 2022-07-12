
import { initialCards, config } from './array.js';
import CreateCard from './Сard.js';
import FormValidator from './FormValidator.js';

//для popup-edit-profile// resetFormValidation disablSubmit popup__form-add-a-card
const buttonPopupOn = document.querySelector('.profile__info-button');

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

initialCards.forEach((item) => {
    const card = new CreateCard(item, config, popupZoom)
    const elementCard = card.generateCard()
    document.querySelector('.element').append(elementCard)
})


//Валидация
const formValidatorFormEdit = new FormValidator(config, popupFormEdit);
formValidatorFormEdit.enableValidation()
//Валидация
const formValidatorFormCard = new FormValidator(config, popupFormCard);
formValidatorFormCard.enableValidation()

//открытие popup// 
function openPopupEdit() {
    //Синхронизирует поля формы и профиля в случае если из popup вышли через popup__close// 
    formNameEdit.value = profileInfoName.textContent;
    formDescriptionEdit.value = profileInfoDescription.textContent;
    formValidatorFormEdit.resetFormValidation();
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
    formValidatorFormCard.resetFormValidation();
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

//Привязываю карточки к popup zoom
function popupZoom(card) {
    popupZoomCardsPicture.src = card.link;
    popupZoomCardsPicture.alt = card.name;
    popupZoomCardsSubtitle.textContent = card.name;
    //Открываю popup zoom //
    popupZoomCards.classList.add('popup_visible');
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
popupCloseEdit.addEventListener('click', () => closePopup(popupEdit));
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);
buttonCard.addEventListener('click', openPopupCard);
popupCloseCard.addEventListener('click', () => closePopup(popupCard));
popupFormCard.addEventListener('submit', handleCardFormSubmit);
popupCloseZoomCards.addEventListener('click', () => closePopup(popupZoomCards));


