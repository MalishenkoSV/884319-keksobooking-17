// variables.js
'use strict';
(function () {
  var COUNT = 8;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH_MIN = 130;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 81;
  var MAX_NUM_PINS = 5;
  var MAP_HEIGTH_MAX = 750;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MAX = 5;
  var ROOMS_MIN = 1;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 7;
  var PIN_CLASS = 'map__pin';
  var PIN_ACTIVE_CLASS = 'map__pin--active';
  var PIN_MAIN_CLASS = 'map__pin--main';
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPES = ['place', 'flat', 'house', 'bungalo'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var Border = {
    LEFT: 0,
    RIGHT: MAP_WIDTH - MAIN_PIN_WIDTH,
    TOP: MAP_HEIGTH_MIN,
    BOTTOM: MAP_HEIGTH_MAX - MAIN_PIN_HEIGHT
  };
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var formAdress = document.querySelector('.ad-form');
  var formAddress = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapListPinElement = document.querySelector('.map__pins');
  var pin = mapListPinElement.querySelector('.map__pin');
  var mainPin = map.querySelector('.map__pin--main');
  var button = formAddress.querySelector('.ad-form__submit');
  var resetForm = formAdress.querySelector('.ad-form__reset');
  var activePin = document.querySelector('.' + PIN_ACTIVE_CLASS);
  window.variables = {
    COUNT: COUNT,
    TYPES: TYPES,
    MAP_HEIGTH_MIN: MAP_HEIGTH_MIN,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    TITLES: TITLES,
    PRICE_MAX: PRICE_MAX,
    PRICE_MIN: PRICE_MIN,
    ROOMS_MAX: ROOMS_MAX,
    ROOMS_MIN: ROOMS_MIN,
    GUESTS_MAX: GUESTS_MAX,
    GUESTS_MIN: GUESTS_MIN,
    CHECKIN_TIME: CHECKIN_TIME,
    CHECKOUT_TIME: CHECKOUT_TIME,
    FEATURES: FEATURES,
    PIN_CLASS: PIN_CLASS,
    PIN_ACTIVE_CLASS: PIN_ACTIVE_CLASS,
    PIN_MAIN_CLASS: PIN_MAIN_CLASS,
    MAX_NUM_PINS: MAX_NUM_PINS,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    activePin: activePin,
    formAdress: formAdress,
    mainPin: mainPin,
    formAddress: formAddress,
    map: map,
    pin: pin,
    Border: Border,
    pinTemplate: pinTemplate,
    mapListPinElement: mapListPinElement,
    button: button,
    resetForm: resetForm
  };
})();
