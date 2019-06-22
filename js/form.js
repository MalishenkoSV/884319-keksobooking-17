// form.js
'use strict';
(function () {
  /**
   *  Блокировка полей
   */
  window.variables.fieldsetList.forEach(function () {
    window.variables.fieldsetList.disabled = true;
  });
  /**
   * Функция активации карты
   * удаление класса деактивации
   * удаления класса деактивации полей формы
   */
  var formActive = function () {
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
})();
