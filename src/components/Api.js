//import { data } from "autoprefixer";

export default class Api {
    constructor(options) {
        this._host = options.host;
        this._headers = options.headers;
    };

    //Анализ ответа сервера
    _responseAnalysis(res) {
        if (res.ok) { return res.json(); }
        return Promise.reject(`Что-то пошло не так ${res.status}`)
    };

    //получение информации о пользователе
    getUserInfo() {
        return fetch(`${this._host}/users/me`,
            {
                headers: this._headers
            })
            .then(res => this._responseAnalysis(res))
    };

    //отправка данный из popup edit profile на сервер
    sendUserInfo(data) {
        return fetch(`${this._host}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
            .then(res => this._responseAnalysis(res))
    };

    //Загрузка карточек с сервера
    getCards() {
        return fetch(`${this._host}/cards`,
            {
                headers: this._headers
            })
            .then(res => this._responseAnalysis(res))
    };

    //Добавление новой карточки на сервер
    sendNewCard(data) {
        return fetch(`${this._host}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
            .then(res => this._responseAnalysis(res))
    };

    //Удаление своей карточки с сервера
    deleteCard(cardId) {
        return fetch(`${this._host}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res))
    };

    //Поставить like
    putLike(cardId) {
        return fetch(`${this._host}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res))
    };

    //убрать  like
    removeLike(cardId) {
        return fetch(`${this._host}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res))
    };

    //Обновление аватара пользователя
    avatarUpdate(avatarId) {
        return fetch(`${this._host}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarId.link
            })
        })
            .then(res => this._responseAnalysis(res))
    };
};

