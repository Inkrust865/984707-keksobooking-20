'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getClassWithoutPoint = function (className) {
    return className.slice(1);
  };

  var getRandomNumber = function (max) {
    return Math.floor(Math.random() * max);
  };

  var getRandomCeilNumber = function (max) {
    return Math.ceil(Math.random() * max);
  };

  var onEscPress = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  var onEnterPress = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  window.util = {
    getClassWithoutPoint: getClassWithoutPoint,
    getRandomNumber: getRandomNumber,
    getRandomCeilNumber: getRandomCeilNumber,
    onEscPress: onEscPress,
    onEnterPress: onEnterPress
  };
})();
