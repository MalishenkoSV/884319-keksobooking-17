'use strict';
// oшибки
(function () {
  var main = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var cloneSuccess = templateSuccess.cloneNode(true);
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var cloneError = templateError.cloneNode(true);
  // var errorMessage = templateError.querySelector('.error__message');
  var button = cloneError.querySelector('.error__button');
  // errorMessage.textContent = 'Ошибка заполнения. Пожалуйста, исправьте форму и попробуйте еще раз.';
  /**
   *  Попап успешной отправки формы
   */
  var showSuccessMessage = function () {
    main.appendChild(cloneSuccess);
    cloneSuccess.addEventListener('keydown', onEnterCloseSuccess);
    document.addEventListener('click', closeSuccessMessage);
  };
  /**
   *  Функция закрытия попапа успешной отправки формы
   */
  var closeSuccessMessage = function () {
    main.removeChild(cloneSuccess);
  };
  /**
   *  Функция закрытия попапа успешной отправки формы  при нажатии на ESC
   * @param{object} evt
   */
  var onEnterCloseSuccess = function (evt) {
    if (evt.keyCode === window.variables.ENTER_KEYCODE) {
      closeSuccessMessage();
    }
  };
  /**
   *  Функция закрытия окна ошибки
   */
  var closeErrorMessage = function () {
    document.addEventListener('click', function () {
      main.removeChild(cloneError);
    });
    window.map.deactivatePage();
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
  var showErrorMessage = function () {
    main.appendChild(cloneError);
    cloneError.addEventListener('keydown', onKeyPressOnError);
    document.addEventListener('click', closeErrorMessage);
    button.addEventListener('keydown', closeErrorMessage);
  };

  window.popup = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
