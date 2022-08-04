import './index.css';
import {
    buttonPopupOn, formNameEdit, formDescriptionEdit, buttonCard, config, initialCards
} from '../utils/constants-array';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section .js';

//////////////////////////////////////////////////////////////////////////////////////////

//Api запрос
const api = new Api({
    host: ' https://mesto.nomoreparties.co/v1/cohort-47',
    headers: {
        authorization: '39dffeee-b595-4873-9b86-da022740c5b2',
        'Content-Type': 'application/json'
    }
});

//Одновременно выполнил promises синхронизации dataUser и инициализировал массив карточек на страницу
Promise.all([api.getUserInfo(), api.getCards()])
    .then(([dataUser, dataCards]) => {
        userInfo.setUserInfo(dataUser)
        defaultCards.renderItems(dataCards)

    })


//////////////////////////////////////////////////////////////////////////////////////////

// класс для открытия popup zoom
const popupWithImage = new PopupWithImage('.popup_zoom-cards');
popupWithImage.setEventListeners();

// создание новой карточки
function createCard(item) {
    const card = new Card(item, config, {
        handleCardClick: () => {
            popupWithImage.open(item)
        }
    });
    //сгенерировал 
    const cardElement = card.generateCard();
    return cardElement
};

//Добавить исходный массив с карточками и подключаю к ним popup zoom    
const defaultCards = new Section({
    renderer: (item) => {
        //создал разметку
        createCard(item)
        //добавил на страницу
        defaultCards.addItem(createCard(item))
    }
}, '.element');

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
    description: '.profile__info-description'
});

///обработчик кнопки submit редактирования профиля
const popupWithFormProfile = new PopupWithForm(config, {
    handleProfileFormSubmit: (inputElements) => {
        //Api загрузить иформацию из popup edit prufile на сервер
        api.sendUserInfo(inputElements)
            .then((data) => {
                userInfo.setUserInfo(data);
                popupWithFormProfile.close();
            })
    }
}, '.popup-edit-profile')
popupWithFormProfile.setEventListeners()

///Добваляет новую карточку и подключаю к нией popup zoom
const popupWithFormCard = new PopupWithForm(config, {
    handleProfileFormSubmit: (inputElements) => {
        //создал разметку
        createCard(inputElements)
        //добавил на страницу
        defaultCards.addItem(createCard(inputElements))
        //закрыл popup
        popupWithFormCard.close()
    }
}, '.popup-add-a-card');
popupWithFormCard.setEventListeners()

//открытие popup// 
function openPopupEdit() {
    // объект с данными пользователя
    const userData = userInfo.getUserInfo()
    //Синхронизирует поля формы и профиля в случае если из popup вышли через не через submit
    formNameEdit.value = userData.name;
    formDescriptionEdit.value = userData.about;
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
