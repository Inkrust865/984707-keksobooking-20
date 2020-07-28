'use strict';

(function () {
  var MAX_BOOKING_COUNT = 5;

  var map = document.querySelector(window.ClassNames.MAP);

  var showMap = function () {
    map.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.MAP_FADED));
  };

  var hideMap = function () {
    map.classList.add(window.util.getClassWithoutPoint(window.ClassNames.MAP_FADED));
  };

  var renderFragment = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > MAX_BOOKING_COUNT ? MAX_BOOKING_COUNT : data.length;
    fragment.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      if (window.pinsList.newPinsList[i].offer) {
        fragment.appendChild(window.pin.renderBookingPin(i));
      }
    }
    return fragment;
  };

  window.mapFile = {
    map: map,
    showMap: showMap,
    hideMap: hideMap,
    renderFragment: renderFragment
  };
})();
