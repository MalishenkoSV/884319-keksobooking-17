// util.js
'use strict';
(function () {
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
   * mixArray - создает массив на основе переданного со случайно расположенными
   * элементами.
   *
   * @param  {Array}  array  Массив, на основе которого формируется новый массив.
   * @return {Array}         Сформированный массив.
   */
  var mixArray = function (array) {
    var result = [];
    var clone = array.slice();

    array.forEach(function (element) {
      element = getRandomElementFromArray(clone);
      result.push(element);
    });

    return result;
  };
  /**
   * Возрашает фунцию устраненя дребезга через полсекуды
   * @param {function} callback - callback function
   * @return {function} - debounced function
   */
  var DEBOUNCE_INTERVAL = 500; // ms
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    getRandomFromInterval: getRandomFromInterval,
    getRandomElementFromArray: getRandomElementFromArray,
    mixArray: mixArray,
    debounce: debounce
  };
})();
