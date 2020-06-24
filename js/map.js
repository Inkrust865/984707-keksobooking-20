'use strict';

(function () {
  window.map = {
    renderFragment: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.BOOKING_COUNT; i++) {
        fragment.appendChild(window.pin.renderBookingPin(i));
      }

      return fragment;
    }
  };
})();
