// form.js
'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var selects = mapFilters.querySelectorAll('select');
  var fieldsets = document.querySelectorAll('fieldset');
  var adForm = document.querySelector('.ad-form');
  var priceSelect = adForm.querySelector('#price');
  var timeinSelect = adForm.querySelector('#timein');
  var timeoutSelect = adForm.querySelector('#timeout');
  var roomSelect = adForm.querySelector('#room_number');
  var guestSelect = adForm.querySelector('#capacity');
  var submitForm = adForm.querySelector('.ad-form__submit');
  var resetForm = adForm.querySelector('.ad-form__reset');
  var addressInput = adForm.querySelector('#address');
  var guestToRoomNumber = {
    0: [100],
    1: [1, 2, 3],
    2: [2, 3],
    3: [3]
  };
  var setAddressCoords = function (x, y) {
    adForm.querySelector('#address').value = x + ', ' + y;
    addressInput.defaultValue = addressInput.value;
  };
  var disableForm = function (list, newStatus) {
    Array.from(list).forEach(function (listElement) {
      listElement.disabled = newStatus;
    });
  };

  /**
   * Функция активации карты
   * @param{element} list
   * @param{buleon} newStatus
   */
  var enableMap = function () {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form--disabled');
    disableForm(fieldsets, false);
    disableForm(selects, false);
  };

  var disableMap = function () {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('ad-form--disabled');
    disableForm(fieldsets, true);
    disableForm(selects, true);
  };
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };
  /**
   * Функция - обработчик событий на поле выезда
   * @param {Event} evt
   */
  timeoutSelect.addEventListener('change', function (evt) {
    timeinSelect.value = evt.target.value;
  });
  /**
   * Функция - обработчик события изменения на поле заезда
   * @param {Event} evt
   */
  timeinSelect.addEventListener('change', function (evt) {
    timeoutSelect.value = evt.target.value;
  });
  var updateAddNoticeMinPrice = function (offerType) {
    priceSelect.min = window.data.OfferTypes[offerType.toUpperCase()].minPrice;
    priceSelect.placeholder = priceSelect.min;
  };
  var onFormFieldInput = {
    'type': function (field) {
      updateAddNoticeMinPrice(field.value);
    },
    'capacity': function (field) {
      if (!guestToRoomNumber[field.value].includes(+roomSelect.value)) {
        field.setCustomValidity('Количество мест не соответствует количеству комнат');
      } else {
        field.setCustomValidity('');
      }
    },
    'room_number': function () {
      // in case user changes room_number field to fix capacity error
      if (guestToRoomNumber[guestSelect.value].includes(+roomSelect.value)) {
        guestSelect.setCustomValidity('');
      }
    }
  };
  adForm.addEventListener('input', function (evt) {
    if (onFormFieldInput[evt.target.id]) {
      onFormFieldInput[evt.target.id](evt.target);
    }
  });

  var lock = function () {
    disableForm(submitForm, true);
    disableForm(resetForm, true);
  };
  var unlock = function () {
    disableForm(submitForm, false);
    disableForm(resetForm, false);
  };
  var onFormReset = function () {
    adForm.reset();
  };
  var onFormActivate = function () {
    disableForm(submitForm, false);
    disableForm(resetForm, false);
    enableMap();
  };
  /**
   * Функция показа сообщения при удачной отправке формы
   */
  var onSaveSuccess = function () {
    window.popup.onSuccessShowMessage();
    onFormReset();
  };
  /**
   * Функция отправки данных формы
   * @param{object} evt
   */
  var onSaveError = window.popup.onErrorShowMessage;
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSaveSuccess, onSaveError);
  });

  resetForm.addEventListener('click', onFormReset);
  window.form = {
    enable: enableMap,
    disableMap: disableMap,
    unlock: unlock,
    lock: lock,
    removePins: removePins,
    onFormReset: onFormReset,
    onFormActivate: onFormActivate,
    setAddressCoords: setAddressCoords
  };
})();
