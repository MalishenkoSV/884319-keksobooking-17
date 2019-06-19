'use strict';
var COUNT = 8;
var TYPES = ['place', 'flat', 'house', 'bungalo'];
var MAP_WIDTH = 1200;
var MAP_HEIGTH_MIN = 130;
var MAP_HEIGTH_MAX = 630;
// var MAIN_PIN_WIDTH = 65;
// var MAIN_PIN_HEIGHT = 81;
var mainPin = document.querySelector('.map__pin--main');
var formAdress = document.querySelector('.ad-form');
var map = document.querySelector('.map');
var typeSelect = formAdress.querySelector('#type');
var priceSelect = formAdress.querySelector('#price');
var timeinSelect = formAdress.querySelector('#timein');
var timeoutSelect = formAdress.querySelector('#timeout');
var MinPrice = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

/**
 * Создает рандомное число
 * @param {number} min — минимальное число
 * @param {number} max - максимальное число
 */

var getRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Создает рандомное число из массива
 * @param {array} arr -- массив
 * @return {array} arr
 */
var getRandomElementFromArray = function (arr) {
  return arr[getRandomFromInterval(0, arr.length - 1)];
};

/**
 * Создает обьект
 * @return {object} -- объект данных о объявлении
 */
var createData = function () {
  var advertData = {
    author: {
      avatar: 'img/avatars/user0' + getRandomFromInterval(1, COUNT) + '.png'
    },
    offer: {
      type: getRandomElementFromArray(TYPES)
    },
    location: {
      x: getRandomFromInterval(0, MAP_WIDTH),
      y: getRandomFromInterval(MAP_HEIGTH_MIN, MAP_HEIGTH_MAX)
    }
  };
  return advertData;
};

/**
 * Создает массив обьектов обьявлений
 */

var adverts = [];
for (var i = 0; i < COUNT; i++) {
  var advert = createData(i);
  adverts.push(advert);
}
/**
 * Создает и отрисовывает обьявление на карте
 * @param {object} pinData -- данные обьекта обьявления для отрисовки пина
 * @return {object} -- элемент с данными о обьявлении
 */

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var createMapPin = function (pinData) {
  if (pinData) {
    var pinCloneElement = pinTemplate.cloneNode(true);
    pinTemplate.style = 'left:' + pinData.location.x + 'px;top:' + pinData.location.y + 'px;';
    pinTemplate.querySelector('img').src = pinData.author.avatar;
    pinTemplate.querySelector('img').alt = pinData.offer.avatar;
  }
  return pinCloneElement;
};

/**
 * Вставка обьявлений во фрагмент
 */
var fragment = document.createDocumentFragment();
for (var j = 0; j < adverts.length; j++) {
  var element = createMapPin(adverts[j]);
  fragment.appendChild(element);
}
// var fragment = document.createDocumentFragment();
// adverts.forEach(function () {
//   fragment.appendChild(createMapPin(advert));
// });

/**
 *  Блокировка полей
 */
var fieldsetList = formAdress.querySelectorAll('fieldset');
for (i = 0; i < fieldsetList.length; i++) {
  fieldsetList[i].setAttribute('disabled', 'true');
}
/**
 * Функция активации карты
 * удаление класса деактивации
 * удаления класса деактивации полей формы
 * вставка в ДОМ фрагмента и отрисовка пинов
 */
var formActive = function () {
  map.classList.remove('map--faded');
  formAdress.classList.remove('ad-form--disabled');
  document.querySelector('.map__pins').appendChild(fragment);
};

/**
 * Функция определения координат адресса метки
 * @param {number} x -- координата по горизонтали
 * @param {number} y -- координата по вертикали
 */
var setAddressCoords = function (x, y) {
  formAdress.querySelector('#address').value = x + ', ' + y;
};

/**
 * Функция активации страницы
 * активация формы
 * разблокирование полей формы
 * определение координаты метки
 * активация страницы по клику
 */
var activatePage = function () {
  formActive();
  for (i = 0; i < fieldsetList.length; i++) {
    fieldsetList[i].removeAttribute('disabled');
  }
  setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH_MAX / 2);
  mainPin.removeEventListener('mouseup', activatePage);
};

/**
 * Функция активации страницы при клике на главную метку
 */
mainPin.addEventListener('mouseup', activatePage);

/**
 * Функция обработчик события изменений на поле цены
 * значение мин цены берется из перечисления
 */
typeSelect.addEventListener('change', function () {
  priceSelect.min = MinPrice[typeSelect.value.toUpperCase()];
  priceSelect.placeholder = MinPrice[typeSelect.value.toUpperCase()];
});
/**
 * Функция - обработчик события изменения на поле заезда
 * @param {Event} evt
 */
timeinSelect.addEventListener('change', function (evt) {
  timeoutSelect.value = evt.target.value;
});

/**
 * Функция - обработчик событий на поле выезда
 * @param {Event} evt
 */
timeoutSelect.addEventListener('change', function (evt) {
  timeinSelect.value = evt.target.value;
});
