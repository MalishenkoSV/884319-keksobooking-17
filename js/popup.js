'use strict';
// popup.js
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var main = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var cloneSuccess = templateSuccess.cloneNode(true);
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var cloneError = templateError.cloneNode(true);
  var errorMessage = cloneError.querySelector('.error__message');
  errorMessage.textContent = 'Ошибка заполнения. Пожалуйста, исправьте форму и попробуйте еще раз.';
  var button = cloneError.querySelector('.error__button');
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
    if (evt.keyCode === ESC_KEYCODE) {
      cloneSuccess.remove();
    }
  };
  /**
   *  Попап успешной отправки формы
   */
  var onSuccessShowMessage = function () {
    main.insertAdjacentElement('afterbegin', cloneSuccess);
    document.addEventListener('keydown', onSuccessMassageESCClose);
    document.addEventListener('click', onSuccessMassageClose);
    window.page.onFormDeactivateMap();
  };

  var closeErrorMessage = function () {
    cloneError.remove();
    window.form.unlock();
  };
  /**
   *  Функция закрытия окна ошибки при нажатии на ESC
   * @param {object} evt
   */
  var onKeyPressOnError = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeErrorMessage();
    }
  };
  var onEnterKeyDownCloseError = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeErrorMessage();
    }
  };
  /**
   *  Попап ошибки при отправке формы
   */
  var onErrorShowMessage = function () {
    main.insertAdjacentElement('afterbegin', cloneError);

  };
  document.addEventListener('keydown', onKeyPressOnError);
  document.addEventListener('click', closeErrorMessage);
  button.addEventListener('keydown', onEnterKeyDownCloseError);
  window.popup = {
    onErrorShowMessage: onErrorShowMessage,
    onSuccessShowMessage: onSuccessShowMessage
  };
})();
