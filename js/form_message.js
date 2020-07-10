'use strict';

(function () {
  var tagMain = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector(window.ClassNames.success);
  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector(window.ClassNames.error);
  var successMessage = successMessageTemplate.cloneNode(true);
  var errorMessage = errorMessageTemplate.cloneNode(true);

  var hideFormMessage = function (messageElement) {
    if (tagMain.lastChild === messageElement) {
      tagMain.removeChild(messageElement);
    }
  };

  var onFormMessageEscPress = function (evt, messageElement) {
    window.util.onEscPress(evt, function () {
      hideFormMessage(messageElement);
    });
  };

  var onFormMessageMousePress = function (evt, messageElement) {
    if (evt.button === window.main.MouseButtons.left) {
      hideFormMessage(messageElement);
    }
  };

  window.formMessage = {
    renderSuccessMessage: function () {
      tagMain.appendChild(successMessage);
    },
    renderErrorMessage: function () {
      tagMain.appendChild(errorMessage);
    },
    onSuccessMessageEscPress: function (evt) {
      onFormMessageEscPress(evt, successMessage);
    },
    onSuccessMessageMousePress: function (evt) {
      onFormMessageMousePress(evt, successMessage);
    },
    onErrorMessageEscPress: function (evt) {
      onFormMessageEscPress(evt, errorMessage);
    },
    onErrorMessageMousePress: function (evt) {
      onFormMessageMousePress(evt, errorMessage);
    }
  };
})();
