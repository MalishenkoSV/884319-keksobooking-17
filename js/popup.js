'use strict';
// oшибки
(function () {
  var main = document.querySelector('main');
  var templateSuccess = document.querySelector('#success');
  var cloneSuccess = templateSuccess.cloneNode(true);
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var cloneError = templateError.cloneNode(true);
  // var errorMessage = templateError.querySelector('.error__message');
  var button = cloneError.querySelector('.error__button');
  // errorMessage.textContent = 'Ошибка заполнения. Пожалуйста, исправьте форму и попробуйте еще раз.';
  /**
   *  Функция закрытия попапа успешной отправки формы
   */
  var onSuccessMassageClose = function () {
    main.removeChild(cloneSuccess);
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
   *  Попап успешной отправки формы
   */
  var onSuccessShowMessage = function () {
    main.appendChild(cloneSuccess);
    cloneSuccess.addEventListener('keydown', onSuccessMassageESCClose);
    document.addEventListener('click', onSuccessMassageClose);
  };

  /**
   *  Функция закрытия окна ошибки
   */
  var closeErrorMessage = function () {
    document.addEventListener('click', function () {
      main.removeChild(cloneError);
    });
    window.map.onPageDeactivate();
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
  /**
   *  Попап ошибки при отправке формы
   */
  var onErrorShowMessage = function () {
    main.appendChild(cloneError);
    cloneError.addEventListener('keydown', onKeyPressOnError);
    document.addEventListener('click', closeErrorMessage);
    button.addEventListener('keydown', closeErrorMessage);
  };

  window.popup = {
    onErrorShowMessage: onErrorShowMessage,
    onSuccessShowMessage: onSuccessShowMessage
  };
})();
