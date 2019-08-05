'use strict';
// oшибки
(function () {
  var ESC_KEYCODE = 27;
  var main = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var cloneSuccess = templateSuccess.cloneNode(true);
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var cloneError = templateError.cloneNode(true);
  var button = cloneError.querySelector('.error__button');
  /**
   *  Попап успешной отправки формы
   */
  var onSuccessShowMessage = function () {
    main.insertAdjacentElement('afterbegin', cloneSuccess);
    document.addEventListener('keydown', onSuccessMassageESCClose);
    document.addEventListener('click', onSuccessMassageClose);
    window.page.onMapDeactivate();
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
    if (evt.keyCode === ESC_KEYCODE) {
      onSuccessMassageClose();
    }
  };
  /**
   *  Попап ошибки при отправке формы
   */
  var onErrorShowMessage = function () {
    main.insertAdjacentElement('afterbegin', cloneError);
    window.page.onMapActive();
    window.form.unlock();
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
    if (evt.keyCode === ESC_KEYCODE) {
      closeErrorMessage();
    }
  };
  window.popup = {
    onErrorShowMessage: onErrorShowMessage,
    onSuccessShowMessage: onSuccessShowMessage
  };
})();
