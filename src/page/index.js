import './index.css';
import {
    buttonPopupOn, formNameEdit, formDescriptionEdit, buttonCard, config, avatarWrapper
} from '../utils/constants-array.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

//Вынесенные переменные классов
let userId;

//Api запрос
const api = new Api({
    host: 'https://mesto.nomoreparties.co/v1/cohort-47',
    headers: {
        authorization: '39dffeee-b595-4873-9b86-da022740c5b2',
        'Content-Type': 'application/json'
    },
});

//Api одновременно выполнил promises синхронизации dataUser и инициализировал массив карточек на страницу
Promise.all([api.getUserInfo(), api.getCards()])
    .then(([dataUser, dataCards]) => {
        userInfo.avatarLoading()
        userId = dataUser._id
        userInfo.setUserInfo(dataUser)
        section.renderItems(dataCards)
    })
    .catch(err => console.log(`Ошибка: ${err}`));

// класс удаления карточки
const popupWithConfirmation = new PopupWithConfirmation('.popup-delete-card')

// класс для открытия popup zoom
const popupWithImage = new PopupWithImage('.popup_zoom-cards');
popupWithImage.setEventListeners();

//Функция создание новой карточки
function createCard(item) {
    const card = new Card(item, config, userId, {
        handleCardClick: () => { popupWithImage.open(item) },
        popupDeleteCardSubmit: (cardId) => {
            popupWithConfirmation.open()
            popupWithConfirmation.callbackDeleteCard(() => {
                api.deleteCard(cardId)
                    .then(() => card.deleteCard())
                    .catch(err => console.log(`Ошибка ${err}`))
            });
        },
        clickOnLike: (cardId) => {
            api.putLike(cardId)
                .then(data => card._changingStatusLikeButton(data))
                .catch(err => console.log(`Ошибка ${err}`))
        },
        clickDeleteLike: (cardId) => {
            api.removeLike(cardId)
                .then(data => card._changingStatusLikeButton(data))
                .catch(err => console.log(`Ошибка ${err}`))
        }
    });
    const cardElement = card.generateCard();
    return cardElement
};
//добавил слушателя с функциями для popup и кнопки submit popup delete card  
popupWithConfirmation.setEventListeners()

//Разложить массив из сервера с карточками     
const section = new Section({
    renderer: (item) => { section.addItem(createCard(item)) }
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
    description: '.profile__info-description',
    avatar: '.profile__avatar'
});

//Добваляет новую карточку 
const popupWithFormCard = new PopupWithForm(config, {
    handleProfileFormSubmit: (inputElements) => {
        popupWithFormCard.loading(true)
        //Api загрузил на сервер
        api.sendNewCard(inputElements)
            .then((formdata) => {
                popupWithFormCard.loading(false)
                section.addItemNewCard(createCard(formdata))
                popupWithFormCard.close()
            })
            .catch(err => console.log(`Ошибка ${err}`))
    }
}, '.popup-add-a-card');
popupWithFormCard.setEventListeners()

///обработчик кнопки submit редактирования профиля
const popupWithFormProfile = new PopupWithForm(config, {
    handleProfileFormSubmit: (inputElements) => {
        popupWithFormProfile.loading(true)
        //Api загрузить иформацию из popup edit prufile на сервер
        api.sendUserInfo(inputElements)
            .then((data) => {
                popupWithFormProfile.loading(false)
                userInfo.setUserInfo(data);
                popupWithFormProfile.close();
            })
            .catch(err => console.log(`Ошибка ${err}`))
    }
}, '.popup-edit-profile')
popupWithFormProfile.setEventListeners()

// popup update avatar
const updateAvatarPopupWithForm = new PopupWithForm(config, {
    handleProfileFormSubmit: (inputElements) => {
        updateAvatarPopupWithForm.loading(true)
        //Api загрузить аватар
        api.avatarUpdate(inputElements)
            .then((data) => {
                updateAvatarPopupWithForm.loading(false)
                userInfo.setUserInfo(data);
                updateAvatarPopupWithForm.close();
            })
            .catch(err => console.log(`Ошибка ${err}`))
    }
}, '.popup-update-avatar')
updateAvatarPopupWithForm.setEventListeners()

//открыть popup update avatar
function openPopupUpdateAvatar() {
    updateAvatarPopupWithForm.open();
};

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
avatarWrapper.addEventListener('click', openPopupUpdateAvatar)
