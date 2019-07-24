'use strict';
// oшибки
(function () {
  var main = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var cloneSuccess = templateSuccess.cloneNode(true);

  /**
   *  Попап успешной отправки формы
   */
  var onSuccessShowMessage = function () {
    main.appendChild(cloneSuccess);
    document.addEventListener('keydown', onSuccessMassageESCClose);
    document.addEventListener('click', onSuccessMassageClose);
  };
  /**
   *  Функция закрытия попапа успешной отправки формы
   */
  var onSuccessMassageClose = function () {
    cloneSuccess.remove();
  };
  /**
   *  Функция закрытия попапа успешной отправки формы  при нажатии на ESC
   * @param{object} evt
   */
  var onSuccessMassageESCClose = function (evt) {
    if (evt.keyCode === window.variables.ESC_KEYCODE) {
      onSuccessMassageClose();
    }
  };
  /**
   *  Попап ошибки при отправке формы
   */
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var cloneError = templateError.cloneNode(true);
  var button = cloneError.querySelector('.error__button');

  var onErrorShowMessage = function () {
    main.appendChild(cloneError);
    window.map.onPageDeactivate();
    document.addEventListener('keydown', onKeyPressOnError);
    document.addEventListener('click', closeErrorMessage);
    button.addEventListener('keydown', closeErrorMessage);
  };

  var closeErrorMessage = function () {
    cloneError.remove();
  };
  /**
   *  Функция закрытия окна ошибки при нажатии на ESC
   * @param {object} evt
   */
  var onKeyPressOnError = function (evt) {
    if (evt.keyCode === window.variables.ESC_KEYCODE) {
      closeErrorMessage();
    }
  };

  document.addEventListener('click', function () {
    closeErrorMessage();
  });
  window.popup = {
    onErrorShowMessage: onErrorShowMessage,
    onSuccessShowMessage: onSuccessShowMessage
  };
})();
