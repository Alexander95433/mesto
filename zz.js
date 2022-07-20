


//открытие popup// 
function openPopupEdit() {
    //Синхронизирует поля формы и профиля в случае если из popup вышли через popup__close//
     formNameEdit.value = profileInfoName.textContent;
     formDescriptionEdit.value = profileInfoDescription.textContent;
    formValidators['profile-edit'].resetFormValidation();
    popupWithFormProfile.open();
};
////////////////////////////////////////////////////////////////////////

///обработчик отрытия , закрытия popup добавления новой карточки
const popupWithFormCard = new PopupWithForm(config, {
    handleProfileFormSubmit: (inputElements) => {
        const newCards = new Section({
            data: [inputElements],
            // [{
            //     name: inputElements.name,
            //     alt: inputElements.name,
            //     link: inputElements.url,
            // }], 
            renderer: (item) => {
                const card = new Card(item, config, {
                    popupZoom: () => {
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
//////////////////////////////////////////////////////////////////////////////////////

///обработчик отрытия , закрытия popup редактирование профиля
const popupWithFormProfile = new PopupWithForm(config, {
    handleProfileFormSubmit: (inputElements) => {
        profileInfoName.textContent = inputElements.name;
        profileInfoDescription.textContent = inputElements.description;
         // profileInfoName.textContent = formNameEdit.value;
        // profileInfoDescription.textContent = formDescriptionEdit.value;
        popupWithFormProfile.close()
    }
}, '.popup-edit-profile')
popupWithFormProfile.setEventListeners()



//Добавить новую карточку//
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCards = new Section({
        data: [{
            name: popupFormNameCard.value,
            alt: popupFormNameCard.value,
            link: popupFormDescriptionCard.value,
        }], renderer: (item) => {
            const card = new Card(item, config, {
                popupZoom: () => {
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
    popupFormCard.reset();
    //closePopup(popupCard)
};


//Кнопка "сохранить" в popup//
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileInfoName.textContent = formNameEdit.value;
    profileInfoDescription.textContent = formDescriptionEdit.value;
    //closePopup(popupEdit);
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

// //универсальная функция для открытия popup//
function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closeByEscape)
};

// //универсальная функция для закрытия popup//
function closePopup(popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', closeByEscape)
};

//Разложить массив карточек 
initialCards.forEach((item) => {
    cardsContainer.append(createCard(item))
});

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

//Создать карточку Card 
function createCard(item) {
    const card = new Card(item, config, popupZoom)
    const elementCard = card.generateCard()
    return elementCard
};