'use strict';

(function () {
  var includeFeature = function (pin, featureName, inputChecked) {
    var included = false;
    pin.offer.features.forEach(function (feature) {
      if (feature === featureName && (inputChecked === true)) {
        included = true;
      }
    });
    return included;
  };

  window.updatePinsList = {
    pinType: 'any',
    pinPrice: 'any',
    pinRooms: 'any',
    pinGuests: 'any',
    pinsList: [],
    mapPins: document.querySelector(window.ClassNames.mapPins),
    swapPinActive: function (pinList) {
      pinList.forEach(function (pin) {
        if (document.activeElement === pin) {
          pin.classList.add(window.util.getClassWithoutPoint(window.ClassNames.mapPinActive));
        } else {
          pin.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.mapPinActive));
        }
      });
    },
    updateBookingPins: function () {
      window.updatePinsList.newPinsList = window.updatePinsList.pinsList
        .filter(function (pin) {
          return (pin.offer.type === window.updatePinsList.pinType) || (window.updatePinsList.pinType === 'any');
        })
        .filter(function (pin) {
          return (pin.offer.price >= 10000 && pin.offer.price <= 50000 && window.updatePinsList.pinPrice === 'middle') ||
          (pin.offer.price < 10000 && window.updatePinsList.pinPrice === 'low') ||
          (pin.offer.price > 50000 && window.updatePinsList.pinPrice === 'high') || (window.updatePinsList.pinPrice === 'any');
        })
        .filter(function (pin) {
          return (pin.offer.rooms === parseInt(window.updatePinsList.pinRooms, 10)) || (window.updatePinsList.pinRooms === 'any');
        })
        .filter(function (pin) {
          return (pin.offer.guests === parseInt(window.updatePinsList.pinGuests, 10)) || (window.updatePinsList.pinGuests === 'any');
        })
        .filter(function (pin) {
          return (includeFeature(pin, 'wifi', window.filter.checkboxWifi.checked) === true) || (window.filter.checkboxWifi.checked === false);
        })
        .filter(function (pin) {
          return (includeFeature(pin, 'dishwasher', window.filter.checkboxDishwasher.checked) === true) ||
          (window.filter.checkboxDishwasher.checked === false);
        })
        .filter(function (pin) {
          return (includeFeature(pin, 'parking', window.filter.checkboxParking.checked) === true) ||
          (window.filter.checkboxParking.checked === false);
        })
        .filter(function (pin) {
          return (includeFeature(pin, 'washer', window.filter.checkboxWasher.checked) === true) ||
          (window.filter.checkboxWasher.checked === false);
        })
        .filter(function (pin) {
          return (includeFeature(pin, 'elevator', window.filter.checkboxElevator.checked) === true) ||
          (window.filter.checkboxElevator.checked === false);
        })
        .filter(function (pin) {
          return (includeFeature(pin, 'conditioner', window.filter.checkboxConditioner.checked) === true) ||
          (window.filter.checkboxConditioner.checked === false);
        });

      var newPinsFragment = window.mapFile.renderFragment(window.updatePinsList.newPinsList);

      window.updatePinsList.mapPins.appendChild(newPinsFragment);

      window.updatePinsList.mapPinList = window.updatePinsList.mapPins.querySelectorAll(window.ClassNames.mapPin);
      window.updatePinsList.mapPin = window.updatePinsList.mapPins.querySelector(window.ClassNames.mapPin);

      Array.from(window.updatePinsList.mapPinList).forEach(function (mapPin, index, pinList) {
        window.updatePinsList.showCard = function () {
          window.updatePinsList.swapPinActive(pinList);

          window.card.openCard(index);
        };

        window.updatePinsList.onCardEnterPress = function (evt) {
          window.util.onEnterPress(evt, function () {
            window.updatePinsList.showCard = function () {
              window.card.openCard(index);
            };
          });
        };

        if (!mapPin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mainPin))) {
          if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
            mapPin.classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));
          }

          mapPin.addEventListener('click', window.updatePinsList.showCard);

          if (!document.querySelector(window.ClassNames.mapCard)) {
            mapPin.addEventListener('keydown', window.updatePinsList.onCardEnterPress);
          }
        }
      });
    }
  };

  window.filter.bookingPin.onTypeChange = window.debounce(function (type) {
    window.updatePinsList.pinType = type;
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onPriceChange = window.debounce(function (price) {
    window.updatePinsList.pinPrice = price;
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onRoomsChange = window.debounce(function (rooms) {
    window.updatePinsList.pinRooms = rooms;
    window.updatePinsList.updateBookingPins();
  });

  window.filter.bookingPin.onGuestsChange = window.debounce(function (guests) {
    window.updatePinsList.pinGuests = guests;
    window.updatePinsList.updateBookingPins();
  });

  window.updatePinsList.onLoad = function (data) {
    window.updatePinsList.pinsList = data;
    window.updatePinsList.updateBookingPins();
    window.form.activateFields(window.mapFile.mapFilters);
  };

  window.backend.load(window.updatePinsList.onLoad, window.error.onErrorGet);
})();
