// form.js
'use strict';
(function () {
  /**
   * Функция активации карты
   * удаление класса деактивации
   * удаления класса деактивации полей формы
   */
  var activeForm = function () {
    window.variables.map.classList.remove('map--faded');
    window.variables.formAdress.classList.remove('ad-form--disabled');
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
  window.variables.typeSelect.addEventListener('change', function () {
    window.variables.priceSelect.min = window.variables.MinPrice[window.variables.typeSelect.value.toUpperCase()];
    window.variables.priceSelect.placeholder = window.variables.MinPrice[window.variables.typeSelect.value.toUpperCase()];
  });
  /**
   * Функция - обработчик события изменения на поле заезда
   * @param {Event} evt
   */
  window.variables.timeinSelect.addEventListener('change', function (evt) {
    window.variables.timeoutSelect.value = evt.target.value;
  });

  /**
   * Функция - обработчик событий на поле выезда
   * @param {Event} evt
   */
  window.variables.timeoutSelect.addEventListener('change', function (evt) {
    window.variables.timeinSelect.value = evt.target.value;
  });

  var validateGuestAndRoom = function () {
    var rooms = window.variables.RoomToGuest['ROOM_' + window.variables.roomSelect.value];
    var isMatch = false;
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i] === window.variables.guestSelect.value) {
        isMatch = true;
        break;
      }
    }
    if (isMatch) {
      window.variables.roomSelect.setCustomValidity('');
    } else {
      window.variables.roomSelect.setCustomValidity('Количество гостей больше возможного');
    }
  };
  var onFormSave = function () {
    window.popup.showSuccessMessage();
  };
  var onSubmitClick = function (evt) {
    validateGuestAndRoom();
    evt.preventDefault();
    var formData = new FormData(evt.currentTarget);
    window.backend.save(formData, onFormSave, window.popup.showSubmitError);
  };
  window.variables.formAdress.addEventListener('submit', onSubmitClick);

  window.form = {
    activeForm: activeForm
  };
})();
