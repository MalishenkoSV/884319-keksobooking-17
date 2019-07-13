// variables.js
'use strict';
(function () {
  var COUNT = 8;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH_MIN = 130;
  var MAP_HEIGTH = 630;
  var MAP_HEIGTH_MAX = 750;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 81;
  var NUMBER_PINS = 5;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MAX = 5;
  var ROOMS_MIN = 1;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 7;
  var TIMEOUT_LOAD = 1000;
  var STATUS_LOAD = 200;
  var PIN_CLASS = 'map__pin';
  var PIN_ACTIVE_CLASS = 'map__pin--active';
  var PIN_MAIN_CLASS = 'map__pin--main';
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPES = ['place', 'flat', 'house', 'bungalo'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var housingType = {
    BUNGALO: 'Бунгало',
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
  };
  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };
  var RoomToGuest = {
    ROOM_1: ['1'],
    ROOM_2: ['1', '2'],
    ROOM_3: ['1', '2', '3'],
    ROOM_100: ['0'],
  };
  var Border = {
    LEFT: 0,
    RIGHT: MAP_WIDTH - MAIN_PIN_WIDTH,
    TOP: MAP_HEIGTH_MIN,
    BOTTOM: MAP_HEIGTH_MAX - MAIN_PIN_HEIGHT
  };
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var formAdress = document.querySelector('.ad-form');
  var typeSelect = formAdress.querySelector('#type');
  var priceSelect = formAdress.querySelector('#price');
  var timeinSelect = formAdress.querySelector('#timein');
  var timeoutSelect = formAdress.querySelector('#timeout');
  var formAddress = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapListPinElement = document.querySelector('.map__pins');
  var pin = mapListPinElement.querySelector('.map__pin');
  var mainPin = map.querySelector('.map__pin--main');
  var fieldsetList = formAdress.querySelectorAll('fieldset');
  var button = formAddress.querySelector('.ad-form__submit');
  var roomSelect = formAddress.querySelector('#room_number');
  var guestSelect = formAddress.querySelector('#capacity');
  var filtersContainer = document.querySelector('.map__filters-container');
  var filtersHouse = document.querySelector('.map__filters');
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var mapListCardElement = document.querySelector('.map');
  var card = document.querySelector('.map__card.popup');
  var resetForm = formAdress.querySelector('.ad-form__reset');
  var activePin = document.querySelector('.' + PIN_ACTIVE_CLASS);
  window.variables = {
    COUNT: COUNT,
    TYPES: TYPES,
    MAP_WIDTH: MAP_WIDTH,
    MAP_HEIGTH: MAP_HEIGTH,
    MAP_HEIGTH_MIN: MAP_HEIGTH_MIN,
    MAP_HEIGTH_MAX: MAP_HEIGTH_MAX,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    NUMBER_PINS: NUMBER_PINS,
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
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    TIMEOUT_LOAD: TIMEOUT_LOAD,
    STATUS_LOAD: STATUS_LOAD,
    activePin: activePin,
    formAdress: formAdress,
    typeSelect: typeSelect,
    priceSelect: priceSelect,
    timeinSelect: timeinSelect,
    timeoutSelect: timeoutSelect,
    MinPrice: MinPrice,
    mainPin: mainPin,
    formAddress: formAddress,
    map: map,
    pin: pin,
    Border: Border,
    fieldsetList: fieldsetList,
    pinTemplate: pinTemplate,
    mapListPinElement: mapListPinElement,
    button: button,
    roomSelect: roomSelect,
    guestSelect: guestSelect,
    RoomToGuest: RoomToGuest,
    housingType: housingType,
    filtersContainer: filtersContainer,
    template: template,
    mapListCardElement: mapListCardElement,
    filtersHouse: filtersHouse,
    card: card,
    resetForm: resetForm
  };
})();
