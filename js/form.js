// form.js
'use strict';
(function () {
  var mapFiltersList = document.querySelector('.map__filters');
  var selectsList = mapFiltersList.querySelectorAll('select');
  var formAddress = document.querySelector('.ad-form');
  var fieldsetsList = formAddress.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var typeSelect = formAddress.querySelector('#type');
  var priceSelect = formAddress.querySelector('#price');
  var timeinSelect = formAddress.querySelector('#timein');
  var timeoutSelect = formAddress.querySelector('#timeout');
  var roomSelect = formAddress.querySelector('#room_number');
  var guestSelect = formAddress.querySelector('#capacity');
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
  /**
   * Функция активации карты
   * удаление класса деактивации
   * удаления класса деактивации полей формы
   */

  var disableForm = function () {
    fieldsetsList.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
    selectsList.forEach(function (select) {
      select.disabled = true;
    });
  };
  var activateForm = function () {
    map.classList.remove('map--faded');
    formAddress.classList.remove('ad-form--disabled');
    mapFiltersList.classList.remove('ad-form--disabled');
    disableForm(false);
  };
  var deactivateForm = function () {
    map.classList.add('map--faded');
    formAddress.classList.add('ad-form--disabled');
    mapFiltersList.classList.add('ad-form--disabled');
    disableForm();
  };
  /**
   * Функция определения координат адресса метки
   * @param {number} x -- координата по горизонтали
   * @param {number} y -- координата по вертикали
   */
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

  /**
   * Функция валидации формы по количеству комнат соответственно количеству гостей
   */
  var validateGuestAndRoom = function () {
    var rooms = RoomToGuest['ROOM_' + roomSelect.value];
    var isMatch = false;
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i] === guestSelect.value) {
        isMatch = true;
        break;
      }
    }
    if (isMatch) {
      roomSelect.setCustomValidity('');
    } else {
      roomSelect.setCustomValidity('Количество гостей больше возможного');
    }
  };
  /**
   * Функция показа сообщения при удачной отправке формы
   */
  var onFormSave = function () {
    window.popup.showSuccessMessage();
  };
  /**
   * Функция отправки данных формы
   * @param{object} evt
   */
  var onSubmitClick = function (evt) {
    validateGuestAndRoom();
    evt.preventDefault();
    var formData = new FormData(evt.currentTarget);
    window.backend.save(formData, onFormSave, window.popup.showErrorMessage);
    if (onFormSave) {
      window.map.deactivatePage();
    }
  };
  formAddress.addEventListener('submit', onSubmitClick);

  window.form = {
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();
