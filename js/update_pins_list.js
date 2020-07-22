'use strict';

(function () {
  var pinType = 'any';
  var pinPrice = 'any';
  var pinRooms = 'any';
  var pinGuests = 'any';

  var getRank = function (pin) {
    var rank = 0;

    if (pin.offer.type === pinType) {
      rank += 10;
    }
    if (pin.offer.rooms === parseInt(pinRooms, 10)) {
      rank += 9;
    }
    if ((pin.offer.price >= 10000 && pin.offer.price <= 50000 && pinPrice === 'middle') ||
    (pin.offer.price < 10000 && pinPrice === 'low') || (pin.offer.price > 50000 && pinPrice === 'high')) {
      rank += 8;
    }
    if (pin.offer.guests === parseInt(pinGuests, 10)) {
      rank += 7;
    }
    pin.offer.features.forEach(function (feature) {
      if (feature === 'wifi' && window.filter.checkboxWifi.checked === true) {
        rank += 6;
      }
    });
    pin.offer.features.forEach(function (feature) {
      if (feature === 'dishwasher' && window.filter.checkboxDishwasher.checked === true) {
        rank += 5;
      }
    });
    pin.offer.features.forEach(function (feature) {
      if (feature === 'parking' && window.filter.checkboxParking.checked === true) {
        rank += 4;
      }
    });
    pin.offer.features.forEach(function (feature) {
      if (feature === 'washer' && window.filter.checkboxWasher.checked === true) {
        rank += 3;
      }
    });
    pin.offer.features.forEach(function (feature) {
      if (feature === 'elevator' && window.filter.checkboxElevator.checked === true) {
        rank += 2;
      }
    });
    pin.offer.features.forEach(function (feature) {
      if (feature === 'conditioner' && window.filter.checkboxConditioner.checked === true) {
        rank += 1;
      }
    });

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

  window.filter.bookingPin.onPriceChange = window.debounce(function (price) {
    pinPrice = price;
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onRoomsChange = window.debounce(function (rooms) {
    pinRooms = rooms;
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onGuestsChange = window.debounce(function (guests) {
    pinGuests = guests;
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onWifiChange = window.debounce(function () {
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onDishwasherChange = window.debounce(function () {
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onParkingChange = window.debounce(function () {
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onWasherChange = window.debounce(function () {
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onElevatorChange = window.debounce(function () {
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onConditionerChange = window.debounce(function () {
    window.updatePinsList.updateBookingPins();
  });

  var onLoad = function (data) {
    window.updatePinsList.pinsList = data;
    window.updatePinsList.updateBookingPins();
  };

  window.backend.load(onLoad, window.error.onErrorGet);
})();
