import './page/index.css';
import {
    buttonPopupOn, formNameEdit, formDescriptionEdit,buttonCard,cardsContainer, config, initialCards
} from './utils/constants-array.js';
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Card from './components/Сard.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section .js';

//Добавить исходный массив с карточками и подключаю к ним popup zoom
const defaultCards = new Section({
    data: initialCards, renderer: (item) => {
        const card = new Card(item, config, {
            handleCardClick: () => {
                const popupWithImage = new PopupWithImage('.popup_zoom-cards')
                popupWithImage.open(item)
                popupWithImage.setEventListeners()
            }
        });
        const cardElement = card.generateCard();
        defaultCards.setItem(cardElement);
    }
}, cardsContainer);
defaultCards.renderItems();

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
connectFormsToValidation(config);

//заполняет поля информации о профиле
const userInfo = new UserInfo({
    userName: '.profile__info-name',
    description: ".profile__info-description"
});

///обработчик кнопки submit редактирования профиля
const popupWithFormProfile = new PopupWithForm(config, {
    handleProfileFormSubmit: (inputElements) => {
        //заполнил полья данных о пользователе
        userInfo.setUserInfo(inputElements);
        popupWithFormProfile.close();
    }
}, '.popup-edit-profile')
popupWithFormProfile.setEventListeners()

///Добваляет новую карточку и подключаю к нией popup zoom
const popupWithFormCard = new PopupWithForm(config, {
    handleProfileFormSubmit: (inputElements) => {
        const newCards = new Section({
            data: [inputElements],
            renderer: (item) => {
                const card = new Card(item, config, {
                    handleCardClick: () => {
                        const popupWithImage = new PopupWithImage('.popup_zoom-cards')
                        popupWithImage.open(item)
                        popupWithImage.setEventListeners()
                    }
                })
                const cardElement = card.generateCard()
                newCards.setItem(cardElement)
            }
        }, cardsContainer);
        newCards.renderItems();
        popupWithFormCard.close()
    }
}, '.popup-add-a-card')
popupWithFormCard.setEventListeners()


//открытие popup// 
function openPopupEdit() {
    //Синхронизирует поля формы и профиля в случае если из popup вышли через не через submit
    formNameEdit.value = userInfo.getUserInfo().name;
    formDescriptionEdit.value = userInfo.getUserInfo().description;
    formValidators['profile-edit'].resetFormValidation();
    popupWithFormProfile.open();
};


//открыть popup add-a-card//
function openPopupCard() {
    //Валидация формы редактирования профиля
    formValidators['add-a-card'].resetFormValidation();
    popupWithFormCard.open();
};


//слушатели//
buttonPopupOn.addEventListener('click', openPopupEdit);
buttonCard.addEventListener('click', openPopupCard);



