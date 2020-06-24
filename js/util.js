'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  window.util = {
    getClassWithoutPoint: function (className) {
      return className.slice(1);
    },
    getRandomNumber: function (max) {
      return Math.floor(Math.random() * max);
    },
    getRandomCeilNumber: function (max) {
      return Math.ceil(Math.random() * max);
    },
    mixElements: function (array) {
      for (var i = array.length - 1, j, temp; i > 0; i--) {
        j = window.util.getRandomNumber(i + 1);
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }

      return array;
    },
    onEnterPress: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
