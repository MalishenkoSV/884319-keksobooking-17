// util.js
'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  /**
   * Создает рандомное число
   * @param {number} min — минимальное число
   * @param {number} max - максимальное число
   */

  var getRandomFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (array, needRemove) {
    var randomElementIndex = getRandomFromInterval(0, array.length - 1);
    var randomElement = array[randomElementIndex];

    if (needRemove) {
      array.splice(randomElementIndex, 1);
    }
    return randomElement;
  };

  /**
   * mixArray - создает массив на основе переданного со случайно расположенными
   * элементами.
   *
   * @param  {Array}  array  Массив, на основе которого формируется новый массив.
   * @return {Array}         Сформированный массив.
   */
  var mixArray = function (array) {
    var results = [];
    var clone = array.slice();

    array.forEach(function (element) {
      element = getRandomElement(clone, true);
      results.push(element);
    });
    return results;
  };

  /**
   * Возрашает фунцию устранения дребезга через полсекуды
   * @param {function} cb - callback function
   * @return {function} - debounced function
   */
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
  var showVisualFeedback = function (element) {
    var removeAnimationClass = function () {
      element.classList.remove('jump');
      element.removeEventListener('animationend', removeAnimationClass);
    };
    element.addEventListener('animationend', removeAnimationClass);

    element.classList.add('jump');
  };
  window.util = {
    getRandomFromInterval: getRandomFromInterval,
    showVisualFeedback: showVisualFeedback,
    mixArray: mixArray,
    debounce: debounce
  };
})();
