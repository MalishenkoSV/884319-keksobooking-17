'use strict';
var COUNT = 8;
var TYPES = ['place', 'flat', 'house', 'bungalo'];
var MAP_WIDTH = 1200;
var MAP_HEIGTH_MIN = 130;
var MAP_HEIGTH_MAX = 630;
var map = document.querySelector('.map');
map.classList.remove('map--faded');

/**
 * Создает рандомное число
 * @param {number} min — минимальное число
 * @param {number} max -максимальное число
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
 * @param {object} k — число
 * @return {object} -- объект данных о объявлении
 */
var createData = function () {
  var x = getRandomFromInterval(0, MAP_WIDTH);
  var y = getRandomFromInterval(MAP_HEIGTH_MIN, MAP_HEIGTH_MAX);
  var advertData = {
    author: {
      avatar: 'img/avatars/user0' + getRandomFromInterval(1, COUNT) + '.png'
    },
    offer: {
      type: getRandomElementFromArray(TYPES)
    },
    location: {
      x: x,
      y: y
    }
  };
  return advertData;
};

/**
 * Создает массив обьектов обьявлений
 */

var adverts = [];
for (var i = 0; i < COUNT; i++) {
  var advert = createData(adverts[i]);
  adverts.push(advert);
}

/**
 * Создает и отрисовывает обьявление на карте
 * @param {object} pinData - данные обьекта обьявления для отрисовки пина
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
/**
 * Вставка  фрагмента а ДОМ
 */
var pinListElement = document.querySelector('.map__pins');
pinListElement.appendChild(fragment);
