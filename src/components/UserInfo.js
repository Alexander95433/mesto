export default class UserInfo {
    constructor({ userName, description, avatar }) {
        this._userName = document.querySelector(userName);
        this._description = document.querySelector(description);
        this._avatar = document.querySelector(avatar)
        this._avatar = document.querySelector('.profile__avatar')
        this._avatarSpinLoading = document.querySelector('.profile__avatar-loading')
        this._avatarTitleLoading = document.querySelector('.profile__avatar-loading-title')

    };

    // возвращает объект с данными пользователя
    getUserInfo() {
        this._userInfo = {
            name: this._userName.textContent,
            about: this._description.textContent,
            avatar: this._avatar.src

        };
        return this._userInfo;
    };

    avatarLoading() {
        this._avatarSpinLoading.hidden = true;
        this._avatarTitleLoading.hidden = true;
        this._avatar.hidden = false;
    }
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._userName.textContent = data.name
        this._description.textContent = data.about
        this._avatar.src = data.avatar

    };
};