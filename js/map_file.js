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
    getLocationX: function (index) {
      return window.util.BookingList[index].location.x - window.pin.Pin.X;
    },
    getLocationY: function (index) {
      return window.util.BookingList[index].location.y - window.pin.Pin.Y;
    },
    showMap: function () {
      window.mapFile.map.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.mapFaded));
    },
    hideMap: function () {
      window.mapFile.map.classList.add(window.util.getClassWithoutPoint(window.ClassNames.mapFaded));
    },
    renderFragment: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.util.BookingList.length - 1; i++) {
        fragment.appendChild(window.pin.renderBookingPin(i));
      }

      return fragment;
    }
  };
})();
