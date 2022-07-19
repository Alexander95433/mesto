import {
    buttonPopupOn, popupEdit, popupFormEdit, formNameEdit, formDescriptionEdit, profileInfoName, profileInfoDescription, popupCard,
    buttonCard, popupFormCard, popupFormNameCard, popupFormDescriptionCard, popupZoomCards, popupZoomCardsPicture, popupZoomCardsSubtitle,
    popups, cardsContainer, config, initialCards
} from './utils/constants-array.js';
import Card from './components/Сard.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section .js';

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



///////////////////////////////////////////////////////////////////
//Добавить исходный массив с карточками
const defaultCards = new Section({
    data: initialCards, renderer: (item) => {
        const card = new Card(item, config, popupZoom)
        const cardElement = card.generateCard()
        defaultCards.setItem(cardElement)
    }
}, cardsContainer);
defaultCards.renderItems()

//Добавить новую карточку//
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCards = new Section({
        data: [{
            name: popupFormNameCard.value,
            link: popupFormDescriptionCard.value
        }], renderer: (item) => {
            const card = new Card(item, config, popupZoom)
            const cardElement = card.generateCard()
            newCards.setItem(cardElement)
        }
    }, cardsContainer);
    newCards.renderItems();
    popupFormCard.reset();
    closePopup(popupCard)
}

//////////////////////////////////////////////////////////////////





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



