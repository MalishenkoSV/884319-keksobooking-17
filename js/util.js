// util.js
'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
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
   * Создает рандомное массив
   * @param {array} arr -- массив
   * @return {array} arr
   */
  var shuffleArray = function (arr) {
    return arr.slice().sort(function () {
      return Math.random() - 0.5;
    });
  };

    /**
   * Создает рандомный массив из массива
   * @param {array} arr -- массив
   * @return {array} arr
   */
  var getRandomSubarray = function (arr) {
    var shuffledArray = shuffleArray(arr);
    var randomEndIndex = getRandomFromInterval(1, arr.length - 1);
    return shuffledArray.slice(0, randomEndIndex);
  };

  /**
   * runOnEnter - Если нажатая клавиша - Esc, то вызывает переданную функцию action.
   *
   * @param  {Event}    evt    Событие Event.
   * @param  {function} action Выполняемая функция.
   */
  var runOnEsc = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  /**
   * runOnEnter - Если нажатая клавиша - Enter, то вызывает переданную функцию action.
   *
   * @param  {Event}    evt    Событие Event.
   * @param  {function} action Выполняемая функция.
   */
  var runOnEnter = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };
  // /**
  //  * mixArray - создает массив на основе переданного со случайно расположенными
  //  * элементами.
  //  *
  //  * @param  {Array}  array  Массив, на основе которого формируется новый массив.
  //  * @return {Array}         Сформированный массив.
  //  */
  // var mixArray = function (array) {
  //   var result = [];
  //   var clone = array.slice();

  //   array.forEach(function (element) {
  //     element = getRandomElementFromArray(clone, true);
  //     result.push(element);
  //   });

  //   return result;
  // };
  /**
   * debounce - Откладывает выполнение функции callback на время interval
   * и предотвращает 'дребезг' при повтороном обращении к фукнции callback раньше,
   * чем через время interval.
   *
   * @param  {function} callback   Выполняемая функция.
   * @param  {number}   interval Время в мс.
   */
  var debounce = function (callback, interval) {
    var lastTimeout;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(callback, interval);
  };

  window.util = {
    getRandomFromInterval: getRandomFromInterval,
    getRandomElementFromArray: getRandomElementFromArray,
    getRandomSubarray: getRandomSubarray,
    runOnEsc: runOnEsc,
    runOnEnter: runOnEnter,
    mixArray: mixArray,
    debounce: debounce
  };
})();
