export default class UserInfo {
    constructor({ userName, description }) {
        this._userName = document.querySelector(userName);
        this.description = document.querySelector(description);
    };

    // возвращает объект с данными пользователя
    getUserInfo () {
        this._userInfo = {
            name: this._userName.textContent,
            description: this.description.textContent
        };
        return this._userInfo ;
    };

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._userName.textContent = data.name
        this.description.textContent =  data.description
    };
};