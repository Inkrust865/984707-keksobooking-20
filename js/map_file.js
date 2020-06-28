'use strict';

(function () {
  var MapCity = {
    MIN_Y: 130,
    MAX_Y: 630
  };

  window.mapFile = {
    map: document.querySelector(window.ClassNames.map),
    mapFilters: document.querySelector(window.ClassNames.mapFilters),
    mapHeight: MapCity.MAX_Y - MapCity.MIN_Y,
    getLocationX: function () {
      return window.util.getRandomNumber(window.mapFile.map.clientWidth - window.pin.Pin.X);
    },
    getLocationY: function () {
      return window.util.getRandomNumber(window.mapFile.mapHeight - window.pin.Pin.Y) + MapCity.MIN_Y;
    },
    getLocation: function () {
      return {
        x: window.mapFile.getLocationX(),
        y: window.mapFile.getLocationY()
      };
    },
    showMap: function () {
      window.mapFile.map.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.mapFaded));
    },
    renderFragment: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.BOOKING_COUNT; i++) {
        fragment.appendChild(window.pin.renderBookingPin(i));
      }

      return fragment;
    }
  };
})();
