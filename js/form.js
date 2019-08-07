// form.js
'use strict';
(function () {
  var PLACEHOLDER_MIN = 1000;
  var MIN_PRICE = 0;
  var mapFilters = document.querySelector('.map__filters');
  var selects = mapFilters.querySelectorAll('select');
  var fieldsets = document.querySelectorAll('fieldset');
  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var priceSelect = adForm.querySelector('#price');
  var timeinSelect = adForm.querySelector('#timein');
  var timeoutSelect = adForm.querySelector('#timeout');
  var roomSelect = adForm.querySelector('#room_number');
  var guestSelect = adForm.querySelector('#capacity');
  var submitForm = adForm.querySelector('.ad-form__submit');
  var resetForm = adForm.querySelector('.ad-form__reset');
  var offerTypeToMinPrice = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  var guestToRoomNumber = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0'],
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
  var defaultPricePlaceholder = PLACEHOLDER_MIN;
  var defaultMinPrice = MIN_PRICE;
  var onTypeChangeMinPrice = function () {
    typeSelect.addEventListener('change', function (evt) {
      if (!evt.target.value) {
        priceSelect.setAttribute('placeholder', defaultPricePlaceholder);
        priceSelect.setAttribute('min', defaultMinPrice);
      } else {
        var minPrice = offerTypeToMinPrice[evt.target.value];
        priceSelect.setAttribute('placeholder', minPrice);
        priceSelect.setAttribute('min', minPrice);
      }
    });
  };
  /**
   * Функция показа сообщения при удачной отправке формы
   */
  var onFormSave = function () {
    window.popup.onSuccessShowMessage();
    onFormDeactivate();
  };
  var lock = function () {
    submitForm.disabled = true;
    resetForm.disabled = true;
  };
  var unlock = function () {
    submitForm.disabled = false;
    resetForm.disabled = false;
  };
  var onFormChangeValitation = {
    'type': function (field) {
      onTypeChangeMinPrice(field.value);
    },
    'timein': function (field) {
      timeoutSelect.value = field.value;
    },
    'timeout': function (field) {
      timeinSelect.value = field.value;
    },
    'capacity': function (field) {
      if (!guestToRoomNumber[field.value].includes(+roomSelect.value)) {
        field.setCustomValidity('Количество мест не соответствует количеству комнат');
      } else {
        field.setCustomValidity('');
      }
    },
    'room_number': function (field) {
      if (guestToRoomNumber[guestSelect.value].includes(+field.value)) {
        guestSelect.setCustomValidity('');
      }
    }
  };

  // adForm.addEventListener('invalid', function () {
  //   if (guestSelect.validity.valid) {
  //     guestSelect.setCustomValidity('Обязательное поле');
  //   } else {
  //     guestSelect.setCustomValidity('');
  //   }
  // });
  adForm.addEventListener('input', function (evt) {
    if (onFormChangeValitation[evt.target.id]) {
      onFormChangeValitation[evt.target.id](evt.target);
    }
  });
  /**
   * Функция отправки данных формы
   * @param{object} evt
   */
  var onSubmitClick = function (evt) {
    event.preventDefault();
    var formData = new FormData(evt.currentTarget);
    window.backend.save(formData, onFormSave, window.popup.onErrorShowMessage);
    adForm.removeEventListener('submit', onSubmitClick);
    window.page.onMapDeactivate();
  };

  var onFormReset = function () {
    adForm.reset();
  };
  var onFormDeactivate = function () {
    lock();
    // resetElements();
    onFormReset();
    removePins();
  };
  var onFormActivate = function () {
    unlock();
    enableMap();
  };
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  adForm.addEventListener('submit', onSubmitClick);
  resetForm.addEventListener('click', onFormDeactivate);
  window.form = {
    enable: enableMap,
    disableMap: disableMap,
    unlock: unlock,
    lock: lock,
    removePins: removePins,
    onFormDeactivate: onFormDeactivate,
    onFormActivate: onFormActivate
  };
})();
