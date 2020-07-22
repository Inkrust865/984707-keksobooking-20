'use strict';

(function () {
  var pinType = window.data.TYPES[window.util.getRandomNumber(window.data.TYPES.length)];

  var getRank = function (pin) {
    var rank = 0;

    if (pin.offer.type === pinType) {
      rank += 1;
    }

    return rank;
  };

  var titlesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.updatePinsList = {
    pinsList: [],
    mapPins: document.querySelector(window.ClassNames.mapPins),
    updateBookingPins: function () {
      var newPinsFragment = window.mapFile.renderFragment(window.updatePinsList.pinsList.sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);

        if (rankDiff === 0) {
          rankDiff = titlesComparator(left.offer.title, right.offer.title);
        }

        return rankDiff;
      }));

      window.updatePinsList.mapPins.appendChild(newPinsFragment);

      window.updatePinsList.mapPinList = window.updatePinsList.mapPins.querySelectorAll(window.ClassNames.mapPin);
      window.updatePinsList.mapPin = window.updatePinsList.mapPins.querySelector(window.ClassNames.mapPin);

      Array.from(window.updatePinsList.mapPinList).forEach(function (mapPin, index) {
        window.updatePinsList.showCard = function () {
          window.card.openCard(index);
        };

        window.updatePinsList.onCardEnterPress = function (evt) {
          window.util.onEnterPress(evt, function () {
            window.updatePinsList.showCard();
          });
        };

        if (!mapPin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mainPin))) {
          if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
            mapPin.classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));
          }

          mapPin.addEventListener('click', window.updatePinsList.showCard);

          if (document.querySelectorAll(window.ClassNames.mapCard).length < 1) {
            mapPin.addEventListener('keydown', window.updatePinsList.onCardEnterPress);
          }
        }
      });
    }
  };

  window.filter.bookingPin.onTypeChange = window.debounce(function (type) {
    pinType = type;
    window.updatePinsList.updateBookingPins();
  });

  var onLoad = function (data) {
    window.updatePinsList.pinsList = data;
    window.updatePinsList.updateBookingPins();
  };

  window.backend.load(onLoad, window.error.onErrorGet);
})();
