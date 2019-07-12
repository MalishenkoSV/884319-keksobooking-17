'use strict';
// oшибки
(function () {
  var showSuccessMessage = function () {
    var cloneSuccessPopupTemplate = window.variables.successPopupTemplate.content.cloneNode(true);
    var successPopup = cloneSuccessPopupTemplate.querySelector('.success');
    window.variables.main.appendChild(cloneSuccessPopupTemplate);
    var closeSuccessMessage = function () {
      document.removeEventListener('keydown', onEnterCloseSuccess);
      successPopup.removeEventListener('click', closeSuccessMessageOnClick);
      window.variables.main.remove(successPopup);
    };
    var onEnterCloseSuccess = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.variables.ENTER_KEYCODE) {
        closeSuccessMessage();
      }
    };
    var closeSuccessMessageOnClick = function (evt) {
      evt.preventDefault();
      if (evt.target === successPopup) {
        closeSuccessMessage();
      }
    };
    document.addEventListener('keydown', onEnterCloseSuccess);
    successPopup.addEventListener('click', closeSuccessMessageOnClick);
  };
  var showSubmitFormError = function () {
    var cloneErrorTemplate = window.variables.errorPopupTemplate.content.cloneNode(true);
    var errorBlock = cloneErrorTemplate.querySelector('.error');
    var errorMessage = cloneErrorTemplate.querySelector('.error__message');
    errorMessage.textContent = 'Ошибка заполнения. Пожалуйста, исправьте форму и попробуйте еще раз.';
    window.variables.main.appendChild(cloneErrorTemplate);
    var closeErrorMessage = function () {
      document.removeEventListener('keydown', onKeyPressOnError);
      errorBlock.removeEventListener('click', closeErrorMessageOnClick);
      window.variables.main.removeChild(errorBlock);
    };
    var onKeyPressOnError = function (evt) {
      if (evt.keyCode === window.variables.ESC_KEYCODE) {
        closeErrorMessage();
      }
    };
    var closeErrorMessageOnClick = function (evt) {
      evt.preventDefault();
      if (evt.target === errorBlock) {
        closeErrorMessage();
      }
    };
    closeErrorMessage();
    document.addEventListener('keydown', onKeyPressOnError);
    errorBlock.addEventListener('click', closeErrorMessageOnClick);
  };

  window.popup = {
    showSuccessMessage: showSuccessMessage,
    showSubmitFormError: showSubmitFormError
  };
})();
