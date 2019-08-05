// form.js
'use strict';
(function () {
  var PLACEHOLDER_MIN = 1000;
  var MIN_PRICE = 0;
  var map = document.querySelector('.map');
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
  var resetForm = adForm.querySelector('.ad-form__reset');
  var addressInput = adForm.querySelector('#address');
  var submitForm = adForm.querySelector('.ad-form__submit');

  var showVisualFeedback = window.util.showVisualFeedback;
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
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form--disabled');
    disableForm(fieldsets, false);
    disableForm(selects, false);
  };
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

  var resetAllOptions = function (selectElement) {
    var options = selectElement.childNodes;
    var isDefaultValue = selectElement.value === '';

    disableForm(options, false);

    if (!isDefaultValue) {
      showVisualFeedback(selectElement);
    }
  };
  var lockUnavailableOptions = function (selectElement, availableOptions) {
    var options = selectElement.childNodes;
    var isDefaultValue = selectElement.value === '';
    var isOptionAvailable = availableOptions.indexOf(selectElement.value) !== -1;

    if (!isOptionAvailable && !isDefaultValue) {
      selectElement.value = guestSelect;
      showVisualFeedback(guestSelect);
    }

    options.forEach(function (option) {
      if (option.value && availableOptions.indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    });
  };

  /**
   * Функция валидации формы по количеству комнат соответственно количеству гостей
   *  @param {object} evt
   */
  roomSelect.addEventListener('change', function (evt) {
    guestSelect.value = evt.target.value;
    var value = evt.target.value;
    var availableOptions = guestToRoomNumber[value];

    if (!value) {
      resetAllOptions(guestSelect);
    } else {
      lockUnavailableOptions(guestSelect, availableOptions);
    }
  });
  /**
   * Функция обработки изменений на поле типа жилья
   *  @param {object} evt
   */
  var defaultPricePlaceholder = PLACEHOLDER_MIN;
  var defaultMinPrice = MIN_PRICE;
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
  var toggleInputValididy = function (input) {
    var isValid = input.validity.valid;

    input.classList.toggle('is-invalid', !isValid);
  };
  adForm.addEventListener('focusout', function (evt) {
    toggleInputValididy(evt.target);
  });
  adForm.addEventListener('input', function (evt) {
    if (evt.target.classList.contains('is-invalid')) {
      toggleInputValididy(evt.target);
    }
  });
  /**
   * Функция определения координаты адресса пина
   * @param {number} x - по горизонтали,
   * @param {number} y - по вертикали
   */
  var setAddressCoords = function (x, y) {
    addressInput.value = x + ', ' + y;
    addressInput.defaultValue = addressInput.value;
  };
  /**
   * Функция показа сообщения при удачной отправке формы
   */
  var onFormSave = function () {
    window.popup.onSuccessShowMessage();
  };
  /**
   * Функция отправки данных формы
   * @param{object} evt
   */

  var unlock = function () {
    submitForm.disabled = false;
    resetForm.disabled = false;
  };
  var resetElements = function () {
    adForm.querySelectorAll('.is-invalid').forEach(function (element) {
      element.classList.remove('is-invalid');
    });
  };
  var disableMap = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('ad-form--disabled');
    adForm.classList.remove('notice__form--disabled');
    disableForm(fieldsets, true);
    disableForm(selects, true);
  };
  var lock = function () {
    submitForm.disabled = true;
    resetForm.disabled = true;
  };
  /**
   * Сброс карты
   */
  var onMapReset = function () {
    lock();
    disableMap();
    resetElements();
    onFormReset();
  };

  var onSubmitClick = function (evt) {
    evt.preventDefault();
    var formData = new FormData(evt.currentTarget);
    window.backend.save(formData, onFormSave, window.popup.onErrorShowMessage);
    window.page.onMapDeactivate();
    adForm.removeEventListener('submit', onSubmitClick);
  };

  var onFormReset = function () {
    adForm.reset();
    resetForm.removeEventListener('click', onFormReset);
  };
  resetForm.addEventListener('click', onFormReset);
  adForm.addEventListener('submit', onSubmitClick);
  window.form = {
    map: map,
    enable: enableMap,
    unlock: unlock,
    onMapReset: onMapReset,
    setAddressCoords: setAddressCoords
  };
})();
