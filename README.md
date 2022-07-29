## Проектная работа №3 Яндекс Практикума.


## Описание Проекта
Проект представляет собой шаблон страницы пользователя с возможностью редактирования профился.
Состоит из:
- **Заголовка** Представлена в виде логотипа "Mesto Russia"
- **Карточка профиля** Состоит из фотографии профился , описания профился , кнопки редактирования описания профился (вызывает всплывающую форму pop-up) и кнопки загрузки дополнительных изображений .
- **Pop-up** Всплывающее окно вызываемое кнопкой расположенной в "карточке профиля"
- **Фотогалерея** Состоит из карточекс с изображением , описанием и кнопкой "Нравиться"
- **footer** здесь размещены ссылки на ресурсы сопутсвующие контексту лэндинга.   

В проекте используються кодировка **UTF-8**, язык резметки **HTML-5** в файле *index.html* , описание внешнего вида документа на языке **CSS** ,и функционал на javascript. Файловая структура **CSS** кода выполнена по методологии **БЭМ** по схеме **Nested**, все файлы к ней содержаться в пабке **blocks**.
К **HTML** разметке **CSS стили привязаны через файл index.css** *(находиться в папке **styles**)* в котором прописаны пути к 
различным элементов **CSS** стилей для проекта , и файл на языке **javascript** *(находиться в папке script)*.
- **Язык проекта RU.**  
- **Важно - в проекте используеться normalize.css**  *(расположен в попке vendor)*
## Макеты
- https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1 
- https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1

## Используемые технологии
### HTML:
- **Семантические теги**
### CSS:
- **Flexbox**
- **Grid**
- **Адаптивная верстка с использованием медиа-запросов**
- **Минификация CSS и автоматическое добавление вендорных префиксов**
- **Анимация элементов лендинга**
- **БЭМ Nested**
- **Псевдоклассы CSS**

### JavaScript:
- **Модульные окна с формой**
- **«Живая» валидация форм с помощью  js**
- **ES6-классы**
- **ООП**
- **Асинхронный код: промисы и HTTP-запросы**
- **Минификация и транспиляция JS Babel**
- **API сервера Яндекс.Практикум**
- **Webpack**
### Инструкция для работы с проектом:
**Для рабботы понадобиться установить git bash и NodeJS & npm** 
```
git clone git@github.com:VeraChernushina/mesto.git
  cd mesto
  npm i webpack --save-dev
  npm run build
  npm run dev
```
### Деплой проекта в Github Pages:
```
  npm run deploy

```
**Ссылка** на страницу :  https://alexander95433.github.io/mesto/src/dist2/index.html (Проект в доработке)

